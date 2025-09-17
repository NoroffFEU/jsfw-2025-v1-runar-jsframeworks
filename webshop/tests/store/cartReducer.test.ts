import { cartReducer } from "@/store/CartContext";
import type { CartItem, CartState } from "@/store/cartTypes";

const item: CartItem = { id: "1", title: "Alpha", price: 100, qty: 1 };

describe("cartReducer", () => {
  it("legger til ny vare", () => {
    const s0: CartState = { items: [] };
    const s1 = cartReducer(s0, { type: "ADD", payload: item });
    expect(s1.items).toHaveLength(1);
    expect(s1.items[0]!.qty).toBe(1);
  });

  it("øker qty hvis samme vare legges til igjen", () => {
    const s1: CartState = { items: [item] };
    const s2 = cartReducer(s1, { type: "ADD", payload: { ...item, qty: 1 } });
    expect(s2.items[0]!.qty).toBe(2);
  });

  it("SET_QTY respekterer minimum 1", () => {
    const s1: CartState = { items: [item] };
    const s2 = cartReducer(s1, { type: "SET_QTY", id: "1", qty: 0 });
    expect(s2.items[0]!.qty).toBe(1);
  });

  it("REMOVE fjerner varen", () => {
    const s1: CartState = { items: [item] };
    const s2 = cartReducer(s1, { type: "REMOVE", id: "1" });
    expect(s2.items).toHaveLength(0);
  });

  it("CLEAR tømmer handlekurven", () => {
    const s1: CartState = { items: [item, { ...item, id: "2" }] };
    const s2 = cartReducer(s1, { type: "CLEAR" });
    expect(s2.items).toHaveLength(0);
  });
});