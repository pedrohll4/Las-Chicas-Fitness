import { NextRequest, NextResponse } from "next/server";
import { ACADEMY_CONFIG } from "@/config/academy";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CLOUD_STORAGE_URL =
  "https://api.restful-api.dev/objects/ff8081819ff5b11001a020bae93d61f3";

const LOCAL_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "config",
  "saved_config.json"
);

// Obter configuração global (Nuvem / Arquivo / Padrão)
export async function GET() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };

  try {
    // 1. Tenta carregar da nuvem (acessível globalmente na Vercel para todos os computadores)
    const cloudResp = await fetch(CLOUD_STORAGE_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });

    if (cloudResp.ok) {
      const json = await cloudResp.json();
      if (json?.data?.config) {
        return NextResponse.json(
          {
            source: "cloud",
            config: {
              ...ACADEMY_CONFIG,
              ...json.data.config,
              contacts: {
                ...ACADEMY_CONFIG.contacts,
                ...(json.data.config.contacts || {}),
              },
            },
          },
          { headers }
        );
      }
    }
  } catch (cloudErr) {
    console.warn("Erro ao buscar config da nuvem:", cloudErr);
  }

  // 2. Fallback: Tenta carregar do arquivo local se existir
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
    console.warn("Erro ao ler arquivo local:", fileErr);
  }

  // 3. Fallback final: Configuração padrão do código
  return NextResponse.json(
    {
      source: "default",
      config: ACADEMY_CONFIG,
    },
    { headers }
  );
}

// Salvar configuração global (Nuvem + Arquivo Local)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newConfig = body.config || body;

    if (!newConfig || typeof newConfig !== "object") {
      return NextResponse.json(
        { error: "Configuração inválida enviada" },
        { status: 400 }
      );
    }

    let savedToCloud = false;
    let savedToLocal = false;

    // 1. Salva na nuvem para que TODOS os computadores e visitantes vejam
    try {
      const cloudPutResp = await fetch(CLOUD_STORAGE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({
          name: "Las Chicas Fitness Global Config",
          data: {
            config: newConfig,
            updatedAt: new Date().toISOString(),
          },
        }),
      });

      if (cloudPutResp.ok) {
        savedToCloud = true;
      }
    } catch (cloudErr) {
      console.error("Erro ao salvar config na nuvem:", cloudErr);
    }

    // 2. Salva no arquivo local se possível
    try {
      const dir = path.dirname(LOCAL_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(newConfig, null, 2), "utf-8");
      savedToLocal = true;
    } catch (fileErr) {
      // Em ambientes de produção read-only (como Vercel) isso é esperado
    }

    return NextResponse.json(
      {
        success: true,
        savedToCloud,
        savedToLocal,
        message: "Configuração salva com sucesso para todos os visitantes!",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao processar salvamento: " + err.message },
      { status: 500 }
    );
  }
}
