import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";
import { TestimonialItem, AcademyConfig } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BLOB_STORE_NAME = "las-chicas-config";
const BLOB_KEY = "global_config";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

// Controle simples de rate limit / anti-flood em memória (IP -> timestamp último envio)
interface RateLimitEntry {
  count: number;
  firstRequestTime: number;
}
const ipRateLimits = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 3; // Máximo 3 envios por minuto por IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);

  if (!entry) {
    ipRateLimits.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    ipRateLimits.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Limpeza periódica do mapa de rate limit para não reter memória
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipRateLimits.forEach((entry, ip) => {
      if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS * 2) {
        ipRateLimits.delete(ip);
      }
    });
  }, 5 * 60 * 1000);
}

async function getBlobStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore(BLOB_STORE_NAME);
  } catch (e) {
    console.warn("[Testimonials API] Netlify Blobs indisponivel localmente:", e);
    return null;
  }
}

// Higienizar texto removendo tags HTML
function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>?/gm, "") // Remove tags HTML
    .replace(/javascript:/gi, "")
    .trim();
}

// GET: Retornar depoimentos atualizados
export async function GET() {
  try {
    const store = await getBlobStore();
    if (store) {
      const raw = await store.get(BLOB_KEY, { type: "text" });
      if (raw) {
        const parsed = JSON.parse(raw) as AcademyConfig;
        if (parsed?.testimonials && Array.isArray(parsed.testimonials)) {
          return NextResponse.json(
            { testimonials: parsed.testimonials },
            { headers: NO_CACHE_HEADERS }
          );
        }
      }
    }
  } catch (e) {
    console.warn("[Testimonials API] Erro ao buscar depoimentos:", e);
  }

  return NextResponse.json(
    { testimonials: ACADEMY_CONFIG.testimonials },
    { headers: NO_CACHE_HEADERS }
  );
}

// POST: Enviar novo depoimento com regras de validação estritas e merge atômico
export async function POST(req: NextRequest) {
  try {
    // 1. Obter IP do cliente para rate limit
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Você enviou muitos depoimentos em pouco tempo. Por favor, aguarde 1 minuto antes de tentar novamente.",
        },
        { status: 429, headers: NO_CACHE_HEADERS }
      );
    }

    const body = await req.json();

    // 2. Honeypot check (campo invisível preenchido apenas por bots)
    if (body.website_hp || body.phone_hp) {
      console.warn("[Testimonials API] Honeypot ativado, requisição descartada.");
      return NextResponse.json(
        { success: true, message: "Depoimento recebido com sucesso!" },
        { headers: NO_CACHE_HEADERS }
      );
    }

    const rawName = String(body.name || "").trim();
    const rawComment = String(body.comment || "").trim();
    const rawRole = String(body.role || "").trim();
    const rawRating = Number(body.rating);
    const rawImageUrl = body.imageUrl ? String(body.imageUrl).trim() : undefined;

    // 3. Regras de validação dos campos
    if (!rawName || rawName.length < 2) {
      return NextResponse.json(
        { success: false, error: "O nome deve ter no mínimo 2 caracteres." },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }
    if (rawName.length > 60) {
      return NextResponse.json(
        { success: false, error: "O nome não pode exceder 60 caracteres." },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (!rawComment || rawComment.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor, escreva um depoimento com pelo menos 10 caracteres.",
        },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }
    if (rawComment.length > 500) {
      return NextResponse.json(
        {
          success: false,
          error: "O depoimento não pode exceder 500 caracteres.",
        },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (isNaN(rawRating) || rawRating < 1 || rawRating > 5) {
      return NextResponse.json(
        { success: false, error: "A avaliação deve ser entre 1 e 5 estrelas." },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    // 4. Bloqueio de spam de links (evita anúncios e links maliciosos)
    const linkRegex = /(https?:\/\/|www\.|\.com|\.net|\.org|\.ru|\.xyz|bit\.ly|t\.me)/i;
    if (linkRegex.test(rawComment) || linkRegex.test(rawName)) {
      return NextResponse.json(
        {
          success: false,
          error: "Não é permitido incluir links ou sites no depoimento.",
        },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    // 5. Validação de imagem se fornecida (limite de 1.5MB)
    if (rawImageUrl) {
      const isDataUrl = rawImageUrl.startsWith("data:image/");
      const isSafeHttp = rawImageUrl.startsWith("http://") || rawImageUrl.startsWith("https://") || rawImageUrl.startsWith("/");
      if (!isDataUrl && !isSafeHttp) {
        return NextResponse.json(
          { success: false, error: "Formato de imagem inválido." },
          { status: 400, headers: NO_CACHE_HEADERS }
        );
      }
      if (rawImageUrl.length > 1_500_000) {
        return NextResponse.json(
          { success: false, error: "A foto anexada é muito pesada. Escolha uma foto menor." },
          { status: 400, headers: NO_CACHE_HEADERS }
        );
      }
    }

    // 6. Higienização dos campos
    const cleanName = sanitizeText(rawName);
    const cleanRole = rawRole ? sanitizeText(rawRole).slice(0, 60) : "Aluna Las Chicas";
    const cleanComment = sanitizeText(rawComment);
    const cleanRating = Math.min(5, Math.max(1, Math.round(rawRating)));

    // 7. Criar objeto do depoimento
    const newTestimonial: TestimonialItem = {
      id: `depo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: cleanName,
      role: cleanRole,
      rating: cleanRating,
      comment: cleanComment,
      imageUrl: rawImageUrl,
      date: "Hoje",
      createdAt: new Date().toISOString(),
      isVerified: true,
    };

    // 8. Salvar no Netlify Blobs com leitura fresca e merge concorrente seguro
    let savedToCloud = false;
    let updatedTestimonialsList: TestimonialItem[] = [newTestimonial];

    try {
      const store = await getBlobStore();
      if (store) {
        let attempts = 0;
        let success = false;

        while (attempts < 3 && !success) {
          attempts++;
          try {
            const raw = await store.get(BLOB_KEY, { type: "text" });
            let currentConfig: AcademyConfig = ACADEMY_CONFIG;
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed && typeof parsed === "object") {
                currentConfig = { ...ACADEMY_CONFIG, ...parsed };
              }
            }

            const existingList: TestimonialItem[] = Array.isArray(currentConfig.testimonials)
              ? currentConfig.testimonials
              : ACADEMY_CONFIG.testimonials;

            // Anti-duplicação: verificar se já existe um depoimento idêntico enviado nos últimos minutos
            const isDuplicate = existingList.some(
              (item) =>
                item.name.toLowerCase() === cleanName.toLowerCase() &&
                item.comment.trim() === cleanComment &&
                item.rating === cleanRating
            );

            if (isDuplicate) {
              return NextResponse.json(
                {
                  success: true,
                  testimonial: existingList.find((i) => i.name.toLowerCase() === cleanName.toLowerCase()) || newTestimonial,
                  testimonials: existingList,
                  savedToCloud: true,
                  duplicatePrevented: true,
                },
                { headers: NO_CACHE_HEADERS }
              );
            }

            // Inserir novo depoimento no início da lista, preservando todos os anteriores
            updatedTestimonialsList = [newTestimonial, ...existingList].slice(0, 80);

            const mergedConfig: AcademyConfig = {
              ...currentConfig,
              testimonials: updatedTestimonialsList,
            };

            await store.set(BLOB_KEY, JSON.stringify(mergedConfig));
            success = true;
            savedToCloud = true;
            console.log(
              `[Testimonials API] Depoimento de "${cleanName}" salvo com sucesso no Netlify Blobs (tentativa ${attempts})`
            );
          } catch (retryErr) {
            console.warn(`[Testimonials API] Tentativa ${attempts} falhou:`, retryErr);
            if (attempts < 3) {
              await new Promise((res) => setTimeout(res, 80 * attempts));
            }
          }
        }
      }
    } catch (blobErr) {
      console.error("[Testimonials API] Erro ao persistir no store:", blobErr);
    }

    return NextResponse.json(
      {
        success: true,
        testimonial: newTestimonial,
        testimonials: updatedTestimonialsList,
        savedToCloud,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    console.error("[Testimonials API] Erro inesperado:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Ocorreu um erro ao processar o seu depoimento. Tente novamente.",
      },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
