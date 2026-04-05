import { NextResponse } from "next/server";
import { getOrder, getOrderIdByPayment } from "@/lib/orders";

type RouteContext = {
  params: Promise<{
    paymentId: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { paymentId } = await context.params;
    const orderId = await getOrderIdByPayment(paymentId);

    if (!orderId) {
      return NextResponse.json(
        { error: "Pedido nao encontrado." },
        { status: 404 },
      );
    }

    const order = await getOrder(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Pedido nao encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel consultar o pedido.",
      },
      { status: 500 },
    );
  }
}
