import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";
import { getCloudData, setCloudData, getKvCredentials, GLOBAL_CONFIG_KEY } from "@/lib/cloudStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
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
        console.log(`[Config API] Config carregada com sucesso do provedor: ${provider}`);
        return NextResponse.json(
          { source: provider, config: merged },
          { headers: NO_CACHE_HEADERS }
        );
      }
    }
  } catch (e) {
    console.warn("[Config API] Nuvem indisponivel:", e);
  }

  return NextResponse.json(
    { source: "default", config: ACADEMY_CONFIG },
    { headers: NO_CACHE_HEADERS }
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
