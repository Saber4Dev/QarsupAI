import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.login,
  url: `${siteUrl}/login`,
  noindex: true,
});

export default function LoginLayout({ children }) {
  return <>{children}</>;
}
