import { X, Plus, Minus, CreditCard, QrCode, FileText, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CartItem } from "../types/shop";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem, onClose }: CartProps) {
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "PESQUE10") {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#3D2B1F]/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-[#F5F5F0] h-full shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-primary text-white rounded-bl-[2rem]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-black uppercase tracking-tighter italic">SEU CARRINHO</h2>
          </div>
          <motion.button 
            whileHover={{ rotate: 90 }}
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </motion.button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={32} className="text-primary/20" />
                </div>
                <p className="text-ink font-bold uppercase text-xs tracking-widest opacity-60">Seu carrinho está vazio.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 text-primary font-black uppercase text-xs tracking-widest hover:underline"
                >
                  Explorar Produtos
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 bg-white p-4 rounded-3xl shadow-sm border border-primary/5 group"
                  >
                    <div className="relative overflow-hidden rounded-2xl w-24 h-24 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-black text-ink leading-tight uppercase tracking-tight">{item.name}</h3>
                        <p className="text-primary font-black mt-1 text-lg">R$ {item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-primary/5 rounded-xl p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-white rounded-lg transition-colors text-primary"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-8 text-center text-sm font-black text-ink">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-white rounded-lg transition-colors text-primary"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-accent/40 hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Checkout Fields - Now inside scrollable area below items */}
                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 space-y-4 mt-8">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    Dados para Finalização
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Nome" className="bg-white border border-primary/10 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary outline-none font-bold text-ink" />
                    <input type="text" placeholder="Sobrenome" className="bg-white border border-primary/10 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary outline-none font-bold text-ink" />
                  </div>
                  <input type="email" placeholder="E-mail para confirmação" className="w-full bg-white border border-primary/10 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-primary outline-none font-bold text-ink" />
                </div>

                {/* Payment Methods - Also inside scrollable area */}
                <div className="space-y-3 pt-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Formas de Pagamento Habilitadas</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center gap-1.5 p-3 border border-primary/10 rounded-2xl bg-primary/5 group hover:bg-white hover:shadow-md transition-all">
                      <QrCode size={24} className="text-primary" />
                      <span className="text-[9px] font-black text-ink uppercase tracking-widest">PIX</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 border border-primary/10 rounded-2xl bg-primary/5 group hover:bg-white hover:shadow-md transition-all">
                      <FileText size={24} className="text-primary" />
                      <span className="text-[9px] font-black text-ink uppercase tracking-widest">Boleto</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 border border-primary/10 rounded-2xl bg-primary/5 group hover:bg-white hover:shadow-md transition-all">
                      <CreditCard size={24} className="text-primary" />
                      <span className="text-[9px] font-black text-ink uppercase tracking-widest">Cartão</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer / Summary - Sticky at bottom */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-primary/10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] space-y-6">
            {/* Coupon */}
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="CUPOM" 
                className="flex-1 bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-primary outline-none font-black uppercase tracking-widest text-ink"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button 
                onClick={handleApplyCoupon}
                className="bg-ink text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
              >
                Aplicar
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-ink font-bold text-xs uppercase tracking-widest opacity-60">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              
              <AnimatePresence>
                {discountApplied && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex justify-between text-primary font-black text-xs uppercase tracking-widest"
                  >
                    <span>Desconto (10%)</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-end pt-4 border-t border-primary/10">
                <span className="text-sm font-black text-ink uppercase tracking-widest">Total</span>
                <div className="text-right">
                  {discountApplied && (
                    <span className="block text-xs text-gray-400 line-through font-bold mb-1">R$ {subtotal.toFixed(2)}</span>
                  )}
                  <span className="text-3xl font-black text-primary tracking-tighter italic">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl text-xs mt-4"
            >
              Finalizar Compra
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
