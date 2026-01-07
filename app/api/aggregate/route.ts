import { getPosts } from "@/app/lib/posts";
import { fetchExternal } from "@/app/services/external";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const source =
    url.searchParams.get("source") === "news"
      ? "news"
      : "products";

  const q = url.searchParams.get("q")?.trim() || undefined;
  const internal = getPosts();

  try {
    const external = await fetchExternal(source, q);
    return Response.json({ source, q, internal, external });
  } catch {
    return Response.json(
      {
        source,
        q,
        internal,
        external: [],
        error: "External API unavailable"
      },
      { status: 200 }
    );
  }
}
