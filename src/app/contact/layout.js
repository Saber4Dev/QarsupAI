import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.contact,
  url: `${siteUrl}/contact`,
});

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
