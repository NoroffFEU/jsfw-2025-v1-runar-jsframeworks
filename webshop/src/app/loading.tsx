/**
 * Skeleton UI card used while product data is loading.
 * Keeps layout stable and provides a visual loading state.
 *
 * @returns {JSX.Element}
 */
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

const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
];

/**
 * Route-level loading state for the webshop.
 * Renders a fixed set of skeleton cards while content is being fetched.
 *
 * @returns {JSX.Element}
 */
export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {SKELETON_KEYS.map((key) => (
          <SkeletonCard key={key} />
        ))}
      </div>
    </main>
  );
}