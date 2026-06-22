'use client';

import { useAuth } from '@/context/AuthContext';
import BannedMessage from './BannedMessage';

// Blocks page content for suspended accounts. Anonymous browsing is allowed,
// mirroring the original storefront behaviour.
export default function Protected({ children }) {
  const { user, isBanned } = useAuth();
  if (user && isBanned) {
    return <BannedMessage />;
  }
  return children;
}
