import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Chopping Mall",
  description:
    "Learn about Chopping Mall — an online shop delivering quality goods at slashed, cut-rate prices. Built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">About Us</h1>

      <p className="text-white/80">
        Chopping Mall is a no-nonsense online shop where the focus is simple:
        great products at prices that are cut to the bone. We keep overheads
        lean, pass the savings straight to you, and make the whole experience
        fast, secure, and easy from browse to basket to checkout.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded bg-white/5 p-4">
          <h2 className="font-medium mb-2">What We Stand For</h2>
          <ul className="list-disc pl-5 text-white/80 space-y-1">
            <li>Cut-rate pricing without cutting corners on quality</li>
            <li>Clear product info and honest availability</li>
            <li>Fast, reliable delivery options</li>
            <li>Helpful support when you need it</li>
          </ul>
        </div>

        <div className="rounded bg-white/5 p-4">
          <h2 className="font-medium mb-2">Contact</h2>
          <p className="text-white/80">
            Questions, feedback, or just want to say hello? Email{" "}
            <span className="underline">runar@choppingmall.com</span>.
          </p>
        </div>
      </div>

      <p className="text-sm text-white/60">
        Last updated: {new Date().toLocaleDateString("en-GB")}
      </p>
    </section>
  );
}