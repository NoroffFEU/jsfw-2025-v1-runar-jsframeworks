import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-3">
      <h1 className="text-2xl">Page not found</h1>
      <Link href="/" className="inline-flex rounded px-4 py-2 bg-white text-black">
        Go home
      </Link>
    </div>
  );
}