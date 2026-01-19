import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.blog,
  url: `${siteUrl}/blog`,
  image: '/images/blog/1.jpg',
});

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
