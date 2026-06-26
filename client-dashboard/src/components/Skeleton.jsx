'use client';

export function Skeleton({ className = '' }) {
  return (
    <div className={`shimmer rounded-sm bg-slate-100 ${className}`} />
  );
}

export function GemCardSkeleton() {
  return (
    <div className="luxury-card overflow-hidden">
      <Skeleton className="w-full h-52 rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-5 w-2/3" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}

export function GemGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <GemCardSkeleton key={i} />
      ))}
    </div>
  );
}
