import { useState } from "react";
import { CreditCard, Smartphone, Landmark, ShieldCheck, User, Mail, Lock, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RegistrationForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFinalize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="py-32 bg-paper min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl border border-primary/5 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
          <h2 className="text-3xl font-black text-primary uppercase tracking-tighter italic mb-4">PEDIDO CONFIRMADO!</h2>
          <p className="text-ink font-bold uppercase text-xs tracking-widest opacity-60 leading-relaxed mb-8">
            Obrigado por escolher a Pesque Shop. Você receberá um e-mail com todos os detalhes do seu pedido em instantes.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl text-xs"
          >
            Voltar para a Loja
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">CHECKOUT SEGURO</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Complete seus dados para finalizar a compra com segurança.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Registration Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/5"
          >
            <div className="flex items-center gap-4 mb-10 text-primary">
              <div className="bg-primary/5 p-3 rounded-2xl">
                <User size={24} />
              </div>
              <h3 className="font-black uppercase tracking-widest text-sm italic">Dados de Entrega</h3>
            </div>
            
            <form className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Nome Completo</label>
                <div className="relative">
                  <input type="text" className="w-full border border-primary/5 bg-primary/5 p-5 pl-14 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="Seu nome" />
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">E-mail</label>
                <div className="relative">
                  <input type="email" className="w-full border border-primary/5 bg-primary/5 p-5 pl-14 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="seu@email.com" />
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">CPF</label>
                  <input type="text" className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Telefone</label>
                  <input type="tel" className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Endereço Completo</label>
                <div className="relative">
                  <input type="text" className="w-full border border-primary/5 bg-primary/5 p-5 pl-14 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="Rua, número, bairro, cidade" />
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                </div>
              </div>
            </form>
          </motion.div>

          {/* Payment Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/5"
          >
            <div className="flex items-center gap-4 mb-10 text-primary">
              <div className="bg-primary/5 p-3 rounded-2xl">
                <CreditCard size={24} />
              </div>
              <h3 className="font-black uppercase tracking-widest text-sm italic">Pagamento</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <button 
                onClick={() => setPaymentMethod("credit_card")}
                className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all ${paymentMethod === "credit_card" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-300 hover:bg-gray-50"}`}
              >
                <CreditCard size={32} />
                <span className="text-[9px] font-black mt-3 uppercase tracking-widest">Cartão</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("pix")}
                className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all ${paymentMethod === "pix" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-300 hover:bg-gray-50"}`}
              >
                <Smartphone size={32} />
                <span className="text-[9px] font-black mt-3 uppercase tracking-widest">PIX</span>
              </button>
              <button 
                onClick={() => setPaymentMethod("boleto")}
                className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all ${paymentMethod === "boleto" ? "border-primary bg-primary/5 text-primary" : "border-gray-50 text-gray-300 hover:bg-gray-50"}`}
              >
                <Landmark size={32} />
                <span className="text-[9px] font-black mt-3 uppercase tracking-widest">Boleto</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === "credit_card" && (
                <motion.div 
                  key="cc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Número do Cartão</label>
                    <input type="text" className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Validade</label>
                      <input type="text" className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">CVV</label>
                      <input type="text" className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Parcelamento</label>
                    <select className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none bg-white transition-all font-bold text-ink">
                      <option>1x de R$ 369,70 sem juros</option>
                      <option>2x de R$ 184,85 sem juros</option>
                      <option>3x de R$ 123,23 sem juros</option>
                      <option>10x de R$ 36,97 sem juros</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {paymentMethod === "pix" && (
                <motion.div 
                  key="pix"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-6"
                >
                  <div className="bg-primary/5 p-8 inline-block rounded-[2rem] mb-6 shadow-inner border border-primary/10">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PescaManiaPix" alt="QR Code PIX" className="w-40 h-40" />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed px-8">Escaneie o código acima para pagar via PIX. O processamento é instantâneo e seguro.</p>
                </motion.div>
              )}

              {paymentMethod === "boleto" && (
                <motion.div 
                  key="boleto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Landmark size={48} className="text-primary/40" />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed px-8">O boleto será gerado após a confirmação. O prazo de compensação é de até 3 dias úteis.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-10 border-t border-primary/5">
              <div className="flex justify-between items-end mb-8">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total a pagar:</span>
                <span className="text-4xl font-black text-primary tracking-tighter italic">R$ 369,70</span>
              </div>
              
              <button 
                onClick={handleFinalize}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase py-6 rounded-[2rem] shadow-2xl transition-all flex items-center justify-center gap-4 tracking-widest text-xs transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={24} />
                    FINALIZAR COMPRA AGORA
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-4 mt-8 opacity-30">
                <ShieldCheck size={16} className="text-primary" />
                <p className="text-[9px] font-black uppercase tracking-widest">Ambiente 100% Seguro</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
