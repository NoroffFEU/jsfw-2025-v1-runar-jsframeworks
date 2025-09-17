"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16 text-center space-y-3">
      <h1 className="text-2xl">Something went wrong</h1>
      <p className="text-white/70">{error.message}</p>
      <button onClick={() => reset()} className="inline-flex rounded px-4 py-2 bg-white text-black">
        Try again
      </button>
    </div>
  );
}