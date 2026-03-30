import { motion } from "motion/react";

interface BestSellersProps {
  onAddToCart: (product: any) => void;
  onNavigate: (page: any) => void;
}

const bestSellers = [
  { id: 1, name: "Molinete Shimano SLX DC", price: 1299.90, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Molinetes" },
  { id: 2, name: "Isca Artificial Popper Marine", price: 49.90, image: "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=800", category: "Iscas" },
  { id: 3, name: "Linha Multifilamento 8X", price: 120.00, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Linhas" },
  { id: 4, name: "Bolsa de Pesca G Marine", price: 245.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Bolsas" },
  { id: 5, name: "Alicate de Contenção c/ Balança", price: 65.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Acessórios" },
];

export default function BestSellers({ onAddToCart, onNavigate }: BestSellersProps) {
  return (
    <section className="py-24 bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-primary"></span>
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Os Favoritos dos Pescadores</span>
            <span className="h-px w-12 bg-primary"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter italic drop-shadow-sm">MAIS VENDIDOS</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {bestSellers.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -12 }}
              onClick={() => onAddToCart(item)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square bg-white rounded-[2.5rem] border border-primary/5 flex items-center justify-center p-8 mb-6 group-hover:border-primary transition-all shadow-xl group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-[11px] font-black text-ink group-hover:text-primary transition-colors uppercase tracking-[0.15em] leading-tight max-w-[140px]">
                {item.name}
              </h3>
              <div className="mt-3 w-8 h-1 bg-primary/10 group-hover:w-16 group-hover:bg-primary transition-all rounded-full"></div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button 
            onClick={() => onNavigate("catalogo")}
            className="bg-primary hover:bg-primary/80 text-white font-black uppercase px-16 py-6 rounded-[2rem] transition-all text-xs tracking-[0.3em] shadow-2xl transform active:scale-95 border-b-4 border-black/20"
          >
            VER CATÁLOGO COMPLETO ›
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
    </section>
  );
}
