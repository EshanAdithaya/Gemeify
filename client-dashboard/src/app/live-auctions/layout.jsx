import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Live Auctions',
  description: 'Watch and bid in real time on certified gemstones at live Gemify auctions.',
  path: '/live-auctions',
  keywords: ['live gem auction', 'real time bidding'],
});

export default function LiveAuctionsLayout({ children }) {
  return children;
}
