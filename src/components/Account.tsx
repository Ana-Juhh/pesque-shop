import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Lock, LogOut, Mail, Phone, ShieldCheck, UserPlus } from "lucide-react";

import AdminPanel from "./admin/AdminPanel";
import type { SiteContent } from "../types/siteContent";
import { pb } from "../lib/pocketbase";

interface AccountProps {
  content: SiteContent;
  onChangeContent: (content: SiteContent) => void;
  onResetContent: () => void;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

type SessionMode = "customer" | "admin";

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  role?: string;
}

export default function Account({
  content,
  onChangeContent,
  onResetContent,
}: AccountProps) {
  const [loading, setLoading] = useState(true);
  const [sessionMode, setSessionMode] = useState<SessionMode | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const currentUser = useMemo(() => {
    return (pb.authStore.model as unknown as AuthUser | null) ?? null;
  }, [sessionMode, loading]);

  useEffect(() => {
    const model = pb.authStore.model as unknown as AuthUser | null;

    if (pb.authStore.isValid && model) {
      setSessionMode(model.role === "admin" ? "admin" : "customer");
    } else {
      setSessionMode(null);
    }

    setLoading(false);
  }, []);

  async function refreshAuthUser() {
    try {
      if (!pb.authStore.isValid) return;

      await pb.collection("users").authRefresh();

      const model = pb.authStore.model as unknown as AuthUser | null;
      if (model) {
        setSessionMode(model.role === "admin" ? "admin" : "customer");
      }
    } catch (err) {
      console.error("Erro ao atualizar sessão:", err);
      pb.authStore.clear();
      setSessionMode(null);
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const email = loginData.email.trim().toLowerCase();

      await pb.collection("users").authWithPassword(email, loginData.password);

      const model = pb.authStore.model as unknown as AuthUser | null;

      if (!model) {
        setError("Nao foi possivel carregar os dados da conta.");
        return;
      }

      setSessionMode(model.role === "admin" ? "admin" : "customer");
      setSuccess("Login realizado com sucesso.");
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError("Nao encontramos uma conta com esses dados.");
    }
  }

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const email = registerData.email.trim().toLowerCase();
      const fullName = `${registerData.firstName} ${registerData.lastName}`.trim();

      await pb.collection("users").create({
        email,
        password: registerData.password,
        passwordConfirm: registerData.password,
        name: fullName,
        phone: registerData.phone,
        role: "customer",
      });

      await pb.collection("users").authWithPassword(email, registerData.password);

      setSessionMode("customer");
      setSuccess("Conta criada com sucesso.");

      setRegisterData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      console.error("Erro no cadastro:", err);

      const message = String(err?.response?.message || "").toLowerCase();

      if (message.includes("already exists") || message.includes("unique")) {
        setError("Ja existe um cadastro com esse e-mail.");
        return;
      }

      setError("Nao foi possivel criar a conta agora.");
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setSuccess("");

    try {
      await pb.collection("users").authWithOAuth2({ provider: "google" });

      await refreshAuthUser();

      const model = pb.authStore.model as unknown as AuthUser | null;
      if (!model) {
        setError("Nao foi possivel concluir o login com Google.");
        return;
      }

      setSuccess("Login com Google realizado com sucesso.");
    } catch (err) {
      console.error("Erro no login com Google:", err);
      setError("Nao foi possivel entrar com Google.");
    }
  }

  function handleLogout() {
    pb.authStore.clear();
    setSessionMode(null);
    setError("");
    setSuccess("");
    setLoginData({ email: "", password: "" });
  }

  if (loading) {
    return (
      <div className="py-16 bg-paper min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
            <p className="text-sm font-bold text-ink">Carregando conta...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayName =
    currentUser?.name?.trim() ||
    [registerData.firstName, registerData.lastName].filter(Boolean).join(" ") ||
    "Cliente";

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">
            MINHA CONTA
          </h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">
            Cadastro do cliente com acesso interno para administracao.
          </p>
        </div>

        {!sessionMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5"
            >
              <div className="flex items-center gap-3 mb-8 text-primary">
                <Lock size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm">
                  Entrar
                </h3>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(event) =>
                    setLoginData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                  placeholder="seu@email.com"
                />

                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(event) =>
                    setLoginData((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                  placeholder="Senha"
                />

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase py-4 rounded-2xl shadow-lg transition-all tracking-widest text-xs transform active:scale-95"
                >
                  Entrar
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full border border-primary/10 bg-white hover:bg-primary/5 text-primary font-black uppercase py-4 rounded-2xl shadow-sm transition-all tracking-widest text-xs"
                >
                  Entrar com Google
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5"
            >
              <div className="flex items-center gap-3 mb-8 text-primary">
                <UserPlus size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm">
                  Criar conta
                </h3>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={registerData.firstName}
                    onChange={(event) =>
                      setRegisterData((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }))
                    }
                    className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                    placeholder="Nome"
                  />

                  <input
                    type="text"
                    required
                    value={registerData.lastName}
                    onChange={(event) =>
                      setRegisterData((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }))
                    }
                    className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                    placeholder="Sobrenome"
                  />
                </div>

                <input
                  type="tel"
                  required
                  value={registerData.phone}
                  onChange={(event) =>
                    setRegisterData((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                  placeholder="(00) 00000-0000"
                />

                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(event) =>
                    setRegisterData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                  placeholder="seu@email.com"
                />

                <input
                  type="password"
                  required
                  minLength={8}
                  value={registerData.password}
                  onChange={(event) =>
                    setRegisterData((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                  placeholder="Senha"
                />

                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-ink text-white font-black uppercase py-4 rounded-2xl shadow-lg transition-all tracking-widest text-xs transform active:scale-95"
                >
                  Criar Conta
                </button>
              </form>
            </motion.div>

            {(error || success) && (
              <div className="md:col-span-2 text-center">
                {error ? (
                  <p className="text-accent font-black uppercase text-[10px] tracking-widest">
                    {error}
                  </p>
                ) : null}
                {success ? (
                  <p className="text-primary font-black uppercase text-[10px] tracking-widest">
                    {success}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        ) : sessionMode === "admin" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic">
                  Painel do Administrador
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">
                  Conta administrativa reconhecida pelo campo role.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="text-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:text-ink transition-colors"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>

            <AdminPanel
              content={content}
              onChange={onChangeContent}
              onReset={onResetContent}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5"
          >
            <div className="flex justify-between items-center mb-10 border-b border-primary/5 pb-6">
              <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic">
                Seus Dados
              </h3>

              <button
                onClick={handleLogout}
                className="text-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:text-ink transition-colors"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/5">
                  <Mail className="text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      E-mail
                    </p>
                    <p className="text-lg font-black text-ink">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/5">
                  <Phone className="text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Telefone
                    </p>
                    <p className="text-lg font-black text-ink">
                      {currentUser?.phone || "Nao informado"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/5">
                  <ShieldCheck className="text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Cliente
                    </p>
                    <p className="text-lg font-black text-ink">
                      {currentUser?.name || displayName}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-3xl p-5 border border-primary/5">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Status da Conta
                  </p>
                  <p className="text-sm font-bold text-ink mt-2">
                    Conta conectada ao PocketBase.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}