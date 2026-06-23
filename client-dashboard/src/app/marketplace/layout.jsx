import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Gem Marketplace',
  description:
    'Browse certified sapphires, rubies, emeralds and diamonds. Filter by carat, cut, clarity, origin and certification lab — every stone lab-verified.',
  path: '/marketplace',
  keywords: ['buy gemstones online', 'certified loose gems', 'GIA certified sapphire'],
});

export default function MarketplaceLayout({ children }) {
  return children;
}
