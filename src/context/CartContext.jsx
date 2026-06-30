import React, { createContext, useContext, useReducer, useMemo, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { productId, variantId, qty = 1 } = action.payload;
      const key = `${productId}::${variantId}`;
      const existing = state.items[key];
      return {
        ...state,
        items: {
          ...state.items,
          [key]: {
            productId,
            variantId,
            qty: (existing?.qty || 0) + qty,
          },
        },
      };
    }
    case "SET_QTY": {
      const { productId, variantId, qty } = action.payload;
      const key = `${productId}::${variantId}`;
      if (qty <= 0) {
        const next = { ...state.items };
        delete next[key];
        return { ...state, items: next };
      }
      return {
        ...state,
        items: { ...state.items, [key]: { productId, variantId, qty } },
      };
    }
    case "REMOVE": {
      const { productId, variantId } = action.payload;
      const key = `${productId}::${variantId}`;
      const next = { ...state.items };
      delete next[key];
      return { ...state, items: next };
    }
    case "CLEAR":
      return { ...state, items: {} };
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload };
    case "TOGGLE_WISHLIST": {
      const id = action.payload;
      const set = new Set(state.wishlist);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...state, wishlist: Array.from(set) };
    }
    default:
      return state;
  }
}

const initialState = { items: {}, coupon: null, wishlist: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = sessionStorage.getItem("anyasrrr_cart");
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("anyasrrr_cart", JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const api = useMemo(
    () => ({
      ...state,
      addToCart: (productId, variantId, qty = 1) =>
        dispatch({ type: "ADD", payload: { productId, variantId, qty } }),
      setQty: (productId, variantId, qty) =>
        dispatch({ type: "SET_QTY", payload: { productId, variantId, qty } }),
      removeFromCart: (productId, variantId) =>
        dispatch({ type: "REMOVE", payload: { productId, variantId } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      applyCoupon: (coupon) => dispatch({ type: "APPLY_COUPON", payload: coupon }),
      toggleWishlist: (productId) => dispatch({ type: "TOGGLE_WISHLIST", payload: productId }),
      itemCount: Object.values(state.items).reduce((sum, i) => sum + i.qty, 0),
    }),
    [state]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
