import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Gemstone Auctions',
  description:
    'Bid on rare certified gemstones in live and timed auctions. Transparent provenance and lab certification on every lot.',
  path: '/auctions',
  keywords: ['gemstone auction', 'bid on gems', 'rare gem auction'],
});

export default function AuctionsLayout({ children }) {
  return children;
}
