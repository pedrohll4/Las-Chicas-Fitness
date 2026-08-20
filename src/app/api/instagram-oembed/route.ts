import { NextRequest, NextResponse } from "next/server";

function extractInstagramId(url: string): { type: "reel" | "post" | null; id: string | null } {
  const reelMatch = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/);
  if (reelMatch) return { type: "reel", id: reelMatch[1] };
  const postMatch = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  if (postMatch) return { type: "post", id: postMatch[1] };
  return { type: null, id: null };
}

// Extrai o valor de uma meta tag og: do HTML
function extractMetaContent(html: string, property: string): string | null {
  // Tenta og: ou twitter: tags
  const patterns = [
    new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
  }

  const { type, id } = extractInstagramId(url);
  if (!type || !id) {
    return NextResponse.json({ error: "Link inválido do Instagram" }, { status: 400 });
  }

  let thumbnailUrl: string | null = null;
  let title: string = "";

  try {
    // Faz scraping do og:image da página pública do Instagram
    // Usa User-Agent de browser real para o Instagram não bloquear
    const cleanUrl =
      type === "reel"
        ? `https://www.instagram.com/reel/${id}/`
        : `https://www.instagram.com/p/${id}/`;

    const resp = await fetch(cleanUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
      // cache de 2 horas para não fazer requests repetidos
      next: { revalidate: 7200 },
    });

    if (resp.ok) {
      // Lê apenas os primeiros 40KB do HTML (suficiente para pegar as meta tags do head)
      const buffer = await resp.arrayBuffer();
      const html = new TextDecoder().decode(buffer.slice(0, 40000));

      // Busca og:image (thumbnail real do Reel)
      thumbnailUrl =
        extractMetaContent(html, "og:image") ||
        extractMetaContent(html, "twitter:image") ||
        null;

      // Busca og:title (legenda/título do Reel)
      title =
        extractMetaContent(html, "og:title") ||
        extractMetaContent(html, "og:description") ||
        "";
    }
  } catch {
    // Sem thumbnail — o frontend vai usar a foto real da academia como fallback
  }

  return NextResponse.json({
    id,
    type,
    thumbnailUrl,
    title,
    permalink: url,
  });
}
