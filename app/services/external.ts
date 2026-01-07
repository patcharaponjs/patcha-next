export type ExternalItem = {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  image?: string;
};

export async function fetchExternal(
  source: "products" | "news",
  q?: string
): Promise<ExternalItem[]> {

  // 🛒 Products (FakeStore)
  if (source === "products") {
    const items = await fetch(
      "https://fakestoreapi.com/products",
      { cache: "no-store" }
    ).then(r => r.json());

    const filtered = q
      ? items.filter((p: any) =>
          (p.title + p.category).toLowerCase().includes(q.toLowerCase())
        )
      : items;

    return filtered.slice(0, 6).map((p: any) => ({
      id: String(p.id),
      title: p.title,
      subtitle: `$${p.price} • ${p.category}`,
      url: p.image,
      image: p.image
    }));
  }

  // 📰 News (Hacker News - Algolia)
  const url = new URL("https://hn.algolia.com/api/v1/search");
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "6");
  if (q) url.searchParams.set("query", q);

  const data = await fetch(url.toString(), { cache: "no-store" })
    .then(r => r.json());

  return (data.hits || []).map((h: any) => ({
    id: String(h.objectID),
    title: h.title,
    subtitle: `${h.points ?? 0} points • by ${h.author}`,
    url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`
  }));
}
