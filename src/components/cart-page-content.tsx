"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckoutProButton } from "@/components/checkout-pro-button";
import { useCart } from "@/components/cart-provider";
import type { CartItem } from "@/components/cart-provider";
import { buildWhatsAppLink, contactEmail, formatCurrency, whatsappPhone } from "@/data/site";

const MAX_ITEM_QUANTITY = 50;
const NOTES_MAX_LENGTH = 500;
const MAX_WHATSAPP_URL_LENGTH = 1800;

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyCartState() {
  return (
    <section className="px-5 pb-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/8 p-8 text-center text-white shadow-[0_18px_50px_rgba(19,38,59,0.12)]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
          Carrinho vazio
        </p>
        <h2 className="mt-4 text-3xl font-black uppercase">
          Escolha alguns produtos para montar seu pedido.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-200">
          O carrinho fica salvo neste navegador, sem precisar criar conta.
          Quando você adicionar itens, daqui você consegue revisar tudo e
          enviar o pedido pelo WhatsApp ou pelo Mercado Pago.
        </p>
        <Link
          href="/produtos"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong hover:opacity-90"
        >
          Ver produtos
        </Link>
      </div>
    </section>
  );
}

// ─── Cart item card ────────────────────────────────────────────────────────────

type CartItemCardProps = {
  item: CartItem;
  isPending: boolean;
  isRemoving: boolean;
  onRemove: (itemKey: string) => void;
  onDecrease: (itemKey: string, current: number) => void;
  onIncrease: (itemKey: string, current: number) => void;
};

function formatItemVariation(item: CartItem) {
  const parts: string[] = [];

  if (item.selectedSize) {
    parts.push(`Tamanho: ${item.selectedSize}`);
  }

  if (item.selectedColor) {
    parts.push(`Cor: ${item.selectedColor}`);
  }

  return parts;
}

function CartItemCard({
  item,
  isPending,
  isRemoving,
  onRemove,
  onDecrease,
  onIncrease,
}: CartItemCardProps) {
  const itemMaxQuantity = Math.min(MAX_ITEM_QUANTITY, item.availableStock ?? MAX_ITEM_QUANTITY);
  const atMax = item.quantity >= itemMaxQuantity;
  const variationParts = formatItemVariation(item);
  const variationLabel = variationParts.length
    ? ` (${variationParts.map((variation) => variation.toLowerCase()).join(", ")})`
    : "";

  return (
    <article
      className={`rounded-[2rem] border border-line bg-surface p-6 shadow-[0_16px_40px_rgba(19,38,59,0.08)] transition-opacity duration-200 ${
        isPending ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {item.badge}
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase text-surface-strong">
            {item.name}
          </h2>
          {variationParts.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {variationParts.map((variation) => (
                <span
                  key={variation}
                  className="rounded-full border border-[#d8e4db] bg-[#f8fbf8] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#536566]"
                >
                  {variation}
                </span>
              ))}
            </div>
          ) : null}
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
            {item.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.itemKey)}
          disabled={isPending}
          className="self-start rounded-full border border-[#d8e4db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-strong transition-colors hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed"
          aria-label={`Remover ${item.name}${variationLabel} do carrinho`}
        >
          {isRemoving ? "Removendo…" : "Remover"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
          {item.unitPrice === null
            ? "Consulte disponibilidade"
            : formatCurrency(item.unitPrice)}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Qtd
          </span>
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
            <button
              type="button"
              onClick={() => onDecrease(item.itemKey, item.quantity)}
              disabled={isPending}
              className="px-4 py-2 text-lg font-bold text-surface-strong transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Diminuir quantidade de ${item.name}${variationLabel}`}
            >
              −
            </button>
            <span className="min-w-10 text-center text-sm font-bold text-surface-strong">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrease(item.itemKey, item.quantity)}
              disabled={isPending || atMax}
              className="px-4 py-2 text-lg font-bold text-surface-strong transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Aumentar quantidade de ${item.name}${variationLabel}`}
            >
              +
            </button>
          </div>
          {atMax && (
            <span className="text-xs text-slate-400">
              Máx. {itemMaxQuantity}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Clear cart confirmation ───────────────────────────────────────────────────

type ClearConfirmProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function ClearCartConfirm({ onConfirm, onCancel }: ClearConfirmProps) {
  return (
    <div className="rounded-[1.2rem] border border-red-200 bg-white/90 p-4">
      <p className="text-sm font-semibold text-[#7a3020]">
        Remover todos os itens do carrinho?
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-full bg-red-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-700 hover:bg-red-200"
        >
          Confirmar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full border border-[#d8e4db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-surface-strong hover:bg-[#f4fbef]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ─── Order summary sidebar ─────────────────────────────────────────────────────

type OrderSummaryProps = {
  items: CartItem[];
  itemCount: number;
  hasUnpricedItems: boolean;
  subtotal: number;
  whatsappHref: string;
  notes: string;
  onNotesChange: (value: string) => void;
  showClearConfirm: boolean;
  isClearPending: boolean;
  onClearRequest: () => void;
  onClearConfirm: () => void;
  onClearCancel: () => void;
};

function OrderSummary({
  items,
  itemCount,
  hasUnpricedItems,
  subtotal,
  whatsappHref,
  notes,
  onNotesChange,
  showClearConfirm,
  isClearPending,
  onClearRequest,
  onClearConfirm,
  onClearCancel,
}: OrderSummaryProps) {
  return (
    <aside className="rounded-[2rem] bg-[linear-gradient(135deg,#d8ff9e_0%,#97ee4a_48%,#64d21c_100%)] p-8 text-surface-strong shadow-[0_18px_60px_rgba(125,187,56,0.14)]">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#2d4a1e]">
        Resumo do pedido
      </p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-tight">
        Revise os itens e envie para atendimento.
      </h2>

      <div className="mt-6 rounded-[1.5rem] border border-white/45 bg-white/65 p-5">
        <p className="text-sm uppercase tracking-[0.16em] text-[#506859]">
          Itens no carrinho
        </p>
        <p className="mt-2 text-4xl font-black">{itemCount}</p>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-white/45 bg-white/65 p-5">
        <p className="text-sm uppercase tracking-[0.16em] text-[#506859]">
          Subtotal
        </p>
        <p className="mt-2 text-3xl font-black">
          {hasUnpricedItems ? "A configurar" : formatCurrency(subtotal)}
        </p>
      </div>

      <label className="mt-6 block">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2d4a1e]">
          Observações do pedido
        </span>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={4}
          maxLength={NOTES_MAX_LENGTH}
          placeholder="Ex.: quero ver cores disponíveis, tamanhos M e G, ou combinar entrega."
          className="mt-3 w-full rounded-[1.2rem] border border-white/45 bg-white/80 px-4 py-3 text-sm text-surface-strong outline-none placeholder:text-[#7a8b7f]"
        />
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-[#506859]">
            Incluído apenas no pedido por WhatsApp ou e-mail.
          </p>
          <p className="text-xs tabular-nums text-[#506859]">
            {notes.length}/{NOTES_MAX_LENGTH}
          </p>
        </div>
      </label>

      <div className="mt-6 flex flex-col gap-3">
        <CheckoutProButton items={items} notes={notes} disabled={hasUnpricedItems} />

        <Link
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex justify-center rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#27402c] hover:bg-[#cee4b6]"
        >
          Enviar pedido no WhatsApp
        </Link>

        <Link
          href={`mailto:${contactEmail}?subject=Pedido%20Mari%20Sport`}
          className="inline-flex justify-center rounded-full border border-white/30 bg-white/86 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong hover:bg-white"
        >
          Enviar por e-mail
        </Link>

        {showClearConfirm ? (
          <ClearCartConfirm onConfirm={onClearConfirm} onCancel={onClearCancel} />
        ) : (
          <button
            type="button"
            onClick={onClearRequest}
            disabled={isClearPending}
            className="inline-flex justify-center rounded-full border border-white/30 bg-white/15 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isClearPending ? "Limpando…" : "Limpar carrinho"}
          </button>
        )}
      </div>

      {hasUnpricedItems && (
        <p className="mt-5 text-sm leading-7 text-[#2d4a1e]">
          Um ou mais produtos ainda não têm preço definido. O Checkout Pro ficará
          disponível assim que todos os preços forem configurados.
        </p>
      )}

      <p className="mt-5 text-sm leading-7 text-[#2d4a1e]">
        Sem cadastro: o carrinho fica salvo neste navegador e o fechamento segue
        com a equipe da Mari Sport.
      </p>
    </aside>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export function CartPageContent() {
  const { items, itemCount, clearCart, removeItem, updateQuantity } = useCart();
  const [notes, setNotes] = useState("");
  const [pendingItemIds, setPendingItemIds] = useState<Set<string>>(() => new Set());
  const [removingItemIds, setRemovingItemIds] = useState<Set<string>>(() => new Set());
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearPending, setIsClearPending] = useState(false);
  const pendingItemIdsRef = useRef(pendingItemIds);
  const removingItemIdsRef = useRef(removingItemIds);
  const pendingItemTokensRef = useRef(new Map<string, number>());
  const pendingTimersRef = useRef(new Map<string, number>());
  const clearCartTimerRef = useRef<number | null>(null);
  const pendingSequenceRef = useRef(0);

  const syncPendingItemIds = useCallback((nextPendingItemIds: Set<string>) => {
    pendingItemIdsRef.current = nextPendingItemIds;
    setPendingItemIds(nextPendingItemIds);
  }, []);

  const syncRemovingItemIds = useCallback((nextRemovingItemIds: Set<string>) => {
    removingItemIdsRef.current = nextRemovingItemIds;
    setRemovingItemIds(nextRemovingItemIds);
  }, []);

  useEffect(() => {
    return () => {
      pendingTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      pendingTimersRef.current.clear();
      pendingItemTokensRef.current.clear();
      removingItemIdsRef.current = new Set();
      if (clearCartTimerRef.current !== null) {
        window.clearTimeout(clearCartTimerRef.current);
        clearCartTimerRef.current = null;
      }
    };
  }, [syncPendingItemIds, syncRemovingItemIds]);

  useEffect(() => {
    const activeItemIds = new Set(items.map((item) => item.itemKey));
    const currentPendingIds = pendingItemIdsRef.current;
    let changed = false;
    const nextPendingItemIds = new Set<string>();

    currentPendingIds.forEach((id) => {
      if (activeItemIds.has(id)) {
        nextPendingItemIds.add(id);
        return;
      }

      changed = true;

      const timerId = pendingTimersRef.current.get(id);
      if (timerId !== undefined) {
        window.clearTimeout(timerId);
        pendingTimersRef.current.delete(id);
      }

      pendingItemTokensRef.current.delete(id);
    });

    if (changed || nextPendingItemIds.size !== currentPendingIds.size) {
      syncPendingItemIds(nextPendingItemIds);
    }
  }, [items, syncPendingItemIds]);

  function startPendingItem(id: string) {
    if (pendingItemIdsRef.current.has(id)) {
      return null;
    }

    const token = pendingSequenceRef.current + 1;
    pendingSequenceRef.current = token;
    pendingItemTokensRef.current.set(id, token);

    const nextPendingItemIds = new Set(pendingItemIdsRef.current);
    nextPendingItemIds.add(id);
    syncPendingItemIds(nextPendingItemIds);

    return token;
  }

  function finishPendingItem(id: string, token: number) {
    if (pendingItemTokensRef.current.get(id) !== token) {
      return;
    }

    pendingItemTokensRef.current.delete(id);

    const nextPendingItemIds = new Set(pendingItemIdsRef.current);
    nextPendingItemIds.delete(id);
    syncPendingItemIds(nextPendingItemIds);
  }

  function clearAllPendingWork() {
    pendingTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    pendingTimersRef.current.clear();
    pendingItemTokensRef.current.clear();
    syncPendingItemIds(new Set());
    syncRemovingItemIds(new Set());
  }

  function runItemAction(
    id: string,
    delay: number,
    action: () => void,
    mode: "immediate" | "deferred",
    feedback: "adjust" | "remove",
  ) {
    const token = startPendingItem(id);

    if (!token) {
      return;
    }

    if (feedback === "remove") {
      const nextRemovingItemIds = new Set(removingItemIdsRef.current);
      nextRemovingItemIds.add(id);
      syncRemovingItemIds(nextRemovingItemIds);
    }

    const timerId = window.setTimeout(() => {
      pendingTimersRef.current.delete(id);

      try {
        if (mode === "deferred") {
          action();
        }
      } catch {
        // Keep the UI stable and release the item lock even if the cart action fails.
      } finally {
        finishPendingItem(id, token);
        if (feedback === "remove") {
          const nextRemovingItemIds = new Set(removingItemIdsRef.current);
          nextRemovingItemIds.delete(id);
          syncRemovingItemIds(nextRemovingItemIds);
        }
      }
    }, delay);

    pendingTimersRef.current.set(id, timerId);

    if (mode === "immediate") {
      try {
        action();
      } catch {
        window.clearTimeout(timerId);
        pendingTimersRef.current.delete(id);
        finishPendingItem(id, token);
        if (feedback === "remove") {
          const nextRemovingItemIds = new Set(removingItemIdsRef.current);
          nextRemovingItemIds.delete(id);
          syncRemovingItemIds(nextRemovingItemIds);
        }
      }
    }
  }

  const hasUnpricedItems = items.some((item) => item.unitPrice === null);

  const subtotal = items.reduce((total, item) => {
    if (item.unitPrice === null) return total;
    return total + item.unitPrice * item.quantity;
  }, 0);

  const whatsappHref = useMemo(() => {
    const lines = [
      "Olá! Vim pelo site da Mari Sport e quero fechar este pedido:",
      "",
      ...items.map((item) => {
        const lineTotal =
          item.unitPrice === null
            ? "consulte disponibilidade"
            : formatCurrency(item.unitPrice * item.quantity);
        const variationParts = formatItemVariation(item);
        const variationLabel = variationParts.length
          ? ` - ${variationParts.map((part) => part.toLowerCase()).join(", ")}`
          : "";

        return `- ${item.quantity}x ${item.name}${variationLabel} (${lineTotal})`;
      }),
    ];

    if (notes.trim()) {
      lines.push("", `Observações: ${notes.trim()}`);
    }

    lines.push("", `Total de itens: ${itemCount}`);

    if (!hasUnpricedItems) {
      lines.push(`Subtotal: ${formatCurrency(subtotal)}`);
    }

    const message = lines.join("\n");
    const directLink = buildWhatsAppLink(whatsappPhone, message);

    if (directLink.length <= MAX_WHATSAPP_URL_LENGTH) {
      return directLink;
    }

    return buildWhatsAppLink(
      whatsappPhone,
      `Ola! Vim pelo site da Mari Sport e quero fechar meu pedido. Meu carrinho esta muito grande para enviar automaticamente. Total de itens: ${itemCount}.`,
    );
  }, [hasUnpricedItems, itemCount, items, notes, subtotal, whatsappPhone]);

  // Quantity decrease: if reaching 0 the provider removes the item.
  // Sync op + 300 ms cooldown per item to prevent double-clicks.
  function handleDecrease(itemKey: string, current: number) {
    if (current <= 1) {
      return;
    }

    runItemAction(
      itemKey,
      300,
      () => updateQuantity(itemKey, current - 1),
      "immediate",
      "adjust",
    );
  }

  function handleIncrease(itemKey: string, current: number) {
    if (current >= MAX_ITEM_QUANTITY) return;

    runItemAction(
      itemKey,
      300,
      () => updateQuantity(itemKey, current + 1),
      "immediate",
      "adjust",
    );
  }

  // Removal: brief visual delay so the user sees the "Removendo…" state
  // before the item disappears from the list.
  function handleRemove(itemKey: string) {
    runItemAction(itemKey, 200, () => removeItem(itemKey), "deferred", "remove");
  }

  function handleClearRequest() {
    setShowClearConfirm(true);
  }

  function handleClearConfirm() {
    setShowClearConfirm(false);
    setIsClearPending(true);
    if (clearCartTimerRef.current !== null) {
      window.clearTimeout(clearCartTimerRef.current);
    }

    clearCartTimerRef.current = window.setTimeout(() => {
      try {
        clearAllPendingWork();
        clearCart();
      } catch {
        // If clearing the cart fails, keep the current state consistent and release loading.
      } finally {
        setIsClearPending(false);
        clearCartTimerRef.current = null;
      }
    }, 200);
  }

  function handleClearCancel() {
    setShowClearConfirm(false);
  }

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <section className="px-5 pb-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {items.map((item) => (
            <CartItemCard
              key={item.itemKey}
              item={item}
              isPending={pendingItemIds.has(item.itemKey)}
              isRemoving={removingItemIds.has(item.itemKey)}
              onRemove={handleRemove}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />
          ))}
        </div>

        <OrderSummary
          items={items}
          itemCount={itemCount}
          hasUnpricedItems={hasUnpricedItems}
          subtotal={subtotal}
          whatsappHref={whatsappHref}
          notes={notes}
          onNotesChange={setNotes}
          showClearConfirm={showClearConfirm}
          isClearPending={isClearPending}
          onClearRequest={handleClearRequest}
          onClearConfirm={handleClearConfirm}
          onClearCancel={handleClearCancel}
        />
      </div>
    </section>
  );
}
