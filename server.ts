/**
 * Express server for handling email notifications and weekly reports.
 * Run this alongside Vite with `npm run server`.
 */

import express from "express";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import ordersRouter from "./src/api/orders";
import { sendEmailSafely } from "./src/lib/email";
import { pb } from "./src/lib/pocketbase";

dotenv.config();

const app = express();
const PORT = Number(process.env.SERVER_PORT || 3001);
const APP_URL = process.env.APP_URL || "http://localhost:3000";
const ENABLE_WEEKLY_REPORT = process.env.ENABLE_WEEKLY_REPORT !== "false";
const orderStatusCache = new Map<string, string>();

app.use(cors({ origin: APP_URL }));
app.use(express.json());
app.use(ordersRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

if (ENABLE_WEEKLY_REPORT) {
  cron.schedule("0 10 * * 5", async () => {
    console.log("[server] Running weekly report...");

    try {
      const response = await fetch(`http://localhost:${PORT}/api/reports/weekly`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[server] Weekly report failed:", errorText);
      } else {
        console.log("[server] Weekly report sent successfully");
      }
    } catch (error) {
      console.error("[server] Error running weekly report:", error);
    }
  });
}

async function sendOrderStatusUpdateEmail(order: any, status: string) {
  const storeEmail = process.env.STORE_EMAIL;
  const customerEmail = order.customerEmail || order.email;
  const statusHtml = `
    <h2>Atualização de Status do Pedido</h2>
    <p>Pedido: #${order.id}</p>
    <p>Status: <strong>${status}</strong></p>
    <p>Cliente: ${order.customerName || customerEmail || "-"}</p>
    <p>Valor: R$ ${Number(order.total || 0).toFixed(2)}</p>
  `;

  if (storeEmail) {
    await sendEmailSafely("Order status update (store)", {
      to: storeEmail,
      subject: `Pedido #${order.id} - ${status}`,
      html: statusHtml,
    });
  }

  if (customerEmail) {
    await sendEmailSafely("Order status update (customer)", {
      to: customerEmail,
      subject: `Seu pedido #${order.id} - ${status}`,
      html: `
        <h2>Atualização do seu pedido</h2>
        <p>O status do seu pedido #${order.id} foi atualizado para: <strong>${status}</strong></p>
        ${statusHtml}
      `,
    });
  }
}

async function refreshOrderStatusCache() {
  try {
    const orders = await pb.collection("orders").getFullList({});
    orders.forEach((order: any) => {
      orderStatusCache.set(order.id, order.status || "");
    });
    console.log(`[server] Loaded ${orders.length} order statuses for manual update tracking.`);
  } catch (error) {
    console.error("[server] Failed to initialize order status cache:", error);
  }
}

async function checkOrderStatusUpdates() {
  try {
    const orders = await pb.collection("orders").getFullList({});
    const currentIds = new Set<string>();

    for (const order of orders) {
      const orderId = order.id;
      currentIds.add(orderId);
      const previousStatus = orderStatusCache.get(orderId) || "";
      const newStatus = order.status || "";

      if (previousStatus && newStatus && previousStatus !== newStatus) {
        console.log(`[server] Detected manual status change for order ${orderId}: ${previousStatus} -> ${newStatus}`);
        await sendOrderStatusUpdateEmail(order, newStatus);
      }

      orderStatusCache.set(orderId, newStatus);
    }

    for (const knownId of Array.from(orderStatusCache.keys())) {
      if (!currentIds.has(knownId)) {
        orderStatusCache.delete(knownId);
      }
    }
  } catch (error) {
    console.error("[server] Failed to check order status updates:", error);
  }
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Gmail SMTP: ${process.env.GMAIL_SMTP_USER ? "✓ Configured" : "✗ Not configured"}`);
  console.log(`🔗 API base: ${APP_URL}`);
  console.log(`🕒 Weekly report: ${ENABLE_WEEKLY_REPORT ? "enabled" : "disabled"}`);
  refreshOrderStatusCache().then(() => setInterval(checkOrderStatusUpdates, 15000));
});