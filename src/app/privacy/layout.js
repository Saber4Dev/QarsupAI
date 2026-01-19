import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.privacy,
  url: `${siteUrl}/privacy`,
  noindex: true, // Privacy pages often set to noindex
});

export default function PrivacyLayout({ children }) {
  return <>{children}</>;
}
