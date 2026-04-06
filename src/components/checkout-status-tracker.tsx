"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import type { OrderRecord } from "@/lib/orders";
import { formatCurrency } from "@/data/site";

type CheckoutStatusTrackerProps = {
  fallbackStatus: "approved" | "pending" | "rejected";
};

type ResolvePaymentResponse = OrderRecord & {
  resolvedFrom?: "cache" | "mercado_pago";
  message?: string;
};

const FALLBACK_INTERVAL_MS = 2500;
const MAX_FALLBACK_ATTEMPTS = 3;

function getStatusContent(status: OrderRecord["status"] | "rejected") {
  switch (status) {
    case "approved":
      return {
        eyebrow: "Sucesso",
        title: "Pedido recebido com pagamento confirmado.",
        description:
          "Agora a Mari Sport pode seguir com a separação do pedido. Se quiser alinhar tamanho, cor ou entrega, você ainda pode continuar o atendimento pelo WhatsApp ou pela página de contato.",
      };
    case "pending":
      return {
        eyebrow: "Pendente",
        title: "Seu pedido foi recebido, mas o pagamento ainda não foi concluído.",
        description:
          "Isso pode acontecer em Pix aguardando pagamento, boleto ou análise do meio de pagamento. Se precisar, você pode voltar ao carrinho ou falar com a Mari Sport para confirmar os próximos passos.",
      };
    default:
      return {
        eyebrow: "Falha",
        title: "Você pode revisar o carrinho e tentar novamente.",
        description:
          "Nada se perde: seu carrinho continua salvo neste navegador. Se preferir, a Mari Sport também pode seguir com o atendimento pelo WhatsApp ou por e-mail.",
      };
  }
}

function getOrderItemVariationLabel(item: OrderRecord["items"][number]) {
  const parts = [];

  if (item.selectedSize) {
    parts.push(`Tamanho: ${item.selectedSize}`);
  }

  if (item.selectedColor) {
    parts.push(`Cor: ${item.selectedColor}`);
  }

  return parts.join(" | ");
}

export function CheckoutStatusTracker({
  fallbackStatus,
}: CheckoutStatusTrackerProps) {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const activeRequestIdRef = useRef(0);
  const pollTimeoutRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isStoppedRef = useRef(false);
  const fallbackAttemptsRef = useRef(0);
  const clearCartRef = useRef(clearCart);
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    clearCartRef.current = clearCart;
  }, [clearCart]);

  useEffect(() => {
    isStoppedRef.current = false;
    fallbackAttemptsRef.current = 0;
    setOrder(null);
    setErrorMessage(null);

    if (pollTimeoutRef.current !== null) {
      window.clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    if (!orderId && !paymentId) {
      return;
    }

    const scheduleNextPoll = (runPoll: () => Promise<void>) => {
      fallbackAttemptsRef.current += 1;

      if (fallbackAttemptsRef.current >= MAX_FALLBACK_ATTEMPTS) {
        setErrorMessage(
          "Ainda nao conseguimos confirmar o pagamento. Seu pedido continua salvo e voce pode falar com a loja para verificar o status.",
        );
        return;
      }

      pollTimeoutRef.current = window.setTimeout(runPoll, FALLBACK_INTERVAL_MS);
    };

    const runPoll = async () => {
      if (isStoppedRef.current || (!orderId && !paymentId)) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const requestId = activeRequestIdRef.current + 1;
      activeRequestIdRef.current = requestId;
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch("/api/orders/resolve-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId ?? undefined,
            paymentId: paymentId ?? undefined,
          }),
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as ResolvePaymentResponse & {
          error?: string;
        };

        if (isStoppedRef.current || activeRequestIdRef.current !== requestId) {
          return;
        }

        if (!response.ok) {
          if (response.status === 404 || response.status >= 500) {
            scheduleNextPoll(runPoll);
            return;
          }

          throw new Error(data.error ?? "Nao foi possivel consultar o pedido.");
        }

        setOrder(data);
        setErrorMessage(null);

        if (data.status === "approved") {
          clearCartRef.current();
          return;
        }

        if (data.status === "rejected" || data.status === "cancelled") {
          return;
        }

        if (data.status === "created" || data.status === "pending" || !data.paymentStatus) {
          scheduleNextPoll(runPoll);
        }
      } catch (error) {
        if (
          isStoppedRef.current ||
          activeRequestIdRef.current !== requestId ||
          (error instanceof DOMException && error.name === "AbortError")
        ) {
          return;
        }

        scheduleNextPoll(runPoll);
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    };

    void runPoll();

    return () => {
      isStoppedRef.current = true;
      if (pollTimeoutRef.current !== null) {
        window.clearTimeout(pollTimeoutRef.current);
        pollTimeoutRef.current = null;
      }
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, [orderId, paymentId]);

  const resolvedStatus = useMemo(() => {
    if (!order) {
      return fallbackStatus;
    }

    if (order.status === "rejected" || order.status === "cancelled") {
      return "rejected";
    }

    if (order.status === "created") {
      return "pending";
    }

    return order.status;
  }, [fallbackStatus, order]);

  const content = getStatusContent(resolvedStatus);

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/8 p-8 text-center text-white shadow-[0_18px_50px_rgba(19,38,59,0.12)]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase leading-tight">
          {content.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-200">
          {content.description}
        </p>

        {order ? (
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/6 p-6 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
              Pedido {order.id}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-300">
              Status atual: {order.paymentStatus ?? order.status}
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {formatCurrency(order.subtotal)}
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              {order.items.map((item) => (
                <div key={item.itemKey ?? `${item.id}-${item.selectedSize ?? "no-size"}-${item.selectedColor ?? "no-color"}`}>
                  <p>
                    {item.quantity}x {item.name}
                  </p>
                  {getOrderItemVariationLabel(item) ? (
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-300">
                      {getOrderItemVariationLabel(item)}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#ffd3c5]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/carrinho"
            className="inline-flex rounded-full bg-[#dff1cf] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#27402c] hover:bg-[#cee4b6]"
          >
            Voltar ao carrinho
          </Link>
          <Link
            href="/contato"
            className="inline-flex rounded-full border border-white/30 bg-white/86 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-surface-strong hover:bg-white"
          >
            Falar com a loja
          </Link>
        </div>
      </div>
    </section>
  );
}
