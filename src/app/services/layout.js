import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.services,
  url: `${siteUrl}/services`,
});

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}
