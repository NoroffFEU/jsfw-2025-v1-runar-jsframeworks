export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/70">
        © {new Date().getFullYear()} Online Webshop
      </div>
    </footer>
  );
}