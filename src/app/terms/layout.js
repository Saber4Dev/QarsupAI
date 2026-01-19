import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.terms,
  url: `${siteUrl}/terms`,
  noindex: true, // Terms pages often set to noindex
});

export default function TermsLayout({ children }) {
  return <>{children}</>;
}
