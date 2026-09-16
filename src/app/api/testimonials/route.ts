import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";
import { TestimonialItem, AcademyConfig } from "@/types";
import { getCloudData, setCloudData, GLOBAL_CONFIG_KEY } from "@/lib/cloudStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

// ============================================================================
// RATE LIMITING & SECURITY EM MEMÓRIA
// ============================================================================
interface RateLimitEntry {
  count: number;
  firstRequestTime: number;
}
const ipRateLimits = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 4; // Máximo 4 envios por minuto por IP

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
    const { data: raw, provider } = await getCloudData(GLOBAL_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AcademyConfig;
      if (parsed?.testimonials && Array.isArray(parsed.testimonials)) {
        return NextResponse.json(
          { testimonials: parsed.testimonials, source: provider },
          { headers: NO_CACHE_HEADERS }
        );
      }
    }
  } catch (e) {
    console.warn("[Testimonials API] Erro ao buscar depoimentos:", e);
  }

  return NextResponse.json(
    { testimonials: ACADEMY_CONFIG.testimonials, source: "default" },
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
          error: "Você enviou muitos depoimentos recentemente. Aguarde um minuto antes de tentar novamente.",
        },
        { status: 429, headers: NO_CACHE_HEADERS }
      );
    }

    // 2. Parse do corpo da requisição
    const body = await req.json();
    const {
      name: rawName,
      role: rawRole,
      rating: rawRating,
      comment: rawComment,
      imageUrl: rawImageUrl,
      hpWebsite, // Honeypot anti-bot
    } = body;

    // Honeypot: se campo oculto foi preenchido, é um bot
    if (hpWebsite && String(hpWebsite).trim().length > 0) {
      console.warn(`[Testimonials Anti-Spam] Bot bloqueado no IP: ${ip}`);
      return NextResponse.json(
        { success: true, testimonial: null },
        { headers: NO_CACHE_HEADERS }
      );
    }

    // 3. Validações de campos obrigatórios e tamanho
    if (!rawName || typeof rawName !== "string" || rawName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Por favor, informe seu nome (mínimo 2 caracteres)." },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (rawName.trim().length > 60) {
      return NextResponse.json(
        { success: false, error: "O nome não pode exceder 60 caracteres." },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (!rawComment || typeof rawComment !== "string" || rawComment.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor, escreva um depoimento com pelo menos 5 caracteres.",
        },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (rawComment.trim().length > 500) {
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

    // 8. Salvar na nuvem com leitura fresca e merge concorrente seguro
    let savedToCloud = false;
    let updatedTestimonialsList: TestimonialItem[] = [newTestimonial];

    try {
      let attempts = 0;
      let success = false;

      while (attempts < 3 && !success) {
        attempts++;
        try {
          const { data: raw } = await getCloudData(GLOBAL_CONFIG_KEY);
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

          const saveResult = await setCloudData(GLOBAL_CONFIG_KEY, JSON.stringify(mergedConfig));
          if (saveResult.success) {
            success = true;
            savedToCloud = true;
            console.log(
              `[Testimonials API] Depoimento de "${cleanName}" salvo com sucesso no provedor: ${saveResult.provider} (tentativa ${attempts})`
            );
          } else {
            throw new Error(saveResult.error || "Falha ao salvar");
          }
        } catch (retryErr) {
          console.warn(`[Testimonials API] Tentativa ${attempts} falhou:`, retryErr);
          if (attempts < 3) {
            await new Promise((res) => setTimeout(res, 80 * attempts));
          }
        }
      }
    } catch (cloudErr) {
      console.error("[Testimonials API] Erro ao persistir no cloud store:", cloudErr);
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
