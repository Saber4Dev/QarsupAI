import { generateMetadata as genMeta, pageMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config/site';

export const metadata = genMeta({
  ...pageMetadata.pricing,
  url: `${siteUrl}/pricing`,
});

export default function PricingLayout({ children }) {
  return <>{children}</>;
}
