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
      const cleanRaw = raw.replace(/[\ufffd\u2014\u2013]/g, " - ");
      const parsed = JSON.parse(cleanRaw);
      if (parsed && typeof parsed === "object") {
        const merged = {
          ...ACADEMY_CONFIG,
          ...parsed,
          contacts: {
            ...ACADEMY_CONFIG.contacts,
            ...(parsed.contacts || {}),
          },
        };
        console.log(`[Config API] Config carregada do provedor: ${provider}`);
        return NextResponse.json(
          { source: provider, config: merged },
          { headers: NO_CACHE_HEADERS }
        );
      }
    }
  } catch (e) {
    console.warn("[Config API] Nuvem indisponivel:", e);
  }

  const { url: testUrl, token: testToken } = getKvCredentials();
  const availableStorageKeys = Object.keys(process.env).filter(
    (k) =>
      k.includes("KV") ||
      k.includes("REDIS") ||
      k.includes("STORAGE") ||
      k.includes("UPSTASH") ||
      k.includes("BLOB")
  );

  return NextResponse.json(
    {
      source: "default",
      config: ACADEMY_CONFIG,
      debug: {
        hasKvCredentials: !!(testUrl && testToken),
        availableStorageKeys,
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
      },
    },
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
      // Preservar depoimentos recentes da nuvem para evitar que sejam sobrescritos acidentalmente
      let configToSave = { ...newConfig };
      try {
        const { data: currentRaw } = await getCloudData(GLOBAL_CONFIG_KEY);
        if (currentRaw) {
          const currentObj = JSON.parse(currentRaw);
          if (Array.isArray(currentObj?.testimonials) && Array.isArray(newConfig?.testimonials)) {
            const submittedIds = new Set(newConfig.testimonials.map((t: any) => t.id));
            const missingFromCloud = currentObj.testimonials.filter((t: any) => !submittedIds.has(t.id));
            if (missingFromCloud.length > 0) {
              configToSave.testimonials = [...missingFromCloud, ...newConfig.testimonials].slice(0, 80);
            }
          }
        }
      } catch (mergeErr) {
        console.warn("[Config API] Aviso no merge de testimonials:", mergeErr);
      }

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
