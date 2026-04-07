import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Lock, LogOut, Mail, Phone, ShieldCheck, UserPlus } from "lucide-react";

import AdminPanel from "./admin/AdminPanel";
import type { SiteContent } from "../types/siteContent";

const ADMIN_EMAIL = "admin@pesqueshop.com";
const ADMIN_PASSWORD = "PesqueAdmin123!";
const SESSION_KEY = "pesque-shop-session";
const USERS_KEY = "pesque-shop-customers";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

interface CustomerAccount {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

interface SessionState {
  mode: "customer" | "admin";
  email: string;
}

interface AccountProps {
  content: SiteContent;
  onChangeContent: (content: SiteContent) => void;
  onResetContent: () => void;
}

export default function Account({ content, onChangeContent, onResetContent }: AccountProps) {
  const [session, setSession] = useState<SessionState | null>(null);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState<CustomerAccount>({ firstName: "", lastName: "", phone: "", email: "", password: "" });

  useEffect(() => {
    const storedUsers = window.localStorage.getItem(USERS_KEY);
    const storedSession = window.sessionStorage.getItem(SESSION_KEY);
    if (storedUsers) setCustomers(JSON.parse(storedUsers) as CustomerAccount[]);
    if (storedSession) setSession(JSON.parse(storedSession) as SessionState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(customers));
  }, [customers]);

  const currentCustomer = useMemo(() => customers.find((customer) => customer.email === session?.email), [customers, session]);

  const saveSession = (nextSession: SessionState) => {
    setSession(nextSession);
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const email = loginData.email.trim().toLowerCase();

    if (email === ADMIN_EMAIL && loginData.password === ADMIN_PASSWORD) {
      saveSession({ mode: "admin", email });
      setError("");
      return;
    }

    const existingCustomer = customers.find((customer) => customer.email.toLowerCase() === email && customer.password === loginData.password);
    if (!existingCustomer) {
      setError("Nao encontramos uma conta com esses dados.");
      return;
    }

    saveSession({ mode: "customer", email: existingCustomer.email });
    setError("");
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    const email = registerData.email.trim().toLowerCase();
    if (customers.some((customer) => customer.email.toLowerCase() === email)) {
      setError("Ja existe um cadastro com esse e-mail.");
      return;
    }

    const nextCustomer = { ...registerData, email };
    setCustomers((current) => [...current, nextCustomer]);
    saveSession({ mode: "customer", email });
    setRegisterData({ firstName: "", lastName: "", phone: "", email: "", password: "" });
    setError("");
  };

  const handleLogout = () => {
    setSession(null);
    window.sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">MINHA CONTA</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Cadastro do cliente com acesso interno oculto para administracao.</p>
        </div>

        {!session ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
              <div className="flex items-center gap-3 mb-8 text-primary">
                <Lock size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm">Entrar</h3>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <input type="email" required value={loginData.email} onChange={(event) => setLoginData((current) => ({ ...current, email: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="seu@email.com" />
                <input type="password" required value={loginData.password} onChange={(event) => setLoginData((current) => ({ ...current, password: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="Senha" />

                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase py-4 rounded-2xl shadow-lg transition-all tracking-widest text-xs transform active:scale-95">Entrar</button>

                <button type="button" disabled={!GOOGLE_CLIENT_ID} className="w-full bg-white border border-primary/10 text-primary font-black uppercase py-4 rounded-2xl shadow-sm transition-all tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed">
                  Entrar com Google
                </button>
                {!GOOGLE_CLIENT_ID && <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Configure `VITE_GOOGLE_CLIENT_ID` para ativar o login Google real.</p>}
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
              <div className="flex items-center gap-3 mb-8 text-primary">
                <UserPlus size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm">Criar conta</h3>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required value={registerData.firstName} onChange={(event) => setRegisterData((current) => ({ ...current, firstName: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="Nome" />
                  <input type="text" required value={registerData.lastName} onChange={(event) => setRegisterData((current) => ({ ...current, lastName: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="Sobrenome" />
                </div>
                <input type="tel" required value={registerData.phone} onChange={(event) => setRegisterData((current) => ({ ...current, phone: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="(00) 00000-0000" />
                <input type="email" required value={registerData.email} onChange={(event) => setRegisterData((current) => ({ ...current, email: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="seu@email.com" />
                <input type="password" required value={registerData.password} onChange={(event) => setRegisterData((current) => ({ ...current, password: event.target.value }))} className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold" placeholder="Senha" />
                <button type="submit" className="w-full bg-secondary hover:bg-ink text-white font-black uppercase py-4 rounded-2xl shadow-lg transition-all tracking-widest text-xs transform active:scale-95">Criar Conta</button>
              </form>
            </motion.div>

            {error && <div className="md:col-span-2 text-center text-accent font-black uppercase text-[10px] tracking-widest">{error}</div>}
          </div>
        ) : session.mode === "admin" ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic">Painel do Administrador</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Login oculto detectado automaticamente pelas credenciais.</p>
              </div>
              <button onClick={handleLogout} className="text-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:text-ink transition-colors"><LogOut size={18} />Sair</button>
            </div>

            <AdminPanel content={content} onChange={onChangeContent} onReset={onResetContent} />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
            <div className="flex justify-between items-center mb-10 border-b border-primary/5 pb-6">
              <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic">Seus Dados</h3>
              <button onClick={handleLogout} className="text-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:text-ink transition-colors"><LogOut size={18} />Sair</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/5">
                  <Mail className="text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E-mail</p>
                    <p className="text-lg font-black text-ink">{currentCustomer?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/5">
                  <Phone className="text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Telefone</p>
                    <p className="text-lg font-black text-ink">{currentCustomer?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-3xl border border-primary/5">
                  <ShieldCheck className="text-primary" />
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cliente</p>
                    <p className="text-lg font-black text-ink">{currentCustomer?.firstName} {currentCustomer?.lastName}</p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-3xl p-5 border border-primary/5">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Login Google</p>
                  <p className="text-sm font-bold text-ink mt-2">{GOOGLE_CLIENT_ID ? "Pronto para integrar com a chave do Google." : "Painel preparado, faltando configurar a chave do Google."}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
