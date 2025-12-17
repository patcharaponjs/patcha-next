export type Post = {
slug: string;
title: string;
excerpt: string;
content: string;
date: string;
tags?: string[];
};

export const posts = [
  {
    slug: 'hello-nextjs',
    title: 'เริ่มต้นทำเว็บด้วย Next.js',
    excerpt: 'เรียนรู้วิธีการสร้างโปรเจกต์ Next.js ตั้งแต่พื้นฐาน',
    content: 'Next.js คือ Framework ยอดนิยมสำหรับ React...',
    date: '2025-12-16',
    tags: ['nextjs', 'web']
  },
  {
    slug: 'react-hooks-guide',
    title: 'คู่มือ React Hooks',
    excerpt: 'จัดการ state และ lifecycle ด้วย Hooks',
    content: 'การใช้งาน useState และ useEffect แบบละเอียด...',
    date: '2025-12-17',
    tags: ['react', 'frontend']
  },
  {
    slug: 'typescript-basic',
    title: 'พื้นฐาน TypeScript',
    excerpt: 'เพิ่มความปลอดภัยให้โค้ดด้วย Type System',
    content: 'ทำไมเราถึงควรเปลี่ยนมาใช้ TypeScript...',
    date: '2025-12-18',
    tags: ['typescript', 'coding']
  },
  {
    slug: 'nextjs-routing',
    title: 'ระบบ Routing ใน Next.js',
    excerpt: 'เข้าใจ App Router และ Dynamic Routes',
    content: 'การจัดโครงสร้างโฟลเดอร์ใน Next.js 15...',
    date: '2025-12-19',
    tags: ['nextjs', 'routing']
  },
  {
    slug: 'css-modules-tips',
    title: 'การใช้ CSS Modules',
    excerpt: 'วิธีจัดการ CSS ไม่ให้ชื่อ Class ซ้ำกัน',
    content: 'เทคนิคการเขียน CSS แบบ Modular...',
    date: '2025-12-20',
    tags: ['css', 'design']
  },
  {
    slug: 'api-routes-tutorial',
    title: 'สร้าง API Routes ใน Next.js',
    excerpt: 'วิธีทำ Backend ง่ายๆ ภายในโปรเจกต์เดียว',
    content: 'การสร้าง GET และ POST endpoint...',
    date: '2025-12-21',
    tags: ['api', 'backend']
  }
];

export function getAllPosts() { return posts; }
export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}