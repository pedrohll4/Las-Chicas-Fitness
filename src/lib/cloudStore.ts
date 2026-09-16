/**
 * Adaptador universal de Armazenamento na Nuvem
 * Suporta automaticamente:
 * 1. Vercel KV / Upstash Redis (quando hospedado na Vercel ou com variáveis KV_REST_API_*)
 * 2. Netlify Blobs (quando hospedado na Netlify)
 */

const BLOB_STORE_NAME = "las-chicas-config";
export const GLOBAL_CONFIG_KEY = "global_config";

export async function getCloudData(key: string = GLOBAL_CONFIG_KEY): Promise<{ data: string | null; provider: string }> {
  // 1. Tentar Vercel KV ou Upstash Redis via REST
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const cleanUrl = kvUrl.replace(/\/$/, "");
      const res = await fetch(`${cleanUrl}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.result) {
          const raw = typeof json.result === "string" ? json.result : JSON.stringify(json.result);
          return { data: raw, provider: "vercel_kv" };
        }
      }
    } catch (e) {
      console.warn("[CloudStore] Erro ao buscar do Vercel KV / Redis:", e);
    }
  }

  // 2. Tentar Netlify Blobs
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore(BLOB_STORE_NAME);
    if (store) {
      const raw = await store.get(key, { type: "text" });
      if (raw) {
        return { data: raw, provider: "netlify_blobs" };
      }
    }
  } catch (e) {
    // Netlify Blobs não disponível
  }

  return { data: null, provider: "none" };
}

export async function setCloudData(key: string = GLOBAL_CONFIG_KEY, value: string): Promise<{ success: boolean; provider: string; error?: string }> {
  // 1. Tentar Vercel KV ou Upstash Redis via REST
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const cleanUrl = kvUrl.replace(/\/$/, "");
      const res = await fetch(`${cleanUrl}/set/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      if (res.ok) {
        return { success: true, provider: "vercel_kv" };
      } else {
        const errText = await res.text();
        return { success: false, provider: "vercel_kv", error: errText };
      }
    } catch (e: any) {
      console.error("[CloudStore] Erro ao salvar no Vercel KV / Redis:", e);
      return { success: false, provider: "vercel_kv", error: e?.message || String(e) };
    }
  }

  // 2. Tentar Netlify Blobs
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore(BLOB_STORE_NAME);
    if (store) {
      await store.set(key, value);
      return { success: true, provider: "netlify_blobs" };
    }
  } catch (e: any) {
    console.error("[CloudStore] Erro ao salvar no Netlify Blobs:", e);
    return { success: false, provider: "netlify_blobs", error: e?.message || String(e) };
  }

  return { success: false, provider: "none", error: "Nenhum provedor de nuvem configurado" };
}
