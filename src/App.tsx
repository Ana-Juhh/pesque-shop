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
import DailyOffers from "./components/DailyOffers";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

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
import { useSiteContent } from "./hooks/useSiteContent";

import SearchResultsPage from "./pages/SearchResultsPage";
import StaticContentPage from "./pages/StaticContentPage";

import type { PageType } from "./types/navigation";

function openWhatsApp() {
  window.open("https://wa.me/5511996492175", "_blank");
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const cart = useCart();
  const siteContent = useSiteContent();

  const productsByPage = useMemo(() => {
    const customProducts = siteContent.content.customProducts;

    return {
      varas: [
        ...varasProducts,
        ...customProducts.filter((p) => p.mainCategory === "varas"),
      ],
      molinetes: [
        ...molinetesProducts,
        ...customProducts.filter((p) => p.mainCategory === "molinetes"),
      ],
      iscas: [
        ...iscasProducts,
        ...customProducts.filter((p) => p.mainCategory === "iscas"),
      ],
      linhas: [
        ...linhasProducts,
        ...customProducts.filter((p) => p.mainCategory === "linhas"),
      ],
      acessorios: [
        ...acessoriosProducts,
        ...customProducts.filter((p) => p.mainCategory === "acessorios"),
      ],
    };
  }, [siteContent.content.customProducts]);

  const mergedProducts = useMemo(
    () => [
      ...productsByPage.varas,
      ...productsByPage.molinetes,
      ...productsByPage.iscas,
      ...productsByPage.linhas,
      ...productsByPage.acessorios,
    ],
    [productsByPage]
  );

  const premiumProducts = useMemo(
    () =>
      [...mergedProducts]
        .sort((a, b) => b.price - a.price)
        .slice(0, Math.max(8, lancamentosProducts.length)),
    [mergedProducts]
  );

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];

    const q = searchQuery.toLowerCase();

    return mergedProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.thickness?.toLowerCase().includes(q)
    );
  }, [mergedProducts, searchQuery]);

  // Check loading state AFTER all hooks
  if (siteContent.loading || !siteContent.content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-primary font-black uppercase tracking-widest">
        Carregando site...
      </div>
    );
  }

  const navigate = (page: PageType, sub?: string) => {
    setCurrentPage(page);
    setActiveSubcategory(sub);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage("search");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero content={siteContent.content.hero} onNavigate={navigate} />
            <Features />
            <DailyOffers
              offers={siteContent.content.offers}
              onAddToCart={cart.addItem}
              onNavigate={navigate}
            />
            <BestSellers
              items={siteContent.content.bestSellers}
              onAddToCart={cart.addItem}
              onNavigate={navigate}
            />
          </>
        );

      case "register":
        return (
          <Account
            content={siteContent.content}
            onChangeContent={siteContent.updateContent}
            onResetContent={siteContent.resetContent}
          />
        );

      case "varas":
        return (
          <CategoryPage
            title="Varas de Pesca"
            products={productsByPage.varas}
            activeSubcategory={activeSubcategory}
            onAddToCart={cart.addItem}
          />
        );

      case "molinetes":
        return (
          <CategoryPage
            title="Molinetes"
            products={productsByPage.molinetes}
            activeSubcategory={activeSubcategory}
            onAddToCart={cart.addItem}
          />
        );

      case "iscas":
        return (
          <CategoryPage
            title="Iscas"
            products={productsByPage.iscas}
            activeSubcategory={activeSubcategory}
            onAddToCart={cart.addItem}
          />
        );

      case "linhas":
        return (
          <CategoryPage
            title="Linhas"
            products={productsByPage.linhas}
            activeSubcategory={activeSubcategory}
            onAddToCart={cart.addItem}
          />
        );

      case "acessorios":
        return (
          <CategoryPage
            title="Acessorios"
            products={productsByPage.acessorios}
            activeSubcategory={activeSubcategory}
            onAddToCart={cart.addItem}
          />
        );

      case "catalogo":
        return (
          <CategoryPage
            title="Catalogo"
            products={[...allProducts, ...siteContent.content.customProducts]}
            onAddToCart={cart.addItem}
          />
        );

      case "lancamentos":
        return (
          <CategoryPage
            title="Lancamentos"
            products={premiumProducts}
            onAddToCart={cart.addItem}
          />
        );

      case "ofertas":
        return (
          <DailyOffers
            offers={siteContent.content.offers}
            onAddToCart={cart.addItem}
            onNavigate={navigate}
          />
        );

      case "search":
        return (
          <SearchResultsPage
            products={filteredProducts}
            query={searchQuery}
            onAddToCart={cart.addItem}
            onBackHome={() => navigate("home")}
          />
        );

      // 🔥 AGORA EDITÁVEL PELO ADMIN
      case "sobre":
        return <StaticContentPage page={siteContent.content.pages.sobre} />;

      case "privacidade":
        return <StaticContentPage page={siteContent.content.pages.privacidade} />;

      case "contato":
        return <StaticContentPage page={siteContent.content.pages.contato} />;

      case "faq":
        return <StaticContentPage page={siteContent.content.pages.faq} />;

      case "trocas":
        return <StaticContentPage page={siteContent.content.pages.trocas} />;

      case "status":
        return <StaticContentPage page={siteContent.content.pages.status} />;

      case "termos":
        return <StaticContentPage page={siteContent.content.pages.termos} />;

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

      <main className="flex-1">{renderPage()}</main>

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
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-xl"
      >
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
}