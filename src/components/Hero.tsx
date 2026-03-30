import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onNavigate: (page: any) => void;
  onAddToCart: (product: any) => void;
}

export default function Hero({ onNavigate, onAddToCart }: HeroProps) {
  return (
    <section className="relative w-full h-[400px] md:h-[650px] overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Pesque e Shop Nature" 
          className="w-full h-full object-cover scale-110 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-secondary"></span>
            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">Aventura & Performance</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter drop-shadow-2xl">
            <span className="text-secondary block">DOMINE AS</span> 
            <span className="text-white">ÁGUAS</span>
          </h2>
          
          <div className="mt-8 flex flex-col gap-4">
            <p className="text-lg md:text-2xl font-bold uppercase text-paper/90 tracking-tight max-w-lg leading-tight">
              Equipamentos profissionais para quem leva a pesca a sério. Sinta a força da natureza em cada arremesso.
            </p>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="flex flex-col">
                <span className="text-4xl md:text-6xl font-black text-highlight leading-none drop-shadow-lg">60%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">De Desconto</span>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-white leading-none">OFERTAS</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-highlight">Exclusivas</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate("ofertas")}
              className="bg-primary hover:bg-primary/80 text-white font-black uppercase px-10 py-5 rounded-2xl border-b-4 border-black/20 shadow-2xl transition-all transform hover:scale-105 active:scale-95 tracking-widest text-xs"
            >
              EXPLORAR EQUIPAMENTOS
            </button>
            <button 
              onClick={() => onNavigate("lancamentos")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black uppercase px-10 py-5 rounded-2xl border border-white/20 transition-all tracking-widest text-xs"
            >
              VER LANÇAMENTOS
            </button>
          </div>
        </motion.div>

        {/* Floating Element (Decorative) - Full Logo as requested */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: 10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ 
            duration: 4, 
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-highlight/20 blur-[100px] rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600&h=600" 
              alt="Pesque Shop Full Logo" 
              className="w-[500px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20">
        <button className="bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-2xl text-white transition-all border border-white/10 group">
          <ChevronLeft size={5} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button className="bg-white/10 hover:bg-white/30 backdrop-blur-md p-4 rounded-2xl text-white transition-all border border-white/10 group">
          <ChevronRight size={5} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper to-transparent"></div>
    </section>
  );
}

