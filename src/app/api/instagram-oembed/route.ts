import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
  }

  try {
    const cleanUrl = url.split("?")[0].replace(/\/$/, "") + "/";
    const resp = await fetch(cleanUrl, {
      headers: {
        "User-Agent":
          "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        Accept: "*/*",
      },
      next: { revalidate: 3600 },
    });

    if (resp.ok) {
      const html = await resp.text();
      const match =
        html.match(/property="og:image"\s+content="([^"]+)"/) ||
        html.match(/content="([^"]+)"\s+property="og:image"/) ||
        html.match(/property='og:image'\s+content='([^']+)'/) ||
        html.match(/content='([^']+)'\s+property='og:image'/);

      if (match && match[1]) {
        // Decodificar entidades html como &amp;
        const rawImgUrl = match[1].replace(/&amp;/g, "&");
        const proxiedUrl = `/api/instagram-image?url=${encodeURIComponent(rawImgUrl)}`;

        return NextResponse.json({
          thumbnailUrl: proxiedUrl,
          rawThumbnailUrl: rawImgUrl,
          permalink: url,
        });
      }
    }

    return NextResponse.json({
      thumbnailUrl: null,
      permalink: url,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar dados do Instagram" },
      { status: 500 }
    );
  }
}
