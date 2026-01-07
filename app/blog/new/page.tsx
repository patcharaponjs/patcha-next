"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function submit() {
    const slug = title.toLowerCase().replaceAll(" ", "-");

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        slug,
        title,
        content,
        date: new Date().toISOString().slice(0, 10),
      }),
    });

    router.push("/blog");
  }

  return (
    <section>
      <h1>New Post</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={submit}>Create</button>
    </section>
  );
}
