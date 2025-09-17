"use client";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { CartItem, CartState } from "./cartTypes";
import { toast } from "sonner";

type Action =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

// ⬇️ gjør denne eksportert
export function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    // ...cases...
    default: {
      // Exhaustive check uten lint-varsel:
      ( (x: never) => x )(action as never);
      return state;
    }
  }
}

type Ctx = {
  state: CartState;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: number;
  totalCost: number;
};

const CartCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "webshop_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as CartState;
      if (parsed?.items) parsed.items.forEach(i => dispatch({ type: "ADD", payload: { ...i } }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api: Ctx = useMemo(() => ({
    state,
    add: (item) => { dispatch({ type: "ADD", payload: item }); toast.success(`${item.title} added to cart`); },
    remove: (id) => { const item = state.items.find(i => i.id === id); dispatch({ type: "REMOVE", id }); toast.warning(`${item?.title ?? "Item"} removed`); },
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    totalQty: state.items.reduce((n, i) => n + i.qty, 0),
    totalCost: state.items.reduce((sum, i) => sum + i.qty * i.price, 0),
  }), [state]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}