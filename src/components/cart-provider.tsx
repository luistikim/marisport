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
  selectedSize?: string;
  selectedColor?: string;
  itemKey: string;
};

type CartSelection = {
  selectedSize?: string;
  selectedColor?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (product: CatalogProduct, selection?: CartSelection) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeVariationValue(value?: string) {
  return value?.trim() || undefined;
}

function buildCartItemKey(
  productId: string,
  selection?: CartSelection,
): string {
  const selectedSize = normalizeVariationValue(selection?.selectedSize) ?? "";
  const selectedColor = normalizeVariationValue(selection?.selectedColor) ?? "";

  return [productId, selectedSize.toLowerCase(), selectedColor.toLowerCase()].join("::");
}

function normalizeCartItem(item: Partial<CartItem> & CatalogProduct): CartItem {
  const selectedSize = normalizeVariationValue(item.selectedSize);
  const selectedColor = normalizeVariationValue(item.selectedColor);
  const itemKey =
    item.itemKey ?? buildCartItemKey(item.id, { selectedSize, selectedColor });

  return {
    ...item,
    quantity: item.quantity ?? 1,
    selectedSize,
    selectedColor,
    itemKey,
  };
}

function isPersistedCartItem(
  item: unknown,
): item is Partial<CartItem> & CatalogProduct {
  if (!item || typeof item !== "object") {
    return false;
  }

  const typedItem = item as Partial<CartItem> & CatalogProduct;

  return (
    typeof typedItem.id === "string" &&
    typedItem.id.trim().length > 0 &&
    typeof typedItem.quantity === "number" &&
    Number.isInteger(typedItem.quantity) &&
    typedItem.quantity > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedItems = JSON.parse(storedCart) as unknown[];
        setItems(
          parsedItems.filter(isPersistedCartItem).map(normalizeCartItem),
        );
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
      addItem: (product, selection) => {
        const selectedSize = normalizeVariationValue(selection?.selectedSize);
        const selectedColor = normalizeVariationValue(selection?.selectedColor);
        const itemKey = buildCartItemKey(product.id, {
          selectedSize,
          selectedColor,
        });

        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.itemKey === itemKey);

          if (existingItem) {
            return currentItems.map((item) =>
              item.itemKey === itemKey
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [
            ...currentItems,
            {
              ...product,
              quantity: 1,
              selectedSize,
              selectedColor,
              itemKey,
            },
          ];
        });
      },
      removeItem: (itemKey) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.itemKey !== itemKey),
        );
      },
      updateQuantity: (itemKey, quantity) => {
        if (quantity <= 0) {
          setItems((currentItems) =>
            currentItems.filter((item) => item.itemKey !== itemKey),
          );
          return;
        }

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.itemKey === itemKey ? { ...item, quantity } : item,
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
