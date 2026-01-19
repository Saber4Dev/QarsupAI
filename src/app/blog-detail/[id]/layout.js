import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { blogData } from '../../data/data';
import { siteUrl } from '@/lib/config/site';

export async function generateMetadata({ params }) {
  // Await params in Next.js 15+
  const resolvedParams = await params;
  const blog = blogData.find(b => b.id === parseInt(resolvedParams.id));
  
  if (!blog) {
    return genMeta({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    });
  }

  return genMeta({
    title: blog.title,
    description: `Read ${blog.title} by ${blog.author}. ${blog.date}`,
    url: `${siteUrl}/blog-detail/${blog.id}`,
    image: blog.image,
    type: 'article',
    publishedTime: blog.date,
    authors: [{ name: blog.author }],
    keywords: ['AI', 'Marketing', 'Content Creation', blog.title],
  });
}

export default function BlogDetailLayout({ children }) {
  return <>{children}</>;
}
