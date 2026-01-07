"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetch(`/api/posts?slug=${params.slug}`)
      .then(res => res.json())
      .then(post => {
        if (!post) return;
        setTitle(post.title);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setTags(post.tags?.join(", ") ?? "");
      });
  }, [params.slug]);

  async function save() {
    await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({
        slug: params.slug,
        title,
        excerpt,
        content,
        tags: tags.split(",").map(t => t.trim()),
      }),
    });

    router.push("/blog");
  }

  return (
    <section className="container">
      <div className="card">
        <h1>แก้ไขโพสต์</h1>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Excerpt"
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
        />

        <input
          placeholder="tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        <button onClick={save}>💾 บันทึกการแก้ไข</button>
      </div>
    </section>
  );
}
