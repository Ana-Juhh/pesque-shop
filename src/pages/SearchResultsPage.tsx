import { Plus } from "lucide-react";
import { motion } from "motion/react";

import type { Product } from "../types/shop";

interface SearchResultsPageProps {
  products: Product[];
  query: string;
  onAddToCart: (product: Product) => void;
  onBackHome: () => void;
}

export default function SearchResultsPage({
  products,
  query,
  onAddToCart,
  onBackHome,
}: SearchResultsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-primary/10 pb-8 gap-4">
        <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">
          Resultados para: <span className="text-secondary">"{query}"</span>
        </h2>
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm border border-primary/5">
          {products.length} Produtos encontrados
        </span>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-primary/5 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden p-8 bg-primary/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {product.discount && (
                  <div className="absolute top-4 right-4 bg-secondary text-white font-black text-[10px] px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest z-10">
                    {product.discount}
                  </div>
                )}
              </div>
              <div className="p-8">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 opacity-60">{product.category}</p>
                <h3 className="text-base font-black text-ink leading-tight h-12 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">PreÃ§o</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-black text-primary">R$</span>
                      <span className="text-2xl font-black text-primary tracking-tighter">{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-primary text-white p-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg transform active:scale-95 group-hover:rotate-90"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-primary/5 shadow-2xl max-w-2xl mx-auto px-8">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <Plus size={48} className="text-primary rotate-45 opacity-20" />
          </div>
          <h3 className="text-2xl font-black text-primary uppercase tracking-tighter italic mb-4">Ops! Nada por aqui.</h3>
          <p className="text-ink font-bold uppercase text-xs tracking-widest opacity-60 leading-relaxed mb-10">
            NÃ£o encontramos nenhum produto com o termo <span className="text-secondary">"{query}"</span>.
            Tente buscar por palavras mais genÃ©ricas ou navegue pelo menu.
          </p>
          <button
            onClick={onBackHome}
            className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl transform active:scale-95"
          >
            Voltar para a pÃ¡gina inicial
          </button>
        </div>
      )}
    </div>
  );
}
