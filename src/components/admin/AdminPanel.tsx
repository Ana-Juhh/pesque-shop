import { ChangeEvent, useMemo, useState } from "react";
import {
  Boxes,
  Image as ImageIcon,
  LayoutTemplate,
  Plus,
  RotateCcw,
  Save,
  ShoppingBag,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

import { menuItems } from "../../data/menu";
import { navigationOptions } from "../../data/siteContent";
import type { CategoryType, PageType } from "../../types/navigation";
import type {
  CustomCategoryProduct,
  OfferCard,
  ShowcaseCard,
  SiteContent,
} from "../../types/siteContent";

interface AdminPanelProps {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
  onReset: () => void;
}

type TabKey = "hero" | "offers" | "bestSellers" | "customProducts";

const productCategories = menuItems.filter(
  (item) => item.id !== "home" && item.id !== "ofertas"
) as Array<{
  id: Exclude<CategoryType, "home" | "register">;
  label: string;
  subcategories?: string[];
}>;

function readFileAsDataUrl(file: File, callback: (value: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(String(reader.result ?? ""));
  reader.readAsDataURL(file);
}

function ImageInput({
  onFile,
  hint = "Enviar JPG/PNG",
}: {
  onFile: (value: string) => void;
  hint?: string;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, onFile);
  };

  return (
    <label className="flex items-center justify-center gap-2 border border-dashed border-primary/20 rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary cursor-pointer bg-white">
      <Upload size={16} />
      {hint}
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  );
}

function PageSelect({
  value,
  onChange,
}: {
  value: PageType;
  onChange: (value: PageType) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as PageType)}
      className="w-full border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary"
    >
      {navigationOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function CategorySelect({
  value,
  onChange,
}: {
  value: Exclude<CategoryType, "home" | "register">;
  onChange: (value: Exclude<CategoryType, "home" | "register">) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value as Exclude<CategoryType, "home" | "register">)
      }
      className="w-full border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary"
    >
      {productCategories.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function SubcategorySelect({
  mainCategory,
  value,
  onChange,
}: {
  mainCategory: Exclude<CategoryType, "home" | "register">;
  value: string;
  onChange: (value: string) => void;
}) {
  const subcategories =
    productCategories.find((item) => item.id === mainCategory)?.subcategories ?? [];

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">Sem subcategoria</option>
      {subcategories.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function createEmptyOffer(): OfferCard {
  return {
    id: Date.now(),
    name: "",
    oldPrice: 0,
    price: 0,
    image: "",
    discount: "",
    category: "",
    targetPage: "catalogo",
    targetLabel: "Ver mais",
  };
}

function createEmptyBestSeller(): ShowcaseCard {
  return {
    id: Date.now(),
    name: "",
    price: 0,
    image: "",
    discount: "",
    category: "",
    targetPage: "catalogo",
    targetLabel: "Abrir secao",
  };
}

function createCustomProduct(): CustomCategoryProduct {
  return {
    id: Date.now(),
    name: "",
    price: 0,
    image: "",
    discount: "",
    category: "",
    mainCategory: "varas",
  };
}

function TabButton({
  active,
  icon,
  label,
  onClick,
  count,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border",
        active
          ? "bg-primary text-white border-primary shadow-lg"
          : "bg-white text-primary border-primary/10 hover:bg-primary/5",
      ].join(" ")}
    >
      {icon}
      <span>{label}</span>
      {typeof count === "number" ? (
        <span
          className={[
            "ml-1 rounded-full px-2 py-1 text-[9px]",
            active ? "bg-white/15 text-white" : "bg-primary/10 text-primary",
          ].join(" ")}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-black uppercase tracking-widest text-primary">
        {title}
      </h4>
      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">
        {description}
      </p>
    </div>
  );
}

function ImagePreview({
  src,
  alt,
  size = "large",
}: {
  src?: string;
  alt: string;
  size?: "small" | "large";
}) {
  const classes =
    size === "small"
      ? "w-20 h-20 rounded-2xl"
      : "w-full max-w-sm h-48 rounded-3xl";

  return src ? (
    <img
      src={src}
      alt={alt}
      className={`${classes} object-cover border border-primary/10 bg-white shadow-sm`}
      referrerPolicy="no-referrer"
    />
  ) : (
    <div
      className={`${classes} flex items-center justify-center border border-dashed border-primary/20 bg-primary/5 text-primary/50`}
    >
      <ImageIcon size={20} />
    </div>
  );
}

function HeroEditor({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
}) {
  return (
    <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-6">
      <SectionHeader
        title="Hero Principal"
        description="Edite textos, imagens e botoes da capa principal."
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_360px] gap-6 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={content.hero.eyebrow}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, eyebrow: event.target.value },
              })
            }
            placeholder="Texto superior"
            className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            value={content.hero.discountValue}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, discountValue: event.target.value },
              })
            }
            placeholder="Destaque numerico"
            className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            value={content.hero.titleTop}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, titleTop: event.target.value },
              })
            }
            placeholder="Titulo linha 1"
            className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            value={content.hero.titleBottom}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, titleBottom: event.target.value },
              })
            }
            placeholder="Titulo linha 2"
            className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            value={content.hero.backgroundImage}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, backgroundImage: event.target.value },
              })
            }
            placeholder="URL da imagem de fundo"
            className="md:col-span-2 border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <ImageInput
            onFile={(value) =>
              onChange({
                ...content,
                hero: { ...content.hero, backgroundImage: value },
              })
            }
            hint="Enviar imagem de fundo"
          />

          <input
            value={content.hero.featuredImage}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, featuredImage: event.target.value },
              })
            }
            placeholder="URL da imagem lateral"
            className="md:col-span-2 border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <ImageInput
            onFile={(value) =>
              onChange({
                ...content,
                hero: { ...content.hero, featuredImage: value },
              })
            }
            hint="Enviar imagem lateral"
          />

          <textarea
            value={content.hero.description}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, description: event.target.value },
              })
            }
            rows={4}
            placeholder="Descricao"
            className="md:col-span-2 border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            value={content.hero.primaryButtonLabel}
            onChange={(event) =>
              onChange({
                ...content,
                hero: { ...content.hero, primaryButtonLabel: event.target.value },
              })
            }
            placeholder="Texto do botao principal"
            className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <PageSelect
            value={content.hero.primaryButtonTarget}
            onChange={(value) =>
              onChange({
                ...content,
                hero: { ...content.hero, primaryButtonTarget: value },
              })
            }
          />

          <input
            value={content.hero.secondaryButtonLabel}
            onChange={(event) =>
              onChange({
                ...content,
                hero: {
                  ...content.hero,
                  secondaryButtonLabel: event.target.value,
                },
              })
            }
            placeholder="Texto do botao secundario"
            className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
          />
          <PageSelect
            value={content.hero.secondaryButtonTarget}
            onChange={(value) =>
              onChange({
                ...content,
                hero: { ...content.hero, secondaryButtonTarget: value },
              })
            }
          />
        </div>

        <div className="bg-primary/5 rounded-3xl border border-primary/10 p-5 space-y-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
              Preview Fundo
            </p>
            <ImagePreview
              src={content.hero.backgroundImage}
              alt="Preview imagem de fundo"
            />
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
              Preview Lateral
            </p>
            <ImagePreview
              src={content.hero.featuredImage}
              alt="Preview imagem lateral"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCardEditor({
  title,
  items,
  onChange,
  onAdd,
  withOldPrice,
}: {
  title: string;
  items: Array<OfferCard | ShowcaseCard>;
  onChange: (items: Array<OfferCard | ShowcaseCard>) => void;
  onAdd: () => void;
  withOldPrice?: boolean;
}) {
  return (
    <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title={title}
          description="Edite, crie e direcione os cards para qualquer pagina do site."
        />
        <button
          type="button"
          onClick={onAdd}
          className="bg-primary text-white px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
        >
          <Plus size={16} />
          Novo card
        </button>
      </div>

      <div className="space-y-6">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
            <p className="text-[11px] font-black uppercase tracking-widest text-primary/70">
              Nenhum card criado ainda
            </p>
          </div>
        ) : null}

        {items.map((item, index) => (
          <div
            key={item.id}
            className="border border-primary/10 rounded-3xl p-5 bg-primary/5 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Card {index + 1}
                </p>
                <p className="text-sm font-black text-ink mt-2">
                  {item.name || "Sem nome ainda"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onChange(items.filter((currentItem) => currentItem.id !== item.id))
                }
                className="text-accent hover:text-ink transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_220px] gap-6 items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={item.name}
                  onChange={(event) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, name: event.target.value }
                          : currentItem
                      )
                    )
                  }
                  placeholder="Nome do card"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={item.category}
                  onChange={(event) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, category: event.target.value }
                          : currentItem
                      )
                    )
                  }
                  placeholder="Categoria/Subcategoria"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={item.image}
                  onChange={(event) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, image: event.target.value }
                          : currentItem
                      )
                    )
                  }
                  placeholder="URL da imagem"
                  className="md:col-span-2 border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <ImageInput
                  onFile={(value) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, image: value }
                          : currentItem
                      )
                    )
                  }
                />

                {withOldPrice && "oldPrice" in item ? (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.oldPrice}
                    onChange={(event) =>
                      onChange(
                        items.map((currentItem) =>
                          currentItem.id === item.id
                            ? {
                                ...currentItem,
                                oldPrice: Number(event.target.value),
                              }
                            : currentItem
                        )
                      )
                    }
                    placeholder="Preco antigo"
                    className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : null}

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(event) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, price: Number(event.target.value) }
                          : currentItem
                      )
                    )
                  }
                  placeholder="Preco"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={item.discount ?? ""}
                  onChange={(event) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, discount: event.target.value }
                          : currentItem
                      )
                    )
                  }
                  placeholder="Selo de desconto"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={item.targetLabel}
                  onChange={(event) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, targetLabel: event.target.value }
                          : currentItem
                      )
                    )
                  }
                  placeholder="Texto do botao"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <PageSelect
                  value={item.targetPage}
                  onChange={(value) =>
                    onChange(
                      items.map((currentItem) =>
                        currentItem.id === item.id
                          ? { ...currentItem, targetPage: value }
                          : currentItem
                      )
                    )
                  }
                />
              </div>

              <div className="bg-white rounded-3xl border border-primary/10 p-4 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Preview do card
                </p>
                <ImagePreview src={item.image} alt={item.name || "Preview do card"} />
                <div className="space-y-2">
                  <p className="text-xs font-black text-ink line-clamp-2">
                    {item.name || "Sem nome"}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">
                    {item.category || "Sem categoria"}
                  </p>
                  <p className="text-sm font-black text-primary">
                    R$ {Number(item.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomProductsEditor({
  products,
  onChange,
}: {
  products: CustomCategoryProduct[];
  onChange: (products: CustomCategoryProduct[]) => void;
}) {
  return (
    <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title="Cards das Categorias e Subcategorias"
          description="Os cards criados aqui entram nas paginas do menu e nas subcategorias."
        />
        <button
          type="button"
          onClick={() => onChange([...products, createCustomProduct()])}
          className="bg-primary text-white px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
        >
          <Plus size={16} />
          Novo produto
        </button>
      </div>

      <div className="space-y-6">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
            <p className="text-[11px] font-black uppercase tracking-widest text-primary/70">
              Nenhum produto criado ainda
            </p>
          </div>
        ) : null}

        {products.map((product, index) => (
          <div
            key={product.id}
            className="border border-primary/10 rounded-3xl p-5 bg-primary/5 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Produto {index + 1}
                </p>
                <p className="text-sm font-black text-ink mt-2">
                  {product.name || "Sem nome ainda"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onChange(
                    products.filter(
                      (currentProduct) => currentProduct.id !== product.id
                    )
                  )
                }
                className="text-accent hover:text-ink transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_220px] gap-6 items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={product.name}
                  onChange={(event) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, name: event.target.value }
                          : currentProduct
                      )
                    )
                  }
                  placeholder="Nome do produto"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <CategorySelect
                  value={product.mainCategory}
                  onChange={(value) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? {
                              ...currentProduct,
                              mainCategory: value,
                              category: "",
                            }
                          : currentProduct
                      )
                    )
                  }
                />

                <SubcategorySelect
                  mainCategory={product.mainCategory}
                  value={product.category}
                  onChange={(value) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, category: value }
                          : currentProduct
                      )
                    )
                  }
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={(event) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, price: Number(event.target.value) }
                          : currentProduct
                      )
                    )
                  }
                  placeholder="Preco"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={product.discount ?? ""}
                  onChange={(event) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, discount: event.target.value }
                          : currentProduct
                      )
                    )
                  }
                  placeholder="Selo de desconto"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={product.thickness ?? ""}
                  onChange={(event) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, thickness: event.target.value }
                          : currentProduct
                      )
                    )
                  }
                  placeholder="Espessura (opcional)"
                  className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  value={product.image}
                  onChange={(event) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, image: event.target.value }
                          : currentProduct
                      )
                    )
                  }
                  placeholder="URL da imagem"
                  className="md:col-span-2 border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
                />

                <ImageInput
                  onFile={(value) =>
                    onChange(
                      products.map((currentProduct) =>
                        currentProduct.id === product.id
                          ? { ...currentProduct, image: value }
                          : currentProduct
                      )
                    )
                  }
                />
              </div>

              <div className="bg-white rounded-3xl border border-primary/10 p-4 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                  Preview do produto
                </p>
                <ImagePreview
                  src={product.image}
                  alt={product.name || "Preview do produto"}
                />
                <div className="space-y-2">
                  <p className="text-xs font-black text-ink line-clamp-2">
                    {product.name || "Sem nome"}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">
                    {product.mainCategory}
                    {product.category ? ` • ${product.category}` : ""}
                  </p>
                  <p className="text-sm font-black text-primary">
                    R$ {Number(product.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminPanel({
  content,
  onChange,
  onReset,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("hero");

  const tabStats = useMemo(
    () => ({
      offers: content.offers.length,
      bestSellers: content.bestSellers.length,
      customProducts: content.customProducts.length,
    }),
    [content]
  );

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-primary uppercase tracking-tighter italic">
              Painel de Edicao do Site
            </h3>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">
              Agora organizado por abas para facilitar a edicao.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-primary text-white px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-lg">
              <Save size={16} />
              Salvando no PocketBase
            </div>

            <button
              type="button"
              onClick={onReset}
              className="bg-white text-primary px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-lg border border-primary/10"
            >
              <RotateCcw size={16} />
              Restaurar conteudo padrao
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <TabButton
            active={activeTab === "hero"}
            icon={<LayoutTemplate size={16} />}
            label="Hero"
            onClick={() => setActiveTab("hero")}
          />
          <TabButton
            active={activeTab === "offers"}
            icon={<ShoppingBag size={16} />}
            label="Ofertas"
            count={tabStats.offers}
            onClick={() => setActiveTab("offers")}
          />
          <TabButton
            active={activeTab === "bestSellers"}
            icon={<Star size={16} />}
            label="Mais vendidos"
            count={tabStats.bestSellers}
            onClick={() => setActiveTab("bestSellers")}
          />
          <TabButton
            active={activeTab === "customProducts"}
            icon={<Boxes size={16} />}
            label="Categorias"
            count={tabStats.customProducts}
            onClick={() => setActiveTab("customProducts")}
          />
        </div>
      </section>

      {activeTab === "hero" ? (
        <HeroEditor content={content} onChange={onChange} />
      ) : null}

      {activeTab === "offers" ? (
        <ProductCardEditor
          title="Ofertas do Dia"
          items={content.offers}
          withOldPrice
          onAdd={() =>
            onChange({
              ...content,
              offers: [...content.offers, createEmptyOffer()],
            })
          }
          onChange={(items) =>
            onChange({ ...content, offers: items as OfferCard[] })
          }
        />
      ) : null}

      {activeTab === "bestSellers" ? (
        <ProductCardEditor
          title="Mais Vendidos"
          items={content.bestSellers}
          onAdd={() =>
            onChange({
              ...content,
              bestSellers: [...content.bestSellers, createEmptyBestSeller()],
            })
          }
          onChange={(items) =>
            onChange({ ...content, bestSellers: items as ShowcaseCard[] })
          }
        />
      ) : null}

      {activeTab === "customProducts" ? (
        <CustomProductsEditor
          products={content.customProducts}
          onChange={(products) =>
            onChange({ ...content, customProducts: products })
          }
        />
      ) : null}
    </div>
  );
}