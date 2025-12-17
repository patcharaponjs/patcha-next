import Link from 'next/link';
import { getAllPosts } from '../lib/posts'// แนะนำให้ใช้ @ แทน ../.. ถ้าตั้งค่า path ไว้

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Blog</h1>
            {/* ใช้ CSS Grid จัดเรียงเป็นช่องๆ */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px',
                marginTop: '20px' 
            }}>
                {posts.map((post: any) => (
                    <div key={post.slug} style={{ 
                        border: '1px solid #ddd', 
                        padding: '15px', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.1)' // ให้เข้ากับพื้นหลังสีเขียวของคุณ
                    }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{post.title}</h3>
                        <p style={{ fontSize: '14px' }}>{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} style={{ color: '#0070f3', fontWeight: 'bold' }}>
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}