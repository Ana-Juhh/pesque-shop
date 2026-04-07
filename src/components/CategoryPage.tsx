import { motion } from "motion/react";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import type { Product } from "../types/shop";

interface CategoryPageProps {
  title: string;
  products: Product[];
  activeSubcategory?: string;
  onAddToCart: (product: Product) => void;
}

export default function CategoryPage({ title, products, activeSubcategory, onAddToCart }: CategoryPageProps) {
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [thicknessFilter, setThicknessFilter] = useState<string | null>(null);

  const priceRanges = [
    { label: "R$ 100 - R$ 300", min: 100, max: 300 },
    { label: "R$ 301 - R$ 600", min: 301, max: 600 },
    { label: "R$ 601 - R$ 900", min: 601, max: 900 },
    { label: "R$ 901 - R$ 1200", min: 901, max: 1200 },
    { label: "R$ 1201 - R$ 1500", min: 1201, max: 1500 },
    { label: "R$ 1500 acima", min: 1501, max: 99999 },
  ];

  const thicknesses = ["0.20mm", "0.25mm", "0.30mm", "0.35mm", "0.40mm", "0.45mm", "0.50mm", "0.60mm", "0.70mm", "0.80mm", "0.90mm"];

  const filteredProducts = products.filter(p => {
    let matchesSub = true;
    if (activeSubcategory) {
      matchesSub = p.category === activeSubcategory;
    }

    let matchesPrice = true;
    if (priceFilter) {
      const range = priceRanges.find(r => r.label === priceFilter);
      if (range) {
        matchesPrice = p.price >= range.min && p.price <= range.max;
      }
    }

    let matchesThickness = true;
    if (thicknessFilter) {
      matchesThickness = p.thickness === thicknessFilter;
    }

    return matchesSub && matchesPrice && matchesThickness;
  });

  const isLines = title.toLowerCase().includes("linhas");
  const isReels = title.toLowerCase().includes("molinetes");

  return (
    <div className="py-12 bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-primary/5 sticky top-40">
              <div className="flex items-center gap-2 mb-6 text-primary border-b border-primary/5 pb-4">
                <Filter size={20} />
                <h3 className="font-black uppercase tracking-widest text-xs">Filtros</h3>
              </div>

              {(priceFilter || thicknessFilter) && (
                <button 
                  onClick={() => { setPriceFilter(null); setThicknessFilter(null); }}
                  className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase mb-4 hover:underline"
                >
                  <X size={12} /> Limpar Filtros
                </button>
              )}

              {isReels && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Faixa de Preço</h4>
                  <div className="flex flex-col gap-2">
                    {priceRanges.map(range => (
                      <label key={range.label} className="flex items-center gap-3 text-xs text-ink cursor-pointer hover:text-primary font-bold group">
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceFilter === range.label}
                          onChange={() => setPriceFilter(range.label)}
                          className="accent-primary w-4 h-4"
                        />
                        <span className="group-hover:translate-x-1 transition-transform">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {isLines && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-700 uppercase mb-3">Espessura</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {thicknesses.map(t => (
                      <button
                        key={t}
                        onClick={() => setThicknessFilter(thicknessFilter === t ? null : t)}
                        className={cn(
                          "px-2 py-1 border text-[10px] font-bold rounded-sm transition-colors",
                          thicknessFilter === t ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-inner">
                <p className="text-[10px] text-primary font-black uppercase leading-tight tracking-widest">
                  Precisa de ajuda para escolher?
                </p>
                <button className="text-[10px] text-secondary underline mt-2 font-black uppercase tracking-tighter hover:text-ink transition-colors">Fale com um especialista</button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-6">
              <div>
                <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">
                  {title} {activeSubcategory && <span className="text-secondary block text-sm mt-1 not-italic font-bold tracking-widest">› {activeSubcategory}</span>}
                </h2>
              </div>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{filteredProducts.length} Produtos encontrados</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    className="bg-white border border-primary/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white p-8">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {product.discount && (
                        <div className="absolute top-4 right-4 bg-accent text-white font-black text-[10px] px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                          {product.discount}
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="font-black text-ink text-sm h-12 line-clamp-2 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.thickness && (
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-2 block">Espessura: {product.thickness}</span>
                      )}
                      <div className="mt-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-black text-primary">R$</span>
                          <span className="text-3xl font-black text-primary tracking-tighter">{product.price.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">
                          ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros
                        </p>
                      </div>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="w-full mt-6 bg-primary hover:bg-primary/80 text-white font-black py-4 rounded-2xl transition-all uppercase text-xs tracking-widest shadow-lg transform active:scale-95"
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-sm border border-dashed border-gray-300">
                <p className="text-gray-400 font-bold uppercase text-sm">Nenhum produto encontrado com estes filtros.</p>
                <button 
                  onClick={() => { setPriceFilter(null); setThicknessFilter(null); }}
                  className="mt-4 text-primary font-bold underline text-xs"
                >
                  Ver todos os produtos desta categoria
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

