import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '../../lib/posts';

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <section>
      <Link href="/blog">← Back</Link>
      <h1>{post.title}</h1>
      <small>{post.date}</small>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {post.content}
      </pre>
    </section>
  );
}
