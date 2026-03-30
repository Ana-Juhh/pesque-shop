/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header, { CategoryType } from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import DailyOffers from "./components/DailyOffers";
import BestSellers from "./components/BestSellers";
import CategoryPage from "./components/CategoryPage";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import Returns from "./components/Returns";
import OrderStatus from "./components/OrderStatus";
import Account from "./components/Account";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: string;
  category: string;
  thickness?: string;
}

const varasProducts: Product[] = [
  { id: 101, name: "Vara Shimano Trevala Carbon 1.80m", price: 849.90, image: "https://images.unsplash.com/photo-1611095777215-99bb5cce883d?auto=format&fit=crop&q=80&w=800", discount: "15% OFF", category: "Vara de Carbono" },
  { id: 102, name: "Vara Telescópica Albatroz 2.40m", price: 129.90, image: "https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?auto=format&fit=crop&q=80&w=800", category: "Vara Telescópica" },
  { id: 103, name: "Vara Marine Sports Giant CatFish 2.10m", price: 449.90, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Vara de Molinete" },
  { id: 104, name: "Vara Shimano Curado Casting 2.10m", price: 979.90, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Vara de Carretilha" },
  { id: 105, name: "Vara de Pesca Marítima Surf 3.00m", price: 399.90, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800", category: "Vara de Carbono" },
];

const molinetesProducts: Product[] = [
  { id: 201, name: "Molinete Shimano FX 2500", price: 179.90, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", discount: "40% OFF", category: "Molinetes" },
  { id: 202, name: "Carretilha Marine Sports Titan 12000", price: 349.90, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Baixo" },
  { id: 203, name: "Molinete Daiwa Sweepfire 4000", price: 159.90, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Molinetes" },
  { id: 204, name: "Carretilha Shimano Curado K", price: 899.90, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Baixo" },
  { id: 205, name: "Carretilha Penn Warfare Perfil Alto", price: 1150.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Alto" },
  { id: 206, name: "Carretilha Abu Garcia Revo Beast", price: 1699.90, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", category: "Carretilhas Perfil Baixo" },
];

const iscasProducts: Product[] = [
  { id: 301, name: "Isca de Superfície Zara Spook", price: 45.90, image: "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=800", category: "Iscas de Superfície" },
  { id: 302, name: "Isca Meia Água Inna 90 Marine", price: 39.90, image: "https://images.unsplash.com/photo-1583244532629-1f3c02824c3c?auto=format&fit=crop&q=80&w=800", category: "Iscas Meia Água" },
  { id: 303, name: "Isca de Fundo Jig Head 15g", price: 15.90, image: "https://images.unsplash.com/photo-1583244532643-3ba99657636d?auto=format&fit=crop&q=80&w=800", category: "Iscas de Fundo" },
  { id: 304, name: "Isca Soft Camarão Articulado", price: 22.50, image: "https://images.unsplash.com/photo-1583244532610-2ca22117f4ae?auto=format&fit=crop&q=80&w=800", category: "Iscas Soft" },
];

const linhasProducts: Product[] = [
  { id: 401, name: "Linha Monofilamento Araty 0.30mm", price: 25.90, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", thickness: "0.30mm", category: "Linhas Monofilamentos" },
  { id: 402, name: "Linha Multifilamento Vexter 0.25mm", price: 89.90, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", thickness: "0.25mm", category: "Linhas Multifilamentos" },
  { id: 403, name: "Linha Multifilamento 8X 0.40mm", price: 120.00, image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800", thickness: "0.40mm", category: "Linhas Multifilamentos" },
];

const acessoriosProducts: Product[] = [
  { id: 501, name: "Alicate de Contenção com Balança", price: 65.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Alicates" },
  { id: 502, name: "Caixa de Pesca Plano 3 Bandejas", price: 189.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Caixas e Estojos" },
  { id: 503, name: "Bolsa de Pesca G Marine Sports", price: 245.00, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800", category: "Bolsas" },
];

const allProducts = [...varasProducts, ...molinetesProducts, ...iscasProducts, ...linhasProducts, ...acessoriosProducts];

export type PageType = CategoryType | "ofertas" | "contato" | "faq" | "trocas" | "status" | "search" | "sobre" | "privacidade" | "catalogo" | "lancamentos";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(undefined);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = (page: PageType, subcategory?: string) => {
    setCurrentPage(page);
    setActiveSubcategory(subcategory);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      (p.thickness && p.thickness.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery]);

  const updateCartQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeCartItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const lancamentosProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => b.price - a.price).slice(0, 8);
  }, [allProducts]);

  const handleWhatsApp = () => {
    window.open("https://wa.me/5511996492175", "_blank");
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col text-ink">
      <Header 
        onNavigate={navigate} 
        currentPage={currentPage} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={handleSearch}
      />
      
      <main className="flex-1">
        {currentPage === "home" && (
          <>
            <Hero onNavigate={navigate} onAddToCart={handleAddToCart} />
            <Features />
            <DailyOffers onAddToCart={handleAddToCart} />
            <BestSellers onAddToCart={handleAddToCart} onNavigate={navigate} />
          </>
        )}
        
        {currentPage === "register" && <Account />}
        
        {currentPage === "varas" && (
          <CategoryPage title="Varas de Pesca" products={varasProducts} activeSubcategory={activeSubcategory} onAddToCart={handleAddToCart} />
        )}
        
        {currentPage === "molinetes" && (
          <CategoryPage title="Molinetes e Carretilhas" products={molinetesProducts} activeSubcategory={activeSubcategory} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "iscas" && (
          <CategoryPage title="Iscas Artificiais" products={iscasProducts} activeSubcategory={activeSubcategory} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "linhas" && (
          <CategoryPage title="Linhas de Pesca" products={linhasProducts} activeSubcategory={activeSubcategory} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "acessorios" && (
          <CategoryPage title="Acessórios" products={acessoriosProducts} activeSubcategory={activeSubcategory} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "ofertas" && (
          <DailyOffers onAddToCart={handleAddToCart} />
        )}

        {currentPage === "catalogo" && (
          <CategoryPage title="Catálogo Completo" products={allProducts} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "lancamentos" && (
          <CategoryPage title="Lançamentos & Premium" products={lancamentosProducts} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "sobre" && (
          <div className="max-w-4xl mx-auto px-4 py-24">
            <h2 className="text-5xl font-black text-primary uppercase tracking-tighter italic mb-12 text-center">Nossa História</h2>
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-primary/5 leading-relaxed text-lg text-ink">
              <p className="mb-6">
                A Pesque Shop nasceu da paixão de um verdadeiro explorador das águas brasileiras. Durante anos, percorrendo os rios mais remotos da Amazônia e os pesqueiros mais técnicos do Sudeste, nosso fundador sempre utilizou equipamentos de ponta.
              </p>
              <p className="mb-6">
                Onde quer que estivesse, despertava o interesse de outros pescadores que admiravam a precisão de seus arremessos e a resistência de suas varas. No entanto, a reclamação era sempre a mesma: <span className="italic text-secondary font-bold">"Essas preciosidades são caras demais no Brasil"</span>.
              </p>
              <p className="mb-6">
                Foi ouvindo esse clamor que a Pesque Shop foi idealizada. Nossa missão é clara: democratizar o acesso a equipamentos de excelência mundial, trazendo o que há de melhor no mercado internacional com o preço justo que o pescador brasileiro merece.
              </p>
              <p className="font-bold text-primary">
                Qualidade sem concessões, preço sem abusos. Essa é a nossa promessa para cada pescador que confia em nossa curadoria.
              </p>
            </div>
          </div>
        )}

        {currentPage === "privacidade" && (
          <div className="max-w-4xl mx-auto px-4 py-24">
            <h2 className="text-5xl font-black text-primary uppercase tracking-tighter italic mb-12 text-center">Política de Privacidade</h2>
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-primary/5 leading-relaxed text-sm text-ink space-y-6">
              <p>A Pesque Shop tem o compromisso com a transparência, a privacidade e a segurança dos dados de seus clientes durante todo o processo de interação com nosso site.</p>
              
              <h3 className="font-black uppercase tracking-widest text-primary">1. Coleta de Dados</h3>
              <p>Para que os dados permaneçam intactos, nós aconselhamos que você nunca compartilhe sua senha com terceiros, mesmo que sejam amigos ou parentes.</p>
              
              <h3 className="font-black uppercase tracking-widest text-primary">2. Uso de Informações</h3>
              <p>Seus dados pessoais são peça fundamental para que seu pedido chegue em segurança, na sua casa, de acordo com nosso prazo de entrega. Nós utilizamos seus dados para: faturamento, entrega, e comunicação sobre o status do seu pedido.</p>
              
              <h3 className="font-black uppercase tracking-widest text-primary">3. Segurança</h3>
              <p>Utilizamos tecnologias de ponta para garantir que seus dados não sejam acessados por pessoas não autorizadas. Nosso site possui certificado SSL, garantindo que toda transação financeira seja criptografada.</p>
              
              <h3 className="font-black uppercase tracking-widest text-primary">4. Cookies</h3>
              <p>Utilizamos cookies para proporcionar uma melhor experiência em nosso site e viabilizar recursos personalizados, como recomendações de produtos e publicidade direcionada.</p>
              
              <p className="text-xs opacity-60 italic">Esta política foi atualizada em conformidade com a LGPD (Lei Geral de Proteção de Dados).</p>
            </div>
          </div>
        )}

        {currentPage === "contato" && <ContactUs />}
        {currentPage === "faq" && <FAQ />}
        {currentPage === "trocas" && <Returns />}
        {currentPage === "status" && <OrderStatus />}

        {currentPage === "search" && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-primary/10 pb-8 gap-4">
              <h2 className="text-4xl font-black text-primary uppercase tracking-tighter italic">
                Resultados para: <span className="text-secondary">"{searchQuery}"</span>
              </h2>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm border border-primary/5">
                {filteredProducts.length} Produtos encontrados
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
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
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Preço</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-black text-primary">R$</span>
                            <span className="text-2xl font-black text-primary tracking-tighter">{product.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(product)}
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
                  Não encontramos nenhum produto com o termo <span className="text-secondary">"{searchQuery}"</span>. 
                  Tente buscar por palavras mais genéricas ou navegue pelo menu.
                </p>
                <button 
                  onClick={() => setCurrentPage("home")}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl transform active:scale-95"
                >
                  Voltar para a página inicial
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer onNavigate={navigate} />

      {isCartOpen && (
        <Cart 
          items={cartItems} 
          onUpdateQuantity={updateCartQuantity} 
          onRemoveItem={removeCartItem} 
          onClose={() => setIsCartOpen(false)} 
        />
      )}

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsApp}
        className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] transition-all group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-primary/5">
          Fale Conosco
        </span>
      </motion.button>
    </div>
  );
}



