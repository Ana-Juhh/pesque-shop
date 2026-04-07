import { ChangeEvent } from "react";
import { Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";

import { menuItems } from "../../data/menu";
import { navigationOptions } from "../../data/siteContent";
import type { CategoryType, PageType } from "../../types/navigation";
import type { CustomCategoryProduct, HeroContent, OfferCard, ShowcaseCard, SiteContent } from "../../types/siteContent";

interface AdminPanelProps {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
  onReset: () => void;
}

const productCategories = menuItems.filter((item) => item.id !== "home" && item.id !== "ofertas") as Array<{ id: Exclude<CategoryType, "home" | "register">; label: string; subcategories?: string[] }>;

function readFileAsDataUrl(file: File, callback: (value: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(String(reader.result ?? ""));
  reader.readAsDataURL(file);
}

function ImageInput({ onFile }: { onFile: (value: string) => void }) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, onFile);
  };

  return (
    <label className="flex items-center justify-center gap-2 border border-dashed border-primary/20 rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary cursor-pointer bg-white">
      <Upload size={16} />
      Enviar JPG/PNG
      <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={handleChange} />
    </label>
  );
}

function PageSelect({ value, onChange }: { value: PageType; onChange: (value: PageType) => void }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value as PageType)} className="w-full border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary">
      {navigationOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}

function CategorySelect({ value, onChange }: { value: Exclude<CategoryType, "home" | "register">; onChange: (value: Exclude<CategoryType, "home" | "register">) => void }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value as Exclude<CategoryType, "home" | "register">)} className="w-full border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary">
      {productCategories.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
    </select>
  );
}

function SubcategorySelect({ mainCategory, value, onChange }: { mainCategory: Exclude<CategoryType, "home" | "register">; value: string; onChange: (value: string) => void }) {
  const subcategories = productCategories.find((item) => item.id === mainCategory)?.subcategories ?? [];
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-primary">
      <option value="">Sem subcategoria</option>
      {subcategories.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  );
}

function createEmptyOffer(): OfferCard {
  return { id: Date.now(), name: "", oldPrice: 0, price: 0, image: "", discount: "", category: "", targetPage: "catalogo", targetLabel: "Ver mais" };
}

function createEmptyBestSeller(): ShowcaseCard {
  return { id: Date.now(), name: "", price: 0, image: "", discount: "", category: "", targetPage: "catalogo", targetLabel: "Abrir secao" };
}

function createCustomProduct(): CustomCategoryProduct {
  return { id: Date.now(), name: "", price: 0, image: "", discount: "", category: "", mainCategory: "varas" };
}

function ProductCardEditor({ title, items, onChange, onAdd, withOldPrice }: { title: string; items: Array<OfferCard | ShowcaseCard>; onChange: (items: Array<OfferCard | ShowcaseCard>) => void; onAdd: () => void; withOldPrice?: boolean; }) {
  return (
    <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary">{title}</h4>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">Edite, crie e direcione os cards para qualquer pagina do site.</p>
        </div>
        <button type="button" onClick={onAdd} className="bg-primary text-white px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"><Plus size={16} />Novo card</button>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="border border-primary/10 rounded-3xl p-5 bg-primary/5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Card {index + 1}</p>
              <button type="button" onClick={() => onChange(items.filter((currentItem) => currentItem.id !== item.id))} className="text-accent hover:text-ink transition-colors"><Trash2 size={18} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={item.name} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, name: event.target.value } : currentItem))} placeholder="Nome do card" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={item.category} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, category: event.target.value } : currentItem))} placeholder="Categoria/Subcategoria" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={item.image} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, image: event.target.value } : currentItem))} placeholder="URL da imagem" className="md:col-span-2 border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <ImageInput onFile={(value) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, image: value } : currentItem))} />
              {withOldPrice && "oldPrice" in item && <input type="number" min="0" step="0.01" value={item.oldPrice} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, oldPrice: Number(event.target.value) } : currentItem))} placeholder="Preco antigo" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />}
              <input type="number" min="0" step="0.01" value={item.price} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, price: Number(event.target.value) } : currentItem))} placeholder="Preco" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={item.discount ?? ""} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, discount: event.target.value } : currentItem))} placeholder="Selo de desconto" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={item.targetLabel} onChange={(event) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, targetLabel: event.target.value } : currentItem))} placeholder="Texto do botao" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <PageSelect value={item.targetPage} onChange={(value) => onChange(items.map((currentItem) => currentItem.id === item.id ? { ...currentItem, targetPage: value } : currentItem))} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomProductsEditor({ products, onChange }: { products: CustomCategoryProduct[]; onChange: (products: CustomCategoryProduct[]) => void; }) {
  return (
    <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary">Cards das Categorias e Subcategorias</h4>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">Os cards criados aqui entram nas paginas do menu e nas subcategorias.</p>
        </div>
        <button type="button" onClick={() => onChange([...products, createCustomProduct()])} className="bg-primary text-white px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"><Plus size={16} />Novo produto</button>
      </div>

      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={product.id} className="border border-primary/10 rounded-3xl p-5 bg-primary/5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Produto {index + 1}</p>
              <button type="button" onClick={() => onChange(products.filter((currentProduct) => currentProduct.id !== product.id))} className="text-accent hover:text-ink transition-colors"><Trash2 size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={product.name} onChange={(event) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, name: event.target.value } : currentProduct))} placeholder="Nome do produto" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <CategorySelect value={product.mainCategory} onChange={(value) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, mainCategory: value, category: "" } : currentProduct))} />
              <SubcategorySelect mainCategory={product.mainCategory} value={product.category} onChange={(value) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, category: value } : currentProduct))} />
              <input type="number" min="0" step="0.01" value={product.price} onChange={(event) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, price: Number(event.target.value) } : currentProduct))} placeholder="Preco" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={product.discount ?? ""} onChange={(event) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, discount: event.target.value } : currentProduct))} placeholder="Selo de desconto" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={product.thickness ?? ""} onChange={(event) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, thickness: event.target.value } : currentProduct))} placeholder="Espessura (opcional)" className="border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <input value={product.image} onChange={(event) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, image: event.target.value } : currentProduct))} placeholder="URL da imagem" className="md:col-span-2 border border-primary/10 bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
              <ImageInput onFile={(value) => onChange(products.map((currentProduct) => currentProduct.id === product.id ? { ...currentProduct, image: value } : currentProduct))} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminPanel({ content, onChange, onReset }: AdminPanelProps) {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-3xl border border-primary/5 shadow-xl space-y-5">
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary">Hero Principal</h4>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">Edite textos, imagens e botoes da capa principal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={content.hero.eyebrow} onChange={(event) => onChange({ ...content, hero: { ...content.hero, eyebrow: event.target.value } })} placeholder="Texto superior" className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <input value={content.hero.discountValue} onChange={(event) => onChange({ ...content, hero: { ...content.hero, discountValue: event.target.value } })} placeholder="Destaque numerico" className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <input value={content.hero.titleTop} onChange={(event) => onChange({ ...content, hero: { ...content.hero, titleTop: event.target.value } })} placeholder="Titulo linha 1" className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <input value={content.hero.titleBottom} onChange={(event) => onChange({ ...content, hero: { ...content.hero, titleBottom: event.target.value } })} placeholder="Titulo linha 2" className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <input value={content.hero.backgroundImage} onChange={(event) => onChange({ ...content, hero: { ...content.hero, backgroundImage: event.target.value } })} placeholder="URL da imagem de fundo" className="md:col-span-2 border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <ImageInput onFile={(value) => onChange({ ...content, hero: { ...content.hero, backgroundImage: value } })} />
          <input value={content.hero.featuredImage} onChange={(event) => onChange({ ...content, hero: { ...content.hero, featuredImage: event.target.value } })} placeholder="URL da imagem lateral" className="md:col-span-2 border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <ImageInput onFile={(value) => onChange({ ...content, hero: { ...content.hero, featuredImage: value } })} />
          <textarea value={content.hero.description} onChange={(event) => onChange({ ...content, hero: { ...content.hero, description: event.target.value } })} rows={4} placeholder="Descricao" className="md:col-span-2 border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <input value={content.hero.primaryButtonLabel} onChange={(event) => onChange({ ...content, hero: { ...content.hero, primaryButtonLabel: event.target.value } })} placeholder="Texto do botao principal" className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <PageSelect value={content.hero.primaryButtonTarget} onChange={(value) => onChange({ ...content, hero: { ...content.hero, primaryButtonTarget: value } })} />
          <input value={content.hero.secondaryButtonLabel} onChange={(event) => onChange({ ...content, hero: { ...content.hero, secondaryButtonLabel: event.target.value } })} placeholder="Texto do botao secundario" className="border border-primary/10 bg-primary/5 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary" />
          <PageSelect value={content.hero.secondaryButtonTarget} onChange={(value) => onChange({ ...content, hero: { ...content.hero, secondaryButtonTarget: value } })} />
        </div>
      </section>

      <ProductCardEditor title="Ofertas do Dia" items={content.offers} withOldPrice onAdd={() => onChange({ ...content, offers: [...content.offers, createEmptyOffer()] })} onChange={(items) => onChange({ ...content, offers: items as OfferCard[] })} />
      <ProductCardEditor title="Mais Vendidos" items={content.bestSellers} onAdd={() => onChange({ ...content, bestSellers: [...content.bestSellers, createEmptyBestSeller()] })} onChange={(items) => onChange({ ...content, bestSellers: items as ShowcaseCard[] })} />
      <CustomProductsEditor products={content.customProducts} onChange={(products) => onChange({ ...content, customProducts: products })} />

      <div className="flex flex-wrap gap-4">
        <div className="bg-primary text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl"><Save size={18} />Alteracoes salvas automaticamente no navegador</div>
        <button type="button" onClick={onReset} className="bg-white text-primary px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl border border-primary/10"><RotateCcw size={18} />Restaurar conteudo padrao</button>
      </div>
    </div>
  );
}
