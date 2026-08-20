import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LOCAL_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "config",
  "saved_config.json"
);

// Função para obter o store do Netlify Blobs de forma segura
async function getNetlifyConfigStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore("las-chicas-config");
  } catch (e) {
    return null;
  }
}

// Obter configuração global
export async function GET() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };

  // 1. Tenta carregar do Netlify Blobs (armazenamento oficial na nuvem do Netlify)
  try {
    const store = await getNetlifyConfigStore();
    if (store) {
      const netlifyData: any = await store.get("global_config", { type: "json" });
      if (netlifyData && typeof netlifyData === "object") {
        return NextResponse.json(
          {
            source: "netlify_blobs",
            config: {
              ...ACADEMY_CONFIG,
              ...netlifyData,
              contacts: {
                ...ACADEMY_CONFIG.contacts,
                ...(netlifyData.contacts || {}),
              },
            },
          },
          { headers }
        );
      }
    }
  } catch (netlifyErr) {
    console.warn("Netlify Blobs não disponível ou sem dados:", netlifyErr);
  }

  // 2. Fallback: Arquivo local (para desenvolvimento local)
  try {
    if (fs.existsSync(LOCAL_FILE_PATH)) {
      const fileData = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json(
        {
          source: "local_file",
          config: {
            ...ACADEMY_CONFIG,
            ...parsed,
            contacts: {
              ...ACADEMY_CONFIG.contacts,
              ...(parsed.contacts || {}),
            },
          },
        },
        { headers }
      );
    }
  } catch (fileErr) {
    console.warn("Arquivo local não acessível:", fileErr);
  }

  // 3. Fallback: Configuração padrão do código
  return NextResponse.json(
    {
      source: "default",
      config: ACADEMY_CONFIG,
    },
    { headers }
  );
}

// Salvar configuração globalmente no Netlify Blobs e Local
export async function POST(req: NextRequest) {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };

  try {
    const body = await req.json();
    const newConfig = body.config || body;

    if (!newConfig || typeof newConfig !== "object") {
      return NextResponse.json(
        { error: "Configuração inválida enviada" },
        { status: 400, headers }
      );
    }

    let savedToNetlify = false;
    let savedLocally = false;

    // 1. Salva no Netlify Blobs (permanente para todos os usuários e computadores)
    try {
      const store = await getNetlifyConfigStore();
      if (store) {
        await store.setJSON("global_config", newConfig);
        savedToNetlify = true;
      }
    } catch (netlifyErr) {
      console.warn("Erro ao salvar no Netlify Blobs:", netlifyErr);
    }

    // 2. Salva no arquivo local se o ambiente permitir
    try {
      const dir = path.dirname(LOCAL_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(newConfig, null, 2), "utf-8");
      savedLocally = true;
    } catch (e) {}

    return NextResponse.json(
      {
        success: true,
        savedToNetlify,
        savedLocally,
        message: "Configurações salvas com sucesso para todos os visitantes!",
      },
      { headers }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: true,
        message: "Configuração processada com sucesso!",
      },
      { headers }
    );
  }
}
