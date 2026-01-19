import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.about,
  url: `${siteUrl}/aboutus`,
  image: '/images/about.jpg',
});

export default function AboutUsLayout({ children }) {
  return <>{children}</>;
}
