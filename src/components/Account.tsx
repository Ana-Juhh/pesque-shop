import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, Lock, Save, LogOut, UserPlus } from "lucide-react";

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">MINHA CONTA</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Gerencie seus dados e acompanhe seus pedidos.</p>
        </div>

        {!isLoggedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Login Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5"
            >
              <div className="flex items-center gap-3 mb-8 text-primary">
                <Lock size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm">Já sou cliente</h3>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">E-mail</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 pl-12 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="seu@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Senha</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 pl-12 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="******" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase py-4 rounded-2xl shadow-lg transition-all tracking-widest text-xs transform active:scale-95">
                  Entrar
                </button>
                <div className="text-center">
                  <button type="button" className="text-[10px] text-secondary font-black uppercase tracking-widest hover:text-ink transition-colors">Esqueci minha senha</button>
                </div>
              </form>
            </motion.div>

            {/* Register Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5"
            >
              <div className="flex items-center gap-3 mb-8 text-primary">
                <UserPlus size={24} />
                <h3 className="font-black uppercase tracking-widest text-sm">Criar nova conta</h3>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nome</label>
                    <input 
                      type="text" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="Nome" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Sobrenome</label>
                    <input 
                      type="text" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="Sobrenome" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Telefone</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 pl-12 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="(00) 00000-0000" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">E-mail</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 pl-12 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="seu@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Senha</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-4 pl-12 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="******" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-secondary hover:bg-ink text-white font-black uppercase py-4 rounded-2xl shadow-lg transition-all tracking-widest text-xs transform active:scale-95">
                  Criar Conta
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-primary/5"
          >
            <div className="flex justify-between items-center mb-10 border-b border-primary/5 pb-6">
              <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic">Seus Dados</h3>
              <button 
                onClick={handleLogout}
                className="text-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:text-ink transition-colors"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-3xl border border-primary/5 shadow-inner">
                  <div className="bg-white p-3 rounded-2xl shadow-md">
                    <User className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nome Completo</p>
                    <p className="text-xl font-black text-ink tracking-tight">{formData.firstName} {formData.lastName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-3xl border border-primary/5 shadow-inner">
                  <div className="bg-white p-3 rounded-2xl shadow-md">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E-mail</p>
                    <p className="text-xl font-black text-ink tracking-tight">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-3xl border border-primary/5 shadow-inner">
                  <div className="bg-white p-3 rounded-2xl shadow-md">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Telefone</p>
                    <p className="text-xl font-black text-ink tracking-tight">{formData.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-primary/5 pb-4">Segurança</h4>
                <div className="flex items-center gap-6 p-6 bg-gray-50/50 rounded-3xl border border-gray-100 shadow-inner">
                  <div className="bg-white p-3 rounded-2xl shadow-md">
                    <Lock className="text-gray-300" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Senha</p>
                    <p className="text-xl font-black text-gray-300 tracking-widest">••••••••••••</p>
                  </div>
                </div>
                <button className="w-full bg-primary/5 text-primary py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary/10 transition-all flex items-center justify-center gap-3 text-xs shadow-md transform active:scale-95">
                  <Save size={20} />
                  Alterar Senha
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
