/**
 * Email Service using Gmail SMTP.
 */

import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  fromEmail?: string;
  fromName?: string;
  replyTo?: string;
}

function buildSmtpTransporter() {
  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_PASS;
  const host = process.env.GMAIL_SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.GMAIL_SMTP_PORT || "465");
  const secure = process.env.GMAIL_SMTP_SECURE !== "false";

  if (!user || !pass) {
    console.error("GMAIL_SMTP_USER or GMAIL_SMTP_PASS not configured");
    throw new Error("Email service not configured");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendEmail({
  to,
  subject,
  html,
  fromEmail = process.env.GMAIL_SMTP_USER || "noreply@pesqueshop.com",
  fromName = process.env.EMAIL_FROM_NAME || "Pesque Shop",
  replyTo = process.env.STORE_EMAIL || "admin@pesqueshop.com",
}: EmailPayload): Promise<void> {
  const transporter = buildSmtpTransporter();

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    replyTo,
    subject,
    html,
  });
}

export async function sendEmailSafely(
  context: string,
  payload: {
    to: string;
    subject: string;
    html: string;
  },
) {
  try {
    await sendEmail(payload);
    return { sent: true };
  } catch (error) {
    console.error(`[email] ${context} failed:`, error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getOrderConfirmationEmail(order: {
  id: string;
  customerName: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  paymentMethod: string;
}): string {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(
          item.price * item.quantity
        )}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #005935; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
        .order-info { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #005935; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f0f0f0; padding: 10px; text-align: left; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Pesque Shop</h1>
          <p>Confirmação de Pedido</p>
        </div>

        <div class="content">
          <p>Olá ${order.customerName},</p>
          <p>Seu pedido foi registrado com sucesso. Veja abaixo os detalhes:</p>

          <div class="order-info">
            <strong>Número do Pedido:</strong> #${order.id}<br>
            <strong>Data:</strong> ${new Date().toLocaleDateString("pt-BR")}<br>
            <strong>Forma de Pagamento:</strong> ${
              order.paymentMethod === "pix" ? "Pix" : "Link de Pagamento"
            }
          </div>

          <h3>Produtos:</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="order-info" style="background: #f0f8f5; border-color: #00a65a;">
            <strong style="font-size: 18px; color: #00a65a;">Total: ${formatCurrency(order.total)}</strong>
          </div>

          <p>Em breve, você receberá as informações de pagamento e o pedido será processado.</p>
          <p>Qualquer dúvida, responda este e-mail ou fale conosco via WhatsApp.</p>

          <div class="footer">
            <p>© 2024 Pesque Shop. Todos os direitos reservados.</p>
            <p>Este é um e-mail automático.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getOrderNotificationEmail(order: {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  paymentMethod: string;
}): string {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(
          item.price * item.quantity
        )}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #005935; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
        .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #ff6b00; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f0f0f0; padding: 10px; text-align: left; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Novo Pedido Recebido</h1>
        </div>

        <div class="content">
          <h2>⚠️ Pedido pronto para processamento</h2>

          <div class="info-box">
            <strong>ID do Pedido:</strong> #${order.id}<br>
            <strong>Cliente:</strong> ${order.customerName}<br>
            <strong>Email:</strong> ${order.customerEmail}<br>
            <strong>Valor:</strong> ${formatCurrency(order.total)}<br>
            <strong>Pagamento:</strong> ${
              order.paymentMethod === "pix" ? "Pix" : "Link de Pagamento"
            }
          </div>

          <h3>Produtos:</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <p>Confirme o pagamento e organize a entrega assim que receber o comprovante.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getWeeklyReportEmail(data: {
  weekStart: string;
  weekEnd: string;
  totalOrders: number;
  totalRevenue: number;
  ordersStatus: Record<string, number>;
  topProducts: Array<{ name: string; quantity: number; revenue: number }>;
}): string {
  const productRows = data.topProducts
    .map(
      (product) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${product.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${product.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(product.revenue)}</td>
      </tr>
    `,
    )
    .join("");

  const statusRows = Object.entries(data.ordersStatus)
    .map(
      ([status, count]) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${status}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${count}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #005935; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
        .metric { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #ff6b00; text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; color: #005935; }
        .metric-label { font-size: 12px; color: #666; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f0f0f0; padding: 10px; text-align: left; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Relatório Semanal</h1>
          <p>${data.weekStart} a ${data.weekEnd}</p>
        </div>

        <div class="content">
          <h2>📊 Resumo da Semana</h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="metric">
              <div class="metric-value">${data.totalOrders}</div>
              <div class="metric-label">Total de Pedidos</div>
            </div>
            <div class="metric">
              <div class="metric-value">${formatCurrency(data.totalRevenue)}</div>
              <div class="metric-label">Receita Total</div>
            </div>
          </div>

          <h3>Status dos Pedidos</h3>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              ${statusRows}
            </tbody>
          </table>

          <h3>Top 5 Produtos</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Receita</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>

          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #666;">
            Relatório automático semanal enviado pela Pesque Shop.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
