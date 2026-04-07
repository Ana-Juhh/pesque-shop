import type { Product } from "../types/shop";

export const varasProducts: Product[] = [
  { id: 101, name: "Vara Shimano Trevala Carbon 1.80m", price: 849.9, image: "https://images.unsplash.com/photo-1611095777215-99bb5cce883d?auto=format&fit=crop&q=80&w=800", discount: "15% OFF", category: "Vara de Carbono" },
  { id: 102, name: "Vara TelescÃ³pica Albatroz 2.40m", price: 129.9, image: "https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?auto=format&fit=crop&q=80&w=800", category: "Vara TelescÃ³pica" },
  { id: 103, name: "Vara Marine Sports Giant CatFish 2.10m", price: 449.9, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Vara de Molinete" },
  { id: 104, name: "Vara Shimano Curado Casting 2.10m", price: 979.9, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Vara de Carretilha" },
  { id: 105, name: "Vara de Pesca MarÃ­tima Surf 3.00m", price: 399.9, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800", category: "Vara de Carbono" },
];

export const molinetesProducts: Product[] = [
  { id: 201, name: "Molinete Shimano FX 2500", price: 179.9, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", discount: "40% OFF", category: "Molinetes" },
  { id: 202, name: "Carretilha Marine Sports Titan 12000", price: 349.9, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Baixo" },
  { id: 203, name: "Molinete Daiwa Sweepfire 4000", price: 159.9, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Molinetes" },
  { id: 204, name: "Carretilha Shimano Curado K", price: 899.9, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Baixo" },
  { id: 205, name: "Carretilha Penn Warfare Perfil Alto", price: 1150, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Alto" },
  { id: 206, name: "Carretilha Abu Garcia Revo Beast", price: 1699.9, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Baixo" },
];

export const iscasProducts: Product[] = [
  { id: 301, name: "Isca de SuperfÃ­cie Zara Spook", price: 45.9, image: "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=800", category: "Iscas de SuperfÃ­cie" },
  { id: 302, name: "Isca Meia Ãgua Inna 90 Marine", price: 39.9, image: "https://images.unsplash.com/photo-1583244532629-1f3c02824c3c?auto=format&fit=crop&q=80&w=800", category: "Iscas Meia Ãgua" },
  { id: 303, name: "Isca de Fundo Jig Head 15g", price: 15.9, image: "https://images.unsplash.com/photo-1583244532643-3ba99657636d?auto=format&fit=crop&q=80&w=800", category: "Iscas de Fundo" },
  { id: 304, name: "Isca Soft CamarÃ£o Articulado", price: 22.5, image: "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=800", category: "Iscas Soft" },
];

export const linhasProducts: Product[] = [
  { id: 401, name: "Linha Monofilamento Araty 0.30mm", price: 25.9, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", thickness: "0.30mm", category: "Linhas Monofilamentos" },
  { id: 402, name: "Linha Multifilamento Vexter 0.25mm", price: 89.9, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", thickness: "0.25mm", category: "Linhas Multifilamentos" },
  { id: 403, name: "Linha Multifilamento 8X 0.40mm", price: 120, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", thickness: "0.40mm", category: "Linhas Multifilamentos" },
];

export const acessoriosProducts: Product[] = [
  { id: 501, name: "Alicate de ContenÃ§Ã£o com BalanÃ§a", price: 65, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Alicates" },
  { id: 502, name: "Caixa de Pesca Plano 3 Bandejas", price: 189, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Caixas e Estojos" },
  { id: 503, name: "Bolsa de Pesca G Marine Sports", price: 245, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Bolsas" },
];

export const allProducts = [
  ...varasProducts,
  ...molinetesProducts,
  ...iscasProducts,
  ...linhasProducts,
  ...acessoriosProducts,
];

export const lancamentosProducts = [...allProducts]
  .sort((a, b) => b.price - a.price)
  .slice(0, 8);
