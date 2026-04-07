/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

import Account from "./components/Account";
import BestSellers from "./components/BestSellers";
import Cart from "./components/Cart";
import CategoryPage from "./components/CategoryPage";
import ContactUs from "./components/ContactUs";
import DailyOffers from "./components/DailyOffers";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OrderStatus from "./components/OrderStatus";
import Returns from "./components/Returns";
import {
  acessoriosProducts,
  allProducts,
  iscasProducts,
  lancamentosProducts,
  linhasProducts,
  molinetesProducts,
  varasProducts,
} from "./data/products";
import { useCart } from "./hooks/useCart";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import type { PageType } from "./types/navigation";

function openWhatsApp() {
  window.open("https://wa.me/5511996492175", "_blank");
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useCart();

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    const normalizedQuery = searchQuery.toLowerCase();

    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.thickness?.toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero onNavigate={navigate} onAddToCart={cart.addItem} />
            <Features />
            <DailyOffers onAddToCart={cart.addItem} />
            <BestSellers onAddToCart={cart.addItem} onNavigate={navigate} />
          </>
        );
      case "register":
        return <Account />;
      case "varas":
        return <CategoryPage title="Varas de Pesca" products={varasProducts} activeSubcategory={activeSubcategory} onAddToCart={cart.addItem} />;
      case "molinetes":
        return <CategoryPage title="Molinetes e Carretilhas" products={molinetesProducts} activeSubcategory={activeSubcategory} onAddToCart={cart.addItem} />;
      case "iscas":
        return <CategoryPage title="Iscas Artificiais" products={iscasProducts} activeSubcategory={activeSubcategory} onAddToCart={cart.addItem} />;
      case "linhas":
        return <CategoryPage title="Linhas de Pesca" products={linhasProducts} activeSubcategory={activeSubcategory} onAddToCart={cart.addItem} />;
      case "acessorios":
        return <CategoryPage title="AcessÃ³rios" products={acessoriosProducts} activeSubcategory={activeSubcategory} onAddToCart={cart.addItem} />;
      case "ofertas":
        return <DailyOffers onAddToCart={cart.addItem} />;
      case "catalogo":
        return <CategoryPage title="CatÃ¡logo Completo" products={allProducts} onAddToCart={cart.addItem} />;
      case "lancamentos":
        return <CategoryPage title="LanÃ§amentos & Premium" products={lancamentosProducts} onAddToCart={cart.addItem} />;
      case "sobre":
        return <AboutPage />;
      case "privacidade":
        return <PrivacyPage />;
      case "contato":
        return <ContactUs />;
      case "faq":
        return <FAQ />;
      case "trocas":
        return <Returns />;
      case "status":
        return <OrderStatus />;
      case "search":
        return (
          <SearchResultsPage
            products={filteredProducts}
            query={searchQuery}
            onAddToCart={cart.addItem}
            onBackHome={() => navigate("home")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col text-ink">
      <Header
        onNavigate={navigate}
        currentPage={currentPage}
        cartCount={cart.count}
        onOpenCart={cart.open}
        onSearch={handleSearch}
      />

      <main className="flex-1">{renderCurrentPage()}</main>

      <Footer onNavigate={navigate} />

      {cart.isOpen && (
        <Cart
          items={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onClose={cart.close}
        />
      )}

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openWhatsApp}
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
