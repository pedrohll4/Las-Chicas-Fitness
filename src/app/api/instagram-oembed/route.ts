import { NextRequest, NextResponse } from "next/server";

// Extrai o ID do reel ou post de um link do Instagram
function extractInstagramId(url: string): { type: "reel" | "post" | null; id: string | null } {
  const reelMatch = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/);
  if (reelMatch) return { type: "reel", id: reelMatch[1] };

  const postMatch = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  if (postMatch) return { type: "post", id: postMatch[1] };

  return { type: null, id: null };
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

  try {
    // Usa a API pública de oEmbed do Instagram (sem token necessário para dados básicos)
    const oembedUrl = `https://graph.facebook.com/v19.0/instagram_oembed?url=${encodeURIComponent(url)}&maxwidth=400&fields=thumbnail_url,title,author_name&access_token=anonymous`;

    // Tenta o endpoint público alternativo
    const publicOembed = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`;

    let thumbnailUrl: string | null = null;
    let authorName: string = "@las.chicasfitness";
    let title: string = "";

    try {
      const resp = await fetch(publicOembed, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; LasChicasFitnessBot/1.0)",
        },
        next: { revalidate: 3600 }, // cache por 1 hora
      });

      if (resp.ok) {
        const data = await resp.json();
        thumbnailUrl = data.thumbnail_url || null;
        authorName = data.author_name || "@las.chicasfitness";
        title = data.title || "";
      }
    } catch {
      // fallback: sem thumbnail
    }

    return NextResponse.json({
      id,
      type,
      thumbnailUrl,
      authorName,
      title,
      embedUrl:
        type === "reel"
          ? `https://www.instagram.com/reel/${id}/embed/captioned/`
          : `https://www.instagram.com/p/${id}/embed/captioned/`,
      permalink: url,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar dados do Instagram" },
      { status: 500 }
    );
  }
}
