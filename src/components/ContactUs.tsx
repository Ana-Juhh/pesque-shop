import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MessageCircle, Send, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 5000);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5511996492175", "_blank");
  };

  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">FALE CONOSCO</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Estamos prontos para ouvir você e ajudar na sua próxima aventura.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight mb-8 italic relative z-10">Canais de Atendimento</h3>
              
              <div className="space-y-10 relative z-10">
                <div className="flex items-center gap-6 group">
                  <div className="bg-primary/5 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Telefone / WhatsApp</h4>
                    <p className="text-xl font-black text-ink tracking-tight">(11) 99649-2175</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="bg-primary/5 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E-mail de Contato</h4>
                    <p className="text-xl font-black text-ink tracking-tight">contato@pesqueshop.com.br</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="bg-primary/5 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nossa Sede</h4>
                    <p className="text-xl font-black text-ink tracking-tight">Rua Francisco Marengo, 500 - São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center gap-4 shadow-2xl text-sm"
            >
              <MessageCircle size={32} />
              Conversar no WhatsApp
            </motion.button>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl border border-primary/5 relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink"
                      placeholder="Como podemos te chamar?"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Telefone</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">E-mail</label>
                      <input 
                        type="email" 
                        required
                        className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest ml-2">Sua Mensagem</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full border border-primary/5 bg-primary/5 p-5 rounded-2xl text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-ink resize-none"
                      placeholder="Conte para nós como podemos ajudar..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-4 shadow-xl text-xs transform active:scale-95"
                  >
                    <Send size={20} />
                    Enviar Mensagem
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-black text-primary uppercase tracking-tighter italic mb-4">Mensagem Enviada!</h3>
                  <p className="text-ink font-bold uppercase text-xs tracking-widest opacity-60 leading-relaxed">
                    Recebemos seu contato. Nossa equipe de especialistas retornará em breve para te ajudar.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
