import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Curated Collections',
  description:
    'Hand-curated gemstone collections — signature sapphires, rare coloured stones and investment-grade diamonds selected by our gemologists.',
  path: '/collections',
  keywords: ['gemstone collections', 'investment gemstones'],
});

export default function CollectionsLayout({ children }) {
  return children;
}
