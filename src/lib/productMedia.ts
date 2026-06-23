import type { Product } from "../types/shop";

const fallbackImagesByCategory = [
  {
    match: ["vara", "carbono", "telesc"],
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=900",
  },
  {
    match: ["molinete", "carretilha"],
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900",
  },
  {
    match: ["isca", "jig", "soft"],
    image:
      "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=900",
  },
  {
    match: ["linha", "multifilamento", "monofilamento"],
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=900",
  },
  {
    match: ["alicate", "caixa", "bolsa", "acessorio", "acessorios"],
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=900",
  },
];

function unique(values: string[]) {
  return values.filter((value, index, list) => value && list.indexOf(value) === index);
}

export function getProductImages(product: Product) {
  const images = unique([product.image, ...(product.images ?? [])]);

  if (images.length > 1) {
    return images;
  }

  const searchableText = `${product.name} ${product.category}`.toLowerCase();
  const fallback = fallbackImagesByCategory.find((item) =>
    item.match.some((word) => searchableText.includes(word))
  );

  return unique([...images, fallback?.image ?? product.image]);
}

export function getProductDescription(product: Product) {
  if (product.description?.trim()) {
    return product.description;
  }

  const details = [
    `${product.name} foi selecionado para pescadores que buscam qualidade, bom desempenho e confiabilidade no uso diario.`,
    `Categoria: ${product.category}.`,
  ];

  if (product.thickness) {
    details.push(`Espessura: ${product.thickness}.`);
  }

  return details.join(" ");
}
