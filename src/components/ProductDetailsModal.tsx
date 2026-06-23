import { useMemo, useState } from "react";
import { ShoppingCart, X } from "lucide-react";

import { getProductDescription, getProductImages } from "../lib/productMedia";
import type { Product } from "../types/shop";

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);

  if (!product) return null;

  const selectedImage = images[activeImage] ?? product.image;

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 px-4 py-8 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center">
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-primary/10 overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 bg-white text-primary border border-primary/10 rounded-full p-3 shadow-lg hover:bg-primary hover:text-white transition-colors"
            aria-label="Fechar detalhes"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-primary/5 p-8 lg:p-10">
              <div className="aspect-square bg-white rounded-3xl border border-primary/10 p-8 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-5 grid grid-cols-4 sm:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={[
                      "aspect-square rounded-2xl border bg-white p-2 transition-all",
                      activeImage === index
                        ? "border-primary shadow-lg"
                        : "border-primary/10 hover:border-primary/40",
                    ].join(" ")}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 lg:p-10 flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary">
                {product.category}
              </p>

              <h2 className="mt-4 text-3xl lg:text-4xl font-black text-primary uppercase tracking-tight leading-tight">
                {product.name}
              </h2>

              {product.discount ? (
                <span className="mt-5 inline-flex w-fit bg-accent text-white font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest">
                  {product.discount}
                </span>
              ) : null}

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-sm font-black text-primary">R$</span>
                <span className="text-5xl font-black text-primary tracking-tighter">
                  {product.price.toFixed(2)}
                </span>
              </div>

              <p className="mt-2 text-[11px] text-gray-400 font-black uppercase tracking-widest">
                ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros
              </p>

              <div className="mt-8 border-t border-primary/10 pt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary">
                  Descricao do produto
                </h3>
                <p className="mt-4 text-sm font-bold text-ink/75 leading-relaxed">
                  {getProductDescription(product)}
                </p>

                {product.thickness ? (
                  <p className="mt-5 text-xs font-black uppercase tracking-widest text-ink/50">
                    Espessura: {product.thickness}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="mt-10 bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all"
              >
                <ShoppingCart size={20} />
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
