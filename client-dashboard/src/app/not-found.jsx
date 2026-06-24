import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-obsidian-950 px-6">
      <div className="text-center">
        <p className="font-display font-light text-[7rem] md:text-[10rem] leading-none text-gold-gradient"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
          404
        </p>
        <h1 className="font-display text-2xl font-light text-pearl-100 mt-2 mb-3"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
          Stone Not Found
        </h1>
        <p className="text-pearl-500 text-sm mb-8">
          The gem you are looking for has moved or does not exist.
        </p>
        <Link href="/marketplace" className="btn-gold">
          Browse the Collection <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}
