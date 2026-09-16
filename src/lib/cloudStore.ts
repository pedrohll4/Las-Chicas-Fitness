/**
 * Adaptador universal de Armazenamento na Nuvem
 * Suporta automaticamente:
 * 1. Vercel KV / Upstash Redis (quando hospedado na Vercel ou com variáveis KV_REST_API_*)
 * 2. Netlify Blobs (quando hospedado na Netlify)
 */

const BLOB_STORE_NAME = "las-chicas-config";
export const GLOBAL_CONFIG_KEY = "global_config";

export function getKvCredentials(): { url: string | undefined; token: string | undefined } {
  // 1. Prefixos conhecidos
  const url =
    process.env.STORAGE_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_API_URL ||
    process.env.STORAGE_URL ||
    process.env.UPSTASH_REDIS_URL ||
    process.env.KV_URL;

  const token =
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_API_TOKEN ||
    process.env.STORAGE_TOKEN ||
    process.env.UPSTASH_REDIS_TOKEN ||
    process.env.KV_TOKEN;

  if (url && token) return { url, token };

  // 2. Busca dinâmica por qualquer variável de ambiente injetada pelo Upstash / Vercel KV
  for (const [k, v] of Object.entries(process.env)) {
    if (k.endsWith("_REST_API_URL") && v) {
      const prefix = k.replace(/_REST_API_URL$/, "");
      const matchedToken = process.env[`${prefix}_REST_API_TOKEN`];
      if (matchedToken) return { url: v, token: matchedToken };
    }
  }

  return { url: undefined, token: undefined };
}

export async function getCloudData(key: string = GLOBAL_CONFIG_KEY): Promise<{ data: string | null; provider: string }> {
  // 1. Tentar Vercel KV ou Upstash Redis via REST
  const { url: kvUrl, token: kvToken } = getKvCredentials();

  if (kvUrl && kvToken) {
    try {
      const cleanUrl = kvUrl.replace(/\/$/, "");
      
      // Tentativa A: Upstash REST Command POST ["GET", key]
      const cmdRes = await fetch(cleanUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", key]),
        cache: "no-store",
      });

      if (cmdRes.ok) {
        const json = await cmdRes.json();
        if (json && json.result !== null && json.result !== undefined) {
          const raw = typeof json.result === "string" ? json.result : JSON.stringify(json.result);
          return { data: raw, provider: "vercel_kv" };
        }
      }

      // Tentativa B: Endpoint legado GET /get/key
      const getRes = await fetch(`${cleanUrl}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: "no-store",
      });
      if (getRes.ok) {
        const json = await getRes.json();
        if (json && json.result !== null && json.result !== undefined) {
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
  const { url: kvUrl, token: kvToken } = getKvCredentials();

  if (kvUrl && kvToken) {
    try {
      const cleanUrl = kvUrl.replace(/\/$/, "");

      // Tentativa A: Upstash REST Command POST ["SET", key, value]
      const cmdRes = await fetch(cleanUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", key, value]),
      });

      if (cmdRes.ok) {
        return { success: true, provider: "vercel_kv" };
      }

      // Tentativa B: Endpoint legado POST /set/key
      const setRes = await fetch(`${cleanUrl}/set/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: typeof value === "string" ? value : JSON.stringify(value),
      });

      if (setRes.ok) {
        return { success: true, provider: "vercel_kv" };
      } else {
        const errText = await setRes.text();
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
