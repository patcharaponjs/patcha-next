"use client";

export default function DeletePostButton({ slug }: { slug: string }) {
  async function del() {
    if (!confirm("ยืนยันลบโพสต์นี้?")) return;

    await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ slug }),
    });

    location.reload();
  }

  return (
    <button className="btn danger" onClick={del}>
      🗑 Delete
    </button>
  );
}
