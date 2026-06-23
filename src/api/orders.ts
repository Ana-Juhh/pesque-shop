/**
 * API routes for order processing and email notifications.
 */

import express, { Router, Request, Response } from "express";
import {
  sendEmail,
  sendEmailSafely,
  getOrderConfirmationEmail,
  getOrderNotificationEmail,
  getWeeklyReportEmail,
} from "../lib/email";
import { pb } from "../lib/pocketbase";

const router = Router();

router.post("/api/orders/process", async (req: Request, res: Response) => {
  try {
    const { orderId, customerName, customerEmail, total, items, paymentMethod } = req.body;

    if (!orderId || !customerEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await pb.collection("orders").update(orderId, {
      status: "pagamento_pendente",
    });

    const customerEmailHtml = getOrderConfirmationEmail({
      id: orderId,
      customerName,
      total,
      items,
      paymentMethod,
    });

    await sendEmail({
      to: customerEmail,
      subject: `Pedido Confirmado - #${orderId} | Pesque Shop`,
      html: customerEmailHtml,
    });

    const storeEmail = process.env.STORE_EMAIL || "admin@pesqueshop.com";
    const storeEmailHtml = getOrderNotificationEmail({
      id: orderId,
      customerName,
      customerEmail,
      total,
      items,
      paymentMethod,
    });

    await sendEmail({
      to: storeEmail,
      subject: `Novo Pedido Recebido - #${orderId}`,
      html: storeEmailHtml,
    });

    const paymentLink =
      paymentMethod === "link"
        ? process.env.PAYMENT_LINK || process.env.VITE_PAYMENT_LINK || null
        : null;

    return res.json({
      success: true,
      orderId,
      paymentLink,
      message: "Pedido registrado e emails enviados.",
    });
  } catch (error) {
    console.error("[orders] Process order error:", error);
    return res.status(500).json({ error: "Failed to process order" });
  }
});

router.post("/api/orders/status-email", async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    console.log(`[status-email] Received request orderId=${orderId} status=${status}`);

    if (!orderId || !status) {
      return res.status(400).json({ success: false, error: "orderId and status are required." });
    }

    const order = await pb.collection("orders").getOne(orderId);
    const storeEmail = process.env.STORE_EMAIL || "admin@pesqueshop.com";
    const customerEmail = order.customerEmail || order.email;

    const statusHtml = `
      <h2>Atualização de Status do Pedido</h2>
      <p>Pedido: #${orderId}</p>
      <p>Status: <strong>${status}</strong></p>
      <p>Cliente: ${order.customerName || customerEmail || "-"}</p>
      <p>Valor: R$ ${Number(order.total || 0).toFixed(2)}</p>
    `;

    const storeResult = await sendEmailSafely("Order status update (store)", {
      to: storeEmail,
      subject: `Pedido #${orderId} - ${status}`,
      html: statusHtml,
    });

    const customerResult = customerEmail
      ? await sendEmailSafely("Order status update (customer)", {
          to: customerEmail,
          subject: `Seu pedido #${orderId} - ${status}`,
          html: `
            <h2>Atualização do seu pedido</h2>
            <p>O status do seu pedido #${orderId} foi atualizado para: <strong>${status}</strong></p>
            ${statusHtml}
          `,
        })
      : { sent: false, error: "Customer email not available" };

    return res.json({ success: true, results: { store: storeResult, customer: customerResult } });
  } catch (error) {
    console.error("[status-email] Error sending status emails:", error);
    return res.status(500).json({ success: false, error: "Failed to send status emails.", details: error instanceof Error ? error.message : String(error) });
  }
});

router.post("/api/reports/weekly", async (_req: Request, res: Response) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orders = await pb.collection("orders").getFullList({
      filter: `created >= "${sevenDaysAgo.toISOString()}"`,
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (parseFloat(order.total) || 0),
      0,
    );

    const ordersStatus: Record<string, number> = {};
    const productMap = new Map<string, { quantity: number; revenue: number; name: string }>();

    orders.forEach((order: any) => {
      const status = order.status || "unknown";
      ordersStatus[status] = (ordersStatus[status] || 0) + 1;

      (order.items || []).forEach((item: any) => {
        const existing = productMap.get(item.id);
        const quantity = item.quantity || 1;
        const revenue = (item.price || 0) * quantity;

        if (existing) {
          existing.quantity += quantity;
          existing.revenue += revenue;
        } else {
          productMap.set(item.id, {
            name: item.name || "Produto",
            quantity,
            revenue,
          });
        }
      });
    });

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const weekStart = sevenDaysAgo.toLocaleDateString("pt-BR");
    const weekEnd = new Date().toLocaleDateString("pt-BR");

    const reportHtml = getWeeklyReportEmail({
      weekStart,
      weekEnd,
      totalOrders,
      totalRevenue,
      ordersStatus,
      topProducts,
    });

    const storeEmail = process.env.STORE_EMAIL || "admin@pesqueshop.com";
    await sendEmail({
      to: storeEmail,
      subject: `Relatório Semanal - Pesque Shop (${weekStart} a ${weekEnd})`,
      html: reportHtml,
    });

    return res.json({
      success: true,
      totalOrders,
      totalRevenue,
      ordersStatus,
      topProducts: topProducts.length,
    });
  } catch (error) {
    console.error("[orders] Weekly report error:", error);
    return res.status(500).json({ error: "Failed to generate weekly report" });
  }
});

export default router;
