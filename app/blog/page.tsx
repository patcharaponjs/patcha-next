import Link from "next/link";
import DeletePostButton from "@/app/components/DeletePostButton";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { source?: string; q?: string };
}) {
  const source = searchParams.source === "news" ? "news" : "products";
  const q = searchParams.q ?? "";

  const res = await fetch(
    `http://localhost:3000/api/aggregate?source=${source}&q=${encodeURIComponent(q)}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <section className="container">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Blog Aggregator</h1>
        <div className="row">
          <Link className="btn" href={`/blog?source=products&q=${q}`}>
            Products
          </Link>
          <Link className="btn" href={`/blog?source=news&q=${q}`}>
            News
          </Link>
          <Link className="btn" href="/blog/new">
            + New
          </Link>
        </div>
      </div>

      {/* Search */}
      <form
        className="row"
        action="/blog"
        method="get"
        style={{ margin: "10px 0" }}
      >
        <input type="hidden" name="source" value={source} />
        <input name="q" defaultValue={q} placeholder="search..." />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      {/* ================= Internal Posts ================= */}
      <h2>My Posts</h2>
      <div className="grid">
        {data.internal.map((p: any) => (
          <article key={p.slug} className="card">
            <h3>{p.title}</h3>
            {p.excerpt && <p>{p.excerpt}</p>}
            <small>{p.date}</small>

            <div className="row">
              <Link className="btn" href={`/blog/${p.slug}`}>
                Read →
              </Link>

              <Link className="btn" href={`/blog/edit/${p.slug}`}>
                ✏️ Edit
              </Link>

              {/* ✅ ปุ่มลบ (Client Component) */}
              <DeletePostButton slug={p.slug} />
            </div>
          </article>
        ))}
      </div>

      {/* ================= External ================= */}
      <h2 style={{ marginTop: 18 }}>
        {source === "news" ? "External News" : "External Products"}
      </h2>

      {data.error && <p><small>{data.error}</small></p>}

      <div className="grid">
        {data.external.map((x: any) => (
          <article key={x.id} className="card">
            {x.image && (
              <img
                src={x.image}
                style={{ width: "100%", height: 160, objectFit: "contain" }}
              />
            )}
            <h3>{x.title}</h3>
            {x.subtitle && <small>{x.subtitle}</small>}
            {x.url && (
              <a className="btn" href={x.url} target="_blank">
                Open
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
