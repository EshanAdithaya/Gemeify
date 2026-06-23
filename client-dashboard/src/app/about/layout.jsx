import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Gemify',
  description:
    'Gemify bridges collectors, enthusiasts and verified sellers in a secure, elegant marketplace for discovering and acquiring precious stones.',
  path: '/about',
});

export default function AboutLayout({ children }) {
  return children;
}
