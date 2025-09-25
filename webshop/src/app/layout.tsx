import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/store/CartContext";
import ToastHost from "@/components/ToastHost";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Chopping Mall",
  description: "Chopping Mall is chopping their prices! Chop the prices down!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">
        <CartProvider>
          <Header />

          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </div>
          </main>

          <Footer />

          <ToastHost />
        </CartProvider>
      </body>
    </html>
  );
}