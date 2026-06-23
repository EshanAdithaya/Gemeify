import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Sign In', path: '/login', noIndex: true });

export default function LoginLayout({ children }) {
  return children;
}
