function SkeletonCard() {
  return (
    <div className="rounded-lg bg-white/5 overflow-hidden">
      <div className="aspect-[4/3] animate-pulse bg-white/10" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 animate-pulse bg-white/10 rounded" />
        <div className="h-4 w-1/3 animate-pulse bg-white/10 rounded" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </main>
  );
}