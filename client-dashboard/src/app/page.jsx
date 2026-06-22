'use client';

import Protected from '@/components/Protected';
import GemifyLanding from '@/components/GemifyLanding';

export default function HomePage() {
  return (
    <Protected>
      <GemifyLanding />
    </Protected>
  );
}
