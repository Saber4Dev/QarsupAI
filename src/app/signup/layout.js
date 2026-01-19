import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.signup,
  url: `${siteUrl}/signup`,
});

export default function SignupLayout({ children }) {
  return <>{children}</>;
}
