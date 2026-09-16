import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";
import { getCloudData, setCloudData, getKvCredentials, GLOBAL_CONFIG_KEY } from "@/lib/cloudStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Cache em memória na instância do servidor (protege contra picos de milhares de acessos por segundo)
let memoryCache: { data: any; provider: string; timestamp: number } | null = null;
const MEMORY_CACHE_TTL_MS = 20 * 1000; // 20 segundos

const EDGE_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300",
  "CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
  "Vercel-CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
};

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const isBypassCache = url.searchParams.has("t") || url.searchParams.has("nocache") || url.searchParams.has("fresh");
  const now = Date.now();

  // 1. Resposta instantânea da memória local (0ms de latência)
  if (!isBypassCache && memoryCache && now - memoryCache.timestamp < MEMORY_CACHE_TTL_MS) {
    return NextResponse.json(
      { source: `${memoryCache.provider}_cached`, config: memoryCache.data },
      { headers: EDGE_CACHE_HEADERS }
    );
  }

  try {
    const { data: raw, provider } = await getCloudData(GLOBAL_CONFIG_KEY);
    if (raw) {
      let parsed: any = null;
      try {
        const cleanRaw = typeof raw === "string" ? raw.replace(/[\ufffd\u2014\u2013]/g, " - ") : raw;
        parsed = typeof cleanRaw === "string" ? JSON.parse(cleanRaw) : cleanRaw;
        // Se ainda for string (double-encoded JSON), faz o segundo parse
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
      } catch (parseErr) {
        console.warn("[Config API] Erro no parse:", parseErr);
      }

      if (parsed && typeof parsed === "object") {
        const merged = {
          ...ACADEMY_CONFIG,
          ...parsed,
          contacts: {
            ...ACADEMY_CONFIG.contacts,
            ...(parsed.contacts || {}),
          },
          ...(Array.isArray(parsed.plans) ? { plans: parsed.plans } : {}),
          ...(Array.isArray(parsed.instagramPosts) ? { instagramPosts: parsed.instagramPosts } : {}),
          ...(Array.isArray(parsed.testimonials) ? { testimonials: parsed.testimonials } : {}),
          ...(Array.isArray(parsed.products) ? { products: parsed.products } : {}),
          ...(Array.isArray(parsed.modalities) ? { modalities: parsed.modalities } : {}),
          ...(Array.isArray(parsed.structure) ? { structure: parsed.structure } : {}),
          ...(Array.isArray(parsed.gallery) ? { gallery: parsed.gallery } : {}),
          ...(Array.isArray(parsed.benefits) ? { benefits: parsed.benefits } : {}),
          ...(Array.isArray(parsed.stats) ? { stats: parsed.stats } : {}),
        };

        // Atualiza cache em memória
        memoryCache = { data: merged, provider, timestamp: now };

        return NextResponse.json(
          { source: provider, config: merged },
          { headers: isBypassCache ? NO_CACHE_HEADERS : EDGE_CACHE_HEADERS }
        );
      }
    }
  } catch (e) {
    console.warn("[Config API] Nuvem indisponivel:", e);
  }

  return NextResponse.json(
    { source: "default", config: ACADEMY_CONFIG },
    { headers: isBypassCache ? NO_CACHE_HEADERS : EDGE_CACHE_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newConfig = body.config || body;

    if (!newConfig || typeof newConfig !== "object") {
      return NextResponse.json(
        { success: false, error: "Configuracao invalida" },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    let savedToCloud = false;
    let cloudError: string | null = null;
    let providerUsed = "none";

    try {
      const configToSave = { ...newConfig };
      const cleanPayload = JSON.stringify(configToSave).replace(/[\ufffd\u2014\u2013]/g, " - ");
      const result = await setCloudData(GLOBAL_CONFIG_KEY, cleanPayload);
      savedToCloud = result.success;
      providerUsed = result.provider;
      if (!result.success && result.error) {
        cloudError = result.error;
      } else {
        // Invalida cache em memória para que os próximos acessos recebam o novo dado
        memoryCache = null;
      }
      console.log(`[Config API] Config salva com sucesso no provedor: ${providerUsed}`);
    } catch (e: any) {
      cloudError = String(e?.message || e);
      console.error("[Config API] Erro ao salvar na nuvem:", e);
    }

    return NextResponse.json(
      { success: true, savedToCloud, provider: providerUsed, cloudError },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: String(err?.message || err) },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
