import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Chopping Mall</p>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}