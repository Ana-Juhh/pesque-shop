import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface DailyOffersProps {
  onAddToCart: (product: any) => void;
}

const offers = [
  {
    id: 1,
    name: "Molinete Shimano FX 2500",
    oldPrice: 299.90,
    newPrice: 179.90,
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    category: "Molinetes"
  },
  {
    id: 2,
    name: "Isca Artificial Marine Sports Inna 90",
    oldPrice: 159.90,
    newPrice: 89.90,
    discount: "44% OFF",
    image: "https://images.unsplash.com/photo-1583244532629-1f3c02824c3c?auto=format&fit=crop&q=80&w=800",
    category: "Iscas"
  },
  {
    id: 3,
    name: "Vara Shimano Trevala Carbon 1.80m",
    oldPrice: 1589.90,
    newPrice: 849.90,
    discount: "47% OFF",
    image: "https://images.unsplash.com/photo-1611095777215-99bb5cce883d?auto=format&fit=crop&q=80&w=800",
    category: "Varas"
  }
];

export default function DailyOffers({ onAddToCart }: DailyOffersProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-secondary"></span>
            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">Oportunidade Única</span>
            <span className="h-px w-12 bg-secondary"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter italic drop-shadow-sm">OFERTAS DO DIA</h2>
          
          <div className="mt-10 flex justify-center items-center gap-6 font-mono text-4xl font-black text-ink">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white w-20 h-24 flex items-center justify-center rounded-3xl shadow-2xl border-b-4 border-black/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{String(timeLeft.h).padStart(2, '0')}</span>
              </div>
              <span className="text-[10px] uppercase mt-3 tracking-[0.2em] text-primary font-black">Horas</span>
            </div>
            <span className="text-secondary animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white w-20 h-24 flex items-center justify-center rounded-3xl shadow-2xl border-b-4 border-black/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{String(timeLeft.m).padStart(2, '0')}</span>
              </div>
              <span className="text-[10px] uppercase mt-3 tracking-[0.2em] text-primary font-black">Minutos</span>
            </div>
            <span className="text-secondary animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white w-20 h-24 flex items-center justify-center rounded-3xl shadow-2xl border-b-4 border-black/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{String(timeLeft.s).padStart(2, '0')}</span>
              </div>
              <span className="text-[10px] uppercase mt-3 tracking-[0.2em] text-primary font-black">Segundos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {offers.map((offer) => (
            <motion.div 
              key={offer.id}
              whileHover={{ y: -15 }}
              className="bg-paper border border-primary/5 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all group relative"
            >
              <div className="relative aspect-square overflow-hidden bg-white p-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={offer.image} 
                  alt={offer.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-accent text-white font-black text-[10px] px-4 py-2 rounded-full shadow-2xl uppercase tracking-widest z-20 border-2 border-white/20">
                  {offer.discount}
                </div>
              </div>
              <div className="p-10 relative">
                <h3 className="font-black text-ink text-base h-14 line-clamp-2 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{offer.name}</h3>
                <div className="mt-8 flex flex-col">
                  <span className="text-[10px] text-gray-400 line-through font-black uppercase tracking-widest mb-1">De R$ {offer.oldPrice.toFixed(2)}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-primary">Por R$</span>
                    <span className="text-4xl font-black text-primary tracking-tighter">{offer.newPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onAddToCart({ ...offer, price: offer.newPrice })}
                  className="w-full mt-10 bg-primary hover:bg-primary/80 text-white font-black py-5 rounded-[1.5rem] transition-all uppercase text-xs tracking-[0.2em] shadow-xl transform active:scale-95 border-b-4 border-black/20"
                >
                  COMPRAR AGORA
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>
    </section>
  );
}
