'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Events } from '@/lib/analytics';

// Fires a page_load event on every client-side navigation. Rendered once in
// the app shell.
export default function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => {
    Events.pageLoad(pathname);
  }, [pathname]);
  return null;
}
