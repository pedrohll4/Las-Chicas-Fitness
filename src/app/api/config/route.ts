import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BLOB_STORE_NAME = "las-chicas-config";
const BLOB_KEY = "global_config";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

async function getBlobStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore(BLOB_STORE_NAME);
  } catch (e) {
    console.warn("[Blobs] Falha ao importar @netlify/blobs:", e);
    return null;
  }
}

export async function GET() {
  try {
    const store = await getBlobStore();
    if (store) {
      const raw = await store.get(BLOB_KEY, { type: "text" });
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          const merged = {
            ...ACADEMY_CONFIG,
            ...parsed,
            contacts: {
              ...ACADEMY_CONFIG.contacts,
              ...(parsed.contacts || {}),
            },
          };
          console.log("[Config API] Config carregada do Netlify Blobs");
          return NextResponse.json(
            { source: "netlify_blobs", config: merged },
            { headers: NO_CACHE_HEADERS }
          );
        }
      }
    }
  } catch (e) {
    console.warn("[Config API] Netlify Blobs indisponivel:", e);
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

    try {
      const store = await getBlobStore();
      if (store) {
        await store.set(BLOB_KEY, JSON.stringify(newConfig));
        savedToCloud = true;
        console.log("[Config API] Config salva no Netlify Blobs");
      } else {
        cloudError = "Netlify Blobs nao disponivel neste ambiente";
      }
    } catch (e: any) {
      cloudError = String(e?.message || e);
      console.error("[Config API] Erro ao salvar no Netlify Blobs:", e);
    }

    return NextResponse.json(
      { success: true, savedToCloud, cloudError },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: String(err?.message || err) },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
