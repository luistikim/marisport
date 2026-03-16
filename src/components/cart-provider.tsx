"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CatalogProduct } from "@/data/site";

const CART_STORAGE_KEY = "marisport-cart";

export type CartItem = CatalogProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (product: CatalogProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart) as CartItem[]);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (product) => {
        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === product.id);

          if (existingItem) {
            return currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [...currentItems, { ...product, quantity: 1 }];
        });
      },
      removeItem: (productId) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== productId),
        );
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          setItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId),
          );
          return;
        }

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        );
      },
      clearCart: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
