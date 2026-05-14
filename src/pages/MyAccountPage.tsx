import { useEffect, useState } from "react";
import { LogOut, Package, Settings, User } from "lucide-react";
import { pb } from "../lib/pocketbase";

type MyAccountPageProps = {
  onLoginClick: () => void;
  onLogoutSuccess: () => void;
  onAdminClick?: () => void;
};

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  user?: string;
  customerName?: string;
  customerEmail?: string;
  paymentMethod?: string;
  status?: string;
  total?: number;
  items?: OrderItem[];
  created?: string;
  updated?: string;
};

const ORDER_STATUS_OPTIONS = [
  { value: "aguardando_pagamento", label: "Aguardando pagamento" },
  { value: "pago", label: "Pago" },
  { value: "em_separacao", label: "Em separação" },
  { value: "enviado", label: "Enviado" },
  { value: "entregue", label: "Entregue" },
  { value: "cancelado", label: "Cancelado" },
];

const ADMIN_EMAILS = ["ju.12ferre@gmail.com"];

function formatStatus(status?: string) {
  const found = ORDER_STATUS_OPTIONS.find((option) => option.value === status);
  return found?.label || status || "Aguardando pagamento";
}

function formatDate(value?: string) {
  if (!value) return "";

  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function MyAccountPage({
  onLoginClick,
  onLogoutSuccess,
  onAdminClick,
}: MyAccountPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  const [user, setUser] = useState<any>(() => pb.authStore.record);

  const isLoggedIn = Boolean(pb.authStore.isValid && user);
  const isAdmin = Boolean(
    user?.role === "admin" || ADMIN_EMAILS.includes(user?.email)
  );

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record);
      setOrders([]);
    }, true);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user?.id, isAdmin]);

  function formatPrice(value = 0) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleLogout() {
    pb.authStore.clear();
    setUser(null);
    setOrders([]);
    onLogoutSuccess();
  }

  async function loadOrders() {
    if (!isLoggedIn || !user?.id) return;

    try {
      setLoadingOrders(true);

      const filter = isAdmin ? "" : `user = "${user.id}"`;

      const result = (await pb.collection("orders").getFullList({
        sort: "-created",
        filter,
      })) as unknown as Order[];

      setOrders(result);
    } catch (error) {
      console.error(error);
      alert(
        "Não consegui carregar os pedidos. Confira as regras da collection orders no PocketBase."
      );
    } finally {
      setLoadingOrders(false);
    }
  }

  async function updateOrderStatus(orderId: string, status: string) {
    try {
      setUpdatingOrderId(orderId);

      const updatedOrder = (await pb.collection("orders").update(orderId, {
        status,
      })) as unknown as Order;

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: updatedOrder.status,
                updated: updatedOrder.updated,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      alert(
        "Não consegui atualizar o status. Confira se o admin tem permissão de update na collection orders."
      );
    } finally {
      setUpdatingOrderId("");
    }
  }

  if (!isLoggedIn) {
    return (
      <section className="min-h-[70vh] bg-paper px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-primary/10 shadow-xl p-8 md:p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User size={30} />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.35em] text-secondary">
            Minha Conta
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-black uppercase text-primary">
            Entre para continuar
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-ink/70 font-medium">
            Faça login ou crie sua conta para acompanhar pedidos, finalizar
            compras e acessar seus dados.
          </p>

          <button
            type="button"
            onClick={onLoginClick}
            className="mt-8 rounded-full bg-primary px-8 py-4 text-white font-black hover:bg-primary/90"
          >
            Entrar ou criar conta
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-paper px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-[2rem] border border-primary/10 shadow-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-secondary">
              {isAdmin ? "Conta Administrativa" : "Minha Conta"}
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-black uppercase text-primary">
              Olá, {user?.name || user?.email || "cliente"}
            </h1>

            {user?.email && (
              <p className="mt-2 text-ink/60 font-medium">{user.email}</p>
            )}

            {isAdmin && (
              <p className="mt-3 inline-flex rounded-full bg-green-50 border border-green-200 px-4 py-2 text-xs font-black text-green-800 uppercase tracking-wider">
                Admin logado
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {isAdmin && onAdminClick && (
              <button
                type="button"
                onClick={onAdminClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-white font-black hover:bg-primary/90"
              >
                <Settings size={18} />
                Painel Admin
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-6 py-4 text-red-700 font-black hover:bg-red-100"
            >
              <LogOut size={18} />
              Sair da conta
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-primary/10 shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Package size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-primary">
                  {isAdmin ? "Pedidos da loja" : "Meus pedidos"}
                </h2>

                <p className="text-sm text-ink/60 font-medium">
                  {isAdmin
                    ? "Você está vendo todos os pedidos realizados no site."
                    : "Acompanhe os pedidos feitos nesta conta."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadOrders}
              className="rounded-full bg-primary/5 px-5 py-3 text-sm font-black text-primary hover:bg-primary/10"
            >
              Atualizar lista
            </button>
          </div>

          {loadingOrders ? (
            <p className="font-bold text-ink/60">Carregando pedidos...</p>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/20 p-8 text-center">
              <p className="font-black text-primary">
                Nenhum pedido encontrado.
              </p>

              <p className="mt-2 text-sm text-ink/60">
                Quando uma compra for finalizada, ela aparecerá aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-primary/10 p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">
                        Pedido
                      </p>

                      <h3 className="mt-1 font-black text-primary break-all">
                        #{order.id}
                      </h3>

                      <p className="mt-2 text-sm text-ink/60">
                        Status:{" "}
                        <span className="font-black text-primary">
                          {formatStatus(order.status)}
                        </span>
                      </p>

                      <p className="text-sm text-ink/60">
                        Pagamento:{" "}
                        <span className="font-black text-primary">
                          {order.paymentMethod === "pix"
                            ? "Pix"
                            : "Link de pagamento"}
                        </span>
                      </p>

                      {isAdmin && (
                        <>
                          <p className="text-sm text-ink/60 mt-2">
                            Cliente:{" "}
                            <span className="font-black text-primary">
                              {order.customerName || "Cliente"}
                            </span>
                          </p>

                          <p className="text-sm text-ink/60">
                            E-mail:{" "}
                            <span className="font-black text-primary">
                              {order.customerEmail || "Não informado"}
                            </span>
                          </p>
                        </>
                      )}

                      {order.created && (
                        <p className="text-xs text-ink/40 mt-2">
                          Criado em {formatDate(order.created)}
                        </p>
                      )}
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm text-ink/60">Total</p>

                      <p className="text-2xl font-black text-primary">
                        {formatPrice(order.total)}
                      </p>

                      {isAdmin && (
                        <div className="mt-4">
                          <label className="block text-xs font-black uppercase tracking-widest text-ink/50 mb-2">
                            Alterar status
                          </label>

                          <select
                            value={order.status || "aguardando_pagamento"}
                            disabled={updatingOrderId === order.id}
                            onChange={(event) =>
                              updateOrderStatus(order.id, event.target.value)
                            }
                            className="w-full md:w-64 rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm font-bold text-primary outline-none focus:border-primary disabled:opacity-60"
                          >
                            {ORDER_STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>

                          {updatingOrderId === order.id && (
                            <p className="mt-2 text-xs font-bold text-ink/50">
                              Salvando...
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="mt-5 border-t border-primary/10 pt-4 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={`${order.id}-${item.id}`}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="font-bold text-ink/70">
                            {item.quantity}x {item.name}
                          </span>

                          <span className="font-black text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}