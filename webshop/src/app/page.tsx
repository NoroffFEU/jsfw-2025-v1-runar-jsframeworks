import { getProducts } from "@/lib/api";
import ProductsExplorer from "@/components/ProductsExplorer";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <ProductsExplorer initial={products} />
    </main>
  );
}