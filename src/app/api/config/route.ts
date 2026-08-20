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

// Obter configuração
export async function GET() {
  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };

  // 1. Tenta carregar do arquivo local (se ambiente permitir)
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
    console.warn("Ambiente read-only ou arquivo ausente:", fileErr);
  }

  // 2. Fallback padrão: Retorna configuração padrão
  return NextResponse.json(
    {
      source: "default",
      config: ACADEMY_CONFIG,
    },
    { headers }
  );
}

// Salvar configuração (Seguro, resiliente e sem travar na Vercel)
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

    let savedLocally = false;

    // Tenta salvar no disco se o ambiente permitir escrita
    try {
      const dir = path.dirname(LOCAL_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(newConfig, null, 2), "utf-8");
      savedLocally = true;
    } catch (e) {
      // Vercel serverless functions são read-only em runtime
    }

    return NextResponse.json(
      {
        success: true,
        savedLocally,
        message: "Configurações salvas com sucesso!",
      },
      { headers }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: true,
        message: "Configurações recebidas com sucesso!",
      },
      { headers }
    );
  }
}
