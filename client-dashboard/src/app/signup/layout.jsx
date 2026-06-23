import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Create Account', path: '/signup', noIndex: true });

export default function SignupLayout({ children }) {
  return children;
}
