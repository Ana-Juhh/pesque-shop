import { motion } from "motion/react";

import type { PageType } from "../types/navigation";
import type { ShowcaseCard } from "../types/siteContent";
import type { Product } from "../types/shop";

interface BestSellersProps {
  items: ShowcaseCard[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: PageType) => void;
}

export default function BestSellers({ items, onAddToCart, onNavigate }: BestSellersProps) {
  return (
    <section className="py-24 bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-primary" />
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Os Favoritos dos Pescadores</span>
            <span className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter italic drop-shadow-sm">MAIS VENDIDOS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {items.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -12 }} className="flex flex-col items-center text-center group">
              <div className="w-full aspect-square bg-white rounded-[2.5rem] border border-primary/5 flex items-center justify-center p-8 mb-6 group-hover:border-primary transition-all shadow-xl group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-[11px] font-black text-ink group-hover:text-primary transition-colors uppercase tracking-[0.15em] leading-tight max-w-[160px]">{item.name}</h3>
              <p className="mt-2 text-xs font-black text-primary">R$ {item.price.toFixed(2)}</p>
              <div className="mt-4 flex flex-col gap-2 w-full max-w-[160px]">
                <button onClick={() => onAddToCart(item)} className="w-full bg-primary text-white rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest shadow-lg">Adicionar</button>
                <button onClick={() => onNavigate(item.targetPage)} className="w-full bg-white text-primary border border-primary/10 rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest shadow-sm">{item.targetLabel}</button>
              </div>
              <div className="mt-3 w-8 h-1 bg-primary/10 group-hover:w-16 group-hover:bg-primary transition-all rounded-full" />
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button onClick={() => onNavigate("catalogo")} className="bg-primary hover:bg-primary/80 text-white font-black uppercase px-16 py-6 rounded-[2rem] transition-all text-xs tracking-[0.3em] shadow-2xl transform active:scale-95 border-b-4 border-black/20">VER CATALOGO COMPLETO</button>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}
