export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian-950">
      <div className="flex flex-col items-center gap-5">
        {/* Gold hexagon with ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-sm border border-gold-800/40 animate-ping opacity-40" />
          <div className="absolute inset-0 rounded-sm border border-gold-700/30 animate-pulse" />
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
              <polygon
                points="16,2 28,9 28,23 16,30 4,23 4,9"
                fill="rgba(212,175,55,0.12)"
                stroke="rgba(212,175,55,0.7)"
                strokeWidth="1"
              />
              <polygon
                points="16,8 23,12 23,20 16,24 9,20 9,12"
                fill="rgba(212,175,55,0.08)"
                stroke="rgba(212,175,55,0.4)"
                strokeWidth="0.75"
              />
            </svg>
          </div>
        </div>
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-pearl-600">
          Loading
        </p>
      </div>
    </div>
  );
}
