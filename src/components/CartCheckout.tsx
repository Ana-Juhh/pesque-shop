import { useMemo, useState } from "react";
import type { useCart } from "../hooks/useCart";
import { pb } from "../lib/pocketbase";

type CartCheckoutProps = {
  cart: ReturnType<typeof useCart>;
};

type AuthMode = "login" | "register";
type PaymentMode = "pix" | "link";

const PIX_KEY = import.meta.env.VITE_PIX_KEY || "a80faa12-2957-4fed-bd00-86b4574a62d5";
const STORE_WHATSAPP = import.meta.env.VITE_STORE_WHATSAPP || "5511999999999";
const PAYMENT_LINK = import.meta.env.VITE_PAYMENT_LINK || "https://link.mercadopago.com.br/pesqueshop";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function getCurrentUser() {
  const authStore = pb.authStore as typeof pb.authStore & {
    model?: any;
    record?: any;
  };

  return authStore.record ?? authStore.model ?? null;
}

export function CartCheckout({ cart }: CartCheckoutProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("register");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("pix");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<any>(() => getCurrentUser());
  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentLinkUrl, setPaymentLinkUrl] = useState("");

  const total = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart.items]);

  if (!cart.isOpen) {
    return null;
  }

  const isLoggedIn = Boolean(pb.authStore.isValid && user);

  function formatPrice(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function resetMessages() {
    setAuthMessage("");
    setAuthError("");
    setOrderError("");
    setSuccessMessage("");
  }

  function resetOrderResult() {
    setOrderCreated(false);
    setOrderId("");
    setPaymentLinkUrl("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();

    if (!email.trim() || !password.trim()) {
      setAuthError("Preencha e-mail e senha para continuar.");
      return;
    }

    if (authMode === "register" && !name.trim()) {
      setAuthError("Preencha seu nome para criar a conta.");
      return;
    }

    try {
      setLoadingAuth(true);

      if (authMode === "register") {
        await pb.collection("users").create({
          name,
          email,
          password,
          passwordConfirm: password,
        });

        await pb.collection("users").authWithPassword(email, password);

        setUser(getCurrentUser());
        setAuthMessage("Conta criada com sucesso.");
        return;
      }

      await pb.collection("users").authWithPassword(email, password);

      setUser(getCurrentUser());
      setAuthMessage("Login realizado com sucesso.");
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.message ||
        "Não foi possível continuar. Confira os dados e tente novamente.";

      setAuthError(message);
    } finally {
      setLoadingAuth(false);
    }
  }

  function handleGoogleLogin() {
    resetMessages();
    setLoadingAuth(true);

    pb.collection("users")
      .authWithOAuth2({ provider: "google" })
      .then(() => {
        setUser(getCurrentUser());
        setAuthMessage("Login com Google realizado com sucesso.");
      })
      .catch((error) => {
        console.error(error);

        setAuthError(
          "Não foi possível entrar com Google. Confira se o OAuth2 está configurado no PocketBase."
        );
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  }

  function handleLogout() {
    pb.authStore.clear();
    setUser(null);
    setAuthMessage("Você saiu da conta.");
    setAuthError("");
    resetOrderResult();
  }

  async function handleFinishOrder() {
    resetMessages();

    if (cart.items.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    if (!isLoggedIn) {
      setAuthError("Crie sua conta ou faça login antes de finalizar o pedido.");
      return;
    }

    try {
      setLoadingOrder(true);
      setPaymentLinkUrl("");
      setSuccessMessage("");

      const currentUser = getCurrentUser();

      const order = await pb.collection("orders").create({
        user: currentUser?.id,
        customerName:
          currentUser?.name || name || currentUser?.email || "Cliente",
        customerEmail: currentUser?.email || email || "",
        paymentMethod: paymentMode,
        status: "aguardando_pagamento",
        total,
        items: cart.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      });

      const response = await fetch(`${API_BASE_URL}/api/orders/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          customerName:
            currentUser?.name || name || currentUser?.email || "Cliente",
          customerEmail: currentUser?.email || email || "",
          total,
          items: cart.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          paymentMethod: paymentMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Não foi possível processar o pedido no servidor."
        );
      }

      const result = await response.json();
      setOrderId(order.id);
      setOrderCreated(true);
      setSuccessMessage("Pedido registrado e emails enviados com sucesso.");

      if (result.paymentLink) {
        setPaymentLinkUrl(result.paymentLink);
      }
    } catch (error: any) {
      console.error(error);
      setOrderError(
        error?.message ||
          "Não consegui salvar o pedido. Tente novamente em alguns instantes."
      );
    } finally {
      setLoadingOrder(false);
    }
  }

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      alert("Chave Pix copiada!");
    } catch (error) {
      console.error(error);
      alert("Não consegui copiar automaticamente. Copie a chave Pix manualmente.");
    }
  }

  function openPaymentLink() {
    const url = paymentLinkUrl || PAYMENT_LINK;
    window.open(url, "_blank");
  }

  function sendReceiptWhatsApp() {
    const productsText = cart.items
      .map(
        (item) =>
          `- ${item.name} | Qtd: ${item.quantity} | ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message = `Olá! Finalizei meu pedido na Pesque Shop.

Pedido: ${orderId || "aguardando confirmação"}
Pagamento: ${paymentMode === "pix" ? "Pix" : "Link de pagamento"}
Total: ${formatPrice(total)}

Produtos:
${productsText}

Vou enviar o comprovante por aqui.`;

    const url = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f7f8f2] overflow-y-auto">
      <header className="sticky top-0 z-10 bg-green-900 text-white px-5 md:px-10 py-5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-100">
              Finalização
            </p>

            <h1 className="text-2xl md:text-3xl font-black uppercase">
              Seu Carrinho
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={cart.close}
              className="hidden sm:inline-flex rounded-full bg-white text-green-900 px-5 py-3 text-sm font-black hover:bg-green-100 transition"
            >
              Continuar comprando
            </button>

            <button
              type="button"
              onClick={cart.close}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-3xl leading-none flex items-center justify-center"
              aria-label="Fechar carrinho"
            >
              ×
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <section className="bg-white rounded-3xl shadow-sm border border-black/5 p-5 md:p-7">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black text-green-950">
                Produtos no carrinho
              </h2>

              <p className="text-sm text-gray-500">
                {cart.count} item(ns) selecionado(s)
              </p>
            </div>

            <span className="bg-green-50 text-green-900 px-4 py-2 rounded-full font-black">
              {formatPrice(total)}
            </span>
          </div>

          {cart.items.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <p className="font-bold text-gray-700">
                Seu carrinho está vazio.
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Adicione algum produto para finalizar a compra.
              </p>

              <button
                type="button"
                onClick={cart.close}
                className="mt-6 rounded-full bg-green-900 px-6 py-3 text-sm font-black text-white hover:bg-green-800 transition"
              >
                Ver produtos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-100 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-36 h-32 object-cover rounded-xl bg-gray-100"
                  />

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-black text-green-950 uppercase">
                        {item.name}
                      </h3>

                      <p className="text-green-800 text-xl font-black mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 bg-green-50 rounded-xl px-3 py-2">
                        <button
                          type="button"
                          onClick={() => {
                            cart.updateQuantity(item.id, -1);
                            resetOrderResult();
                          }}
                          className="w-8 h-8 rounded-lg font-black text-green-900 hover:bg-green-100"
                        >
                          −
                        </button>

                        <span className="min-w-6 text-center font-black">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            cart.updateQuantity(item.id, 1);
                            resetOrderResult();
                          }}
                          className="w-8 h-8 rounded-lg font-black text-green-900 hover:bg-green-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          cart.removeItem(item.id);
                          resetOrderResult();
                        }}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="bg-white rounded-3xl shadow-sm border border-black/5 p-5 md:p-7">
            <h2 className="text-2xl font-black text-green-950">
              Entre para continuar
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-5">
              Crie sua conta ou faça login para finalizar o pedido.
            </p>

            {isLoggedIn ? (
              <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm text-gray-600">Cliente conectado:</p>

                <p className="font-black text-green-950 mt-1">
                  {user?.name || user?.email || "Usuário"}
                </p>

                {user?.email && (
                  <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-black text-green-900 border border-green-200 hover:bg-green-100"
                >
                  Sair da conta
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      resetMessages();
                    }}
                    className={`rounded-xl py-3 font-black ${
                      authMode === "register"
                        ? "bg-green-900 text-white"
                        : "bg-green-50 text-green-900"
                    }`}
                  >
                    Criar conta
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      resetMessages();
                    }}
                    className={`rounded-xl py-3 font-black ${
                      authMode === "login"
                        ? "bg-green-900 text-white"
                        : "bg-green-50 text-green-900"
                    }`}
                  >
                    Entrar
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {authMode === "register" && (
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-800"
                    />
                  )}

                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-800"
                  />

                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-800"
                  />

                  <button
                    type="submit"
                    disabled={loadingAuth}
                    className="w-full rounded-xl bg-green-900 text-white py-4 font-black hover:bg-green-800 disabled:opacity-60"
                  >
                    {loadingAuth
                      ? "Aguarde..."
                      : authMode === "register"
                        ? "Criar conta"
                        : "Entrar"}
                  </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    ou
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loadingAuth}
                  className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-5 py-3 text-[15px] font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-60"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.5 24.5c0-1.57-.14-3.08-.4-4.5H24v9.02h12.65c-.55 2.96-2.2 5.47-4.7 7.15l7.27 5.64C43.47 37.89 46.5 31.68 46.5 24.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.27-5.64c-2.02 1.36-4.6 2.16-8.63 2.16-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>

                  {loadingAuth ? "Entrando..." : "Sign in with Google"}
                </button>
              </>
            )}

            {authMessage && (
              <p className="mt-4 rounded-xl bg-green-50 text-green-800 px-4 py-3 text-sm font-bold">
                {authMessage}
              </p>
            )}

            {authError && (
              <p className="mt-4 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-bold">
                {authError}
              </p>
            )}

            {orderError && (
              <p className="mt-4 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-bold">
                {orderError}
              </p>
            )}

            {successMessage && (
              <p className="mt-4 rounded-xl bg-green-50 text-green-800 px-4 py-3 text-sm font-bold">
                {successMessage}
              </p>
            )}
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-black/5 p-5 md:p-7">
            <h2 className="text-2xl font-black text-green-950">Pagamento</h2>

            <p className="text-sm text-gray-500 mt-1 mb-5">
              Escolha como o cliente vai pagar.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setPaymentMode("pix");
                  resetOrderResult();
                }}
                className={`w-full rounded-xl py-4 font-black ${
                  paymentMode === "pix"
                    ? "bg-green-900 text-white"
                    : "bg-green-50 text-green-900"
                }`}
              >
                Pix
              </button>

              <button
                type="button"
                onClick={() => {
                  setPaymentMode("link");
                  resetOrderResult();
                }}
                className={`w-full rounded-xl py-4 font-black ${
                  paymentMode === "link"
                    ? "bg-green-900 text-white"
                    : "bg-green-50 text-green-900"
                }`}
              >
                Link de pagamento
              </button>
            </div>

            <div className="border-t border-gray-100 mt-6 pt-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-600">Total</span>

                <span className="text-2xl font-black text-green-900">
                  {formatPrice(total)}
                </span>
              </div>

              {orderCreated ? (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                    <p className="text-sm font-bold text-green-800">
                      Pedido criado com sucesso!
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Número do pedido:
                    </p>

                    <p className="font-black text-green-950 break-all">
                      {orderId}
                    </p>
                  </div>

                  {paymentMode === "pix" ? (
                    <div className="rounded-2xl border border-gray-100 p-4 bg-white">
                      <h3 className="font-black text-green-950">
                        Pagamento via Pix
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Copie a chave Pix abaixo, realize o pagamento e envie o
                        comprovante.
                      </p>

                      <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                        <p className="text-xs font-bold text-gray-500 uppercase">
                          Chave Pix
                        </p>

                        <p className="font-black text-green-950 break-all">
                          {PIX_KEY}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={copyPixKey}
                        className="mt-4 w-full rounded-xl bg-green-900 text-white py-4 font-black hover:bg-green-800"
                      >
                        Copiar chave Pix
                      </button>

                      <button
                        type="button"
                        onClick={sendReceiptWhatsApp}
                        className="mt-3 w-full rounded-xl bg-green-50 text-green-900 py-4 font-black hover:bg-green-100"
                      >
                        Enviar comprovante pelo WhatsApp
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-gray-100 p-4 bg-white">
                      <h3 className="font-black text-green-950">
                        Link de pagamento
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Clique no botão abaixo para abrir o link de pagamento.
                      </p>

                      <button
                        type="button"
                        onClick={openPaymentLink}
                        className="mt-4 w-full rounded-xl bg-green-900 text-white py-4 font-black hover:bg-green-800"
                      >
                        Abrir link de pagamento
                      </button>

                      <button
                        type="button"
                        onClick={sendReceiptWhatsApp}
                        className="mt-3 w-full rounded-xl bg-green-50 text-green-900 py-4 font-black hover:bg-green-100"
                      >
                        Falar com a loja pelo WhatsApp
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={cart.close}
                    className="w-full rounded-xl bg-gray-100 text-gray-700 py-4 font-black hover:bg-gray-200"
                  >
                    Voltar para a loja
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleFinishOrder}
                    className="w-full rounded-xl bg-green-900 text-white py-4 font-black hover:bg-green-800 disabled:opacity-50"
                    disabled={cart.items.length === 0 || loadingOrder}
                  >
                    {loadingOrder
                      ? "Finalizando..."
                      : paymentMode === "pix"
                        ? "Gerar pedido com Pix"
                        : "Gerar link de pagamento"}
                  </button>

                  <button
                    type="button"
                    onClick={cart.close}
                    className="w-full rounded-xl bg-green-50 text-green-900 py-4 font-black hover:bg-green-100"
                  >
                    Continuar comprando
                  </button>
                </div>
              )}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
