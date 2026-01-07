import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getPostBySlug,
} from "@/app/lib/posts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const post = getPostBySlug(slug);
    return Response.json(post ?? null);
  }

  return Response.json(getPosts());
}

export async function POST(req: Request) {
  const data = await req.json();
  addPost(data);
  return Response.json({ ok: true });
}

export async function PUT(req: Request) {
  const { slug, ...data } = await req.json();
  updatePost(slug, data);
  return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { slug } = await req.json();
  deletePost(slug);
  return Response.json({ ok: true });
}
