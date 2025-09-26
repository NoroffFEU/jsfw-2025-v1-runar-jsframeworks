import type { CartItem, CartState } from "./cartTypes";

export type Action =
  | { type: "LOAD"; payload: CartState }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

export function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "LOAD": {
      const items = Array.isArray(action.payload?.items)
        ? action.payload.items
        : [];
      return { items };
    }
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      const items = exists
        ? state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + action.payload.qty }
              : i
          )
        : [...state.items, action.payload];
      return { items };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };

    case "CLEAR":
      return { items: [] };

    default: {
      // Exhaustiveness check
      ((x: never) => x)(action as never);
      return state;
    }
  }
}