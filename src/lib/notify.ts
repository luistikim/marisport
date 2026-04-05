import { Resend } from "resend";
import { formatCurrency, contactEmail, siteName } from "@/data/site";
import type { OrderRecord } from "@/lib/orders";

export type OrderNotificationResult =
  | { status: "sent"; emailId?: string }
  | { status: "failed"; error: string }
  | { status: "skipped"; reason: string };

const resendApiKey = process.env.RESEND_API_KEY?.trim() ?? "";
const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim() ?? "";
const notificationRecipient =
  process.env.ORDER_NOTIFICATION_EMAIL?.trim() || contactEmail;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderOrderItems(order: OrderRecord) {
  return order.items
    .map(
      (item) => `
        <li>
          ${escapeHtml(item.name)} - ${item.quantity}x ${
            item.unitPrice === null ? "Consulte disponibilidade" : formatCurrency(item.unitPrice)
          }
        </li>
      `,
    )
    .join("");
}

function renderCustomerBlock(order: OrderRecord) {
  const customer = order.customer;

  if (!customer) {
    return "<p><strong>Cliente:</strong> nao informado no checkout.</p>";
  }

  return `
    <p><strong>Cliente:</strong> ${escapeHtml(customer.name ?? "Nao informado")}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(customer.email ?? "Nao informado")}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(customer.phone ?? "Nao informado")}</p>
    <p><strong>Documento:</strong> ${escapeHtml(
      customer.identification?.type && customer.identification?.number
        ? `${customer.identification.type}: ${customer.identification.number}`
        : "Nao informado",
    )}</p>
  `;
}

export function buildOrderNotificationEmail(order: OrderRecord) {
  const subject = `[${siteName}] Pedido aprovado #${order.id}`;
  const notes = order.notes?.trim() || "Sem observacoes informadas no checkout.";

  const text = [
    `Pedido aprovado: ${order.id}`,
    `Cliente: ${order.customer?.name ?? "Nao informado"}`,
    `E-mail: ${order.customer?.email ?? "Nao informado"}`,
    `Telefone: ${order.customer?.phone ?? "Nao informado"}`,
    `Subtotal: ${formatCurrency(order.subtotal)}`,
    `Observacoes: ${notes}`,
    "",
    "Itens:",
    ...order.items.map(
      (item) =>
        `- ${item.quantity}x ${item.name} (${
          item.unitPrice === null ? "Consulte disponibilidade" : formatCurrency(item.unitPrice)
        })`,
    ),
    "",
    "Entre em contato com o cliente e combine a entrega assim que possivel.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#132022">
      <h1>Pedido aprovado #${escapeHtml(order.id)}</h1>
      <p><strong>Subtotal:</strong> ${escapeHtml(formatCurrency(order.subtotal))}</p>
      ${renderCustomerBlock(order)}
      <p><strong>Observacoes:</strong> ${escapeHtml(notes)}</p>
      <h2>Itens</h2>
      <ul>${renderOrderItems(order)}</ul>
      <p>Entre em contato com o cliente e combine a entrega assim que possivel.</p>
    </div>
  `;

  return { subject, text, html };
}

export async function notifyOrderOwner(order: OrderRecord): Promise<OrderNotificationResult> {
  if (!resend || !resendApiKey || !resendFromEmail) {
    return {
      status: "skipped",
      reason: "Resend nao configurado.",
    };
  }

  try {
    const email = buildOrderNotificationEmail(order);
    const { data, error } = await resend.emails.send({
      from: resendFromEmail,
      to: [notificationRecipient],
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) {
      return {
        status: "failed",
        error:
          typeof error === "string"
            ? error
            : "Nao foi possivel enviar a notificacao por e-mail.",
      };
    }

    return {
      status: "sent",
      emailId: data?.id,
    };
  } catch (error) {
    return {
      status: "failed",
      error:
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar a notificacao por e-mail.",
    };
  }
}
