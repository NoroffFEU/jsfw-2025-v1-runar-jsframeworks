import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsExplorer from "@/components/ProductsExplorer";
import type { Product } from "@/types/product";

const products: Product[] = [
  { id: "1", title: "Alpha", price: 10 },
  { id: "2", title: "Beta", price: 20 },
  { id: "3", title: "Gamma", price: 30 }
];

describe("ProductsExplorer", () => {
  it("filterer listen ved søk", async () => {
    render(<ProductsExplorer initial={products} />);
    const input = screen.getByLabelText(/search products/i);
    await userEvent.type(input, "be");
    // Beta skal være synlig i forslag/griden
    expect(screen.getAllByText(/Beta/).length).toBeGreaterThan(0);
  });
});