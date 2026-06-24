import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-obsidian-950 px-6">
      <div className="text-center">
        <p className="text-[7rem] md:text-[10rem] leading-none font-bold text-gold-gradient">
          404
        </p>
        <h1 className="text-2xl font-bold text-pearl-100 mt-2 mb-3">
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
