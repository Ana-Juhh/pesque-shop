import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Package, Truck, Home, Search, Mail, ArrowRight } from "lucide-react";

export default function OrderStatus() {
  const [orderId, setOrderId] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const steps = [
    { id: 1, label: "Pedido Confirmado", icon: CheckCircle2, status: "completed", date: "28/03/2026" },
    { id: 2, label: "Pedido em Andamento", icon: Package, status: "completed", date: "29/03/2026" },
    { id: 3, label: "Pedido Despachado", icon: Truck, status: "current", date: "Em trânsito" },
    { id: 4, label: "Pedido Entregue", icon: Home, status: "upcoming", date: "Aguardando" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) setShowStatus(true);
  };

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">STATUS DO PEDIDO</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Acompanhe cada etapa da sua jornada de pesca.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-primary/5 mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest ml-2">Número do Pedido</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ex: #12345" 
                  className="w-full border border-primary/5 bg-primary/5 p-5 pl-14 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-black text-ink uppercase tracking-widest"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={24} />
              </div>
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3"
              >
                Consultar
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>

        {showStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl border border-primary/5 overflow-hidden relative"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-0" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-primary/5 pb-10 relative z-10">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pedido Identificado</p>
                <h3 className="text-3xl font-black text-primary tracking-tighter italic">{orderId}</h3>
              </div>
              <div className="mt-6 md:mt-0 md:text-right bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 opacity-60">Previsão de Entrega</p>
                <h3 className="text-xl font-black text-secondary italic tracking-tight">05/04/2026</h3>
              </div>
            </div>

            <div className="relative z-10">
              {/* Progress Line */}
              <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-primary/5 -translate-x-1/2" />
              
              <div className="space-y-16">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-8 md:gap-12 group"
                  >
                    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center z-10 shadow-xl transition-all transform group-hover:scale-110 border-4 ${
                      step.status === "completed" ? "bg-primary text-white border-white" : 
                      step.status === "current" ? "bg-secondary text-white border-white animate-pulse" : 
                      "bg-white text-gray-200 border-primary/5"
                    }`}>
                      <step.icon size={step.status === "current" ? 40 : 32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className={`text-lg font-black uppercase tracking-tight ${
                          step.status === "completed" ? "text-primary" : 
                          step.status === "current" ? "text-secondary" : 
                          "text-gray-300"
                        }`}>
                          {step.label}
                        </h4>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          step.status === "completed" ? "bg-primary/5 text-primary" : 
                          step.status === "current" ? "bg-secondary/5 text-secondary" : 
                          "bg-gray-50 text-gray-300"
                        }`}>
                          {step.date}
                        </span>
                      </div>
                      <p className={`text-xs font-bold mt-1 uppercase tracking-widest opacity-60 ${
                        step.status === "completed" ? "text-ink" : 
                        step.status === "current" ? "text-secondary" : 
                        "text-gray-300"
                      }`}>
                        {step.status === "completed" ? "Etapa concluída com sucesso" : 
                         step.status === "current" ? "Seu pedido está a caminho" : 
                         "Aguardando processamento"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-primary/5 flex flex-col items-center gap-6 text-center relative z-10">
              <div className="bg-paper p-8 rounded-[2rem] border border-primary/5 flex flex-col md:flex-row items-center gap-6 max-w-2xl">
                <div className="bg-white p-4 rounded-2xl shadow-md">
                  <Mail size={32} className="text-primary" />
                </div>
                <div className="text-left">
                  <h5 className="text-sm font-black text-primary uppercase tracking-widest mb-2">Notificações por E-mail</h5>
                  <p className="text-xs font-bold text-ink opacity-60 leading-relaxed uppercase tracking-tight">
                    Fique tranquilo! Enviamos atualizações automáticas para o seu e-mail cadastrado a cada mudança no status do seu pedido.
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
