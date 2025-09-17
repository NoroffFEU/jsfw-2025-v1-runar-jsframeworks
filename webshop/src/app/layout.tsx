import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/store/CartContext";
import ToastHost from "@/components/ToastHost";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Online Webshop",
  description: "Noroff JS Frameworks assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          <Footer />
          <ToastHost />
        </CartProvider>
      </body>
    </html>
  );
}