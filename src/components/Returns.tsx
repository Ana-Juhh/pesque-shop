import { RefreshCw, ShieldCheck, Truck, Clock, ArrowRight, MessageCircle, Mail } from "lucide-react";
import { motion } from "motion/react";

export default function Returns() {
  return (
    <div className="py-16 bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 text-primary">
            <RefreshCw size={32} />
          </div>
          <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">TROCAS E DEVOLUÇÕES</h2>
          <p className="text-ink mt-4 font-bold uppercase text-xs tracking-widest opacity-60">Sua satisfação é nossa prioridade, garantindo uma experiência tranquila.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-primary/5 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500"
          >
            <div className="bg-primary/5 p-6 rounded-3xl text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <RefreshCw size={40} />
            </div>
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-4 italic">Troca Fácil e Rápida</h3>
            <p className="text-ink font-bold uppercase text-[10px] tracking-widest leading-relaxed opacity-60">
              Na Pesque Shop, você tem até 7 dias corridos após o recebimento para solicitar a troca ou devolução por arrependimento, de forma simples e sem burocracia.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-primary/5 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500"
          >
            <div className="bg-primary/5 p-6 rounded-3xl text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-4 italic">Garantia de Qualidade</h3>
            <p className="text-ink font-bold uppercase text-[10px] tracking-widest leading-relaxed opacity-60">
              Todos os nossos produtos são rigorosamente conferidos antes do envio. Caso receba algo com defeito, a troca é por nossa conta.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[3rem] border border-primary/5 shadow-2xl relative overflow-hidden"
        >
          {/* Background Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
          
          <h3 className="text-2xl font-black text-primary uppercase tracking-tighter text-center italic mb-16">Como Solicitar?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-primary/5 -z-0" />

            <div className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-primary text-white rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform hover:rotate-12 transition-transform">1</div>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest">Contato</h4>
                <p className="text-[10px] font-bold text-ink opacity-60 uppercase tracking-widest leading-relaxed">Fale conosco via WhatsApp ou E-mail informando o número do pedido.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-secondary text-white rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform hover:-rotate-12 transition-transform">2</div>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest">Instruções</h4>
                <p className="text-[10px] font-bold text-ink opacity-60 uppercase tracking-widest leading-relaxed">Enviaremos as orientações para a postagem do produto sem custo adicional.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-primary text-white rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white transform hover:rotate-12 transition-transform">3</div>
              <div className="space-y-2">
                <h4 className="text-xs font-black text-primary uppercase tracking-widest">Resolução</h4>
                <p className="text-[10px] font-bold text-ink opacity-60 uppercase tracking-widest leading-relaxed">Após a análise, enviaremos o novo produto ou faremos o estorno total.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-center gap-12 text-[10px] font-black text-primary uppercase tracking-widest">
            <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full">
              <Clock size={18} className="text-secondary" />
              <span>7 Dias para Devolução</span>
            </div>
            <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full">
              <Truck size={18} className="text-secondary" />
              <span>Logística Reversa Grátis</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center">
          <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/80 transition-all shadow-xl flex items-center justify-center gap-3 transform active:scale-95">
            <MessageCircle size={20} />
            WhatsApp Suporte
          </button>
          <button className="bg-white text-primary border border-primary/10 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/5 transition-all shadow-xl flex items-center justify-center gap-3 transform active:scale-95">
            <Mail size={20} />
            Enviar E-mail
          </button>
        </div>
      </div>
    </div>
  );
}
