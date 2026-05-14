/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

import Account from "./components/Account";
import BestSellers from "./components/BestSellers";
import { CartCheckout } from "./components/CartCheckout";
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
import { useSiteContent } from "./hooks/useSiteContent";
import { pb } from "./lib/pocketbase";

import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import MyAccountPage from "./pages/MyAccountPage";
import PrivacyPage from "./pages/PrivacyPage";
import SearchResultsPage from "./pages/SearchResultsPage";

import type { PageType } from "./types/navigation";
import type { Product } from "./types/shop";

type AppPage = PageType | "login" | "account";

const ADMIN_EMAILS = ["ia@colegiosatelite.com.br"]; // coloque aqui o e-mail admin

function openWhatsApp() {
  window.open("https://wa.me/5511996492175", "_blank");
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [activeSubcategory, setActiveSubcategory] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const cart = useCart();
  const siteContent = useSiteContent();

  const content = siteContent.content;
  const customProducts = content?.customProducts ?? [];

  const productsByPage = useMemo(() => {
    return {
      varas: [
        ...varasProducts,
        ...customProducts.filter((product) => product.mainCategory === "varas"),
      ],
      molinetes: [
        ...molinetesProducts,
        ...customProducts.filter(
          (product) => product.mainCategory === "molinetes"
        ),
      ],
      iscas: [
        ...iscasProducts,
        ...customProducts.filter((product) => product.mainCategory === "iscas"),
      ],
      linhas: [
        ...linhasProducts,
        ...customProducts.filter((product) => product.mainCategory === "linhas"),
      ],
      acessorios: [
        ...acessoriosProducts,
        ...customProducts.filter(
          (product) => product.mainCategory === "acessorios"
        ),
      ],
    };
  }, [customProducts]);

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

    const normalizedQuery = searchQuery.toLowerCase();

    return mergedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.thickness?.toLowerCase().includes(normalizedQuery)
    );
  }, [mergedProducts, searchQuery]);

  if (siteContent.loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-primary font-black uppercase tracking-widest">
        Carregando site...
      </div>
    );
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigate(page: AppPage, subcategory?: string) {
    setCurrentPage(page);
    setActiveSubcategory(subcategory);
    scrollTop();
  }

  function goToLogin() {
    setCurrentPage("login");
    scrollTop();
  }

  function goToAccount() {
    setCurrentPage("account");
    scrollTop();
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setCurrentPage("search");
    scrollTop();
  }

  function handleAddToCart(product: Product) {
    if (!pb.authStore.isValid) {
      setPendingProduct(product);
      goToLogin();
      return;
    }

    cart.addItem(product);
    alert("Produto adicionado ao carrinho!");
  }

  function handleLoginSuccess() {
    const loggedUser = pb.authStore.record as any;

    if (pendingProduct) {
    cart.addItem(pendingProduct);
    setPendingProduct(null);
    alert("Login realizado! Produto adicionado ao carrinho.");
    navigate("home");
    return;
  }

  goToAccount();
}

  function getHeaderCurrentPage(): PageType {
    if (currentPage === "login" || currentPage === "account") {
      return "home";
    }

    return currentPage;
  }

  function renderCurrentPage() {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero content={content.hero} onNavigate={navigate} />

            <Features />

            <DailyOffers
              offers={content.offers}
              onAddToCart={handleAddToCart}
              onNavigate={navigate}
            />

            <BestSellers
              items={content.bestSellers}
              onAddToCart={handleAddToCart}
              onNavigate={navigate}
            />
          </>
        );

      case "login":
        return (
          <LoginPage
            onSuccess={handleLoginSuccess}
            onBack={() => navigate("home")}
          />
        );

      case "account":
  return (
    <MyAccountPage
      onLoginClick={goToLogin}
      onLogoutSuccess={() => navigate("home")}
      onAdminClick={() => navigate("register")}
    />
  );

      case "register":
  return (
    <>
      <section className="bg-paper px-4 pt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-secondary">
              Painel Admin
            </p>

            <h1 className="mt-2 text-2xl md:text-4xl font-black uppercase text-primary">
              Gerenciamento do site
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("account")}
              className="rounded-full bg-white border border-primary/10 px-6 py-3 text-sm font-black text-primary shadow-sm hover:bg-primary/5"
            >
              ← Voltar para pedidos da loja
            </button>

            <button
              type="button"
              onClick={() => navigate("home")}
              className="rounded-full bg-primary px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-primary/90"
            >
              Ver loja
            </button>
          </div>
        </div>
      </section>

      <Account
        content={content}
        onChangeContent={siteContent.updateContent}
        onResetContent={siteContent.resetContent}
      />
    </>
  );

      case "varas":
        return (
          <CategoryPage
            title="Varas de Pesca"
            products={productsByPage.varas}
            activeSubcategory={activeSubcategory}
            onAddToCart={handleAddToCart}
          />
        );

      case "molinetes":
        return (
          <CategoryPage
            title="Molinetes e Carretilhas"
            products={productsByPage.molinetes}
            activeSubcategory={activeSubcategory}
            onAddToCart={handleAddToCart}
          />
        );

      case "iscas":
        return (
          <CategoryPage
            title="Iscas Artificiais"
            products={productsByPage.iscas}
            activeSubcategory={activeSubcategory}
            onAddToCart={handleAddToCart}
          />
        );

      case "linhas":
        return (
          <CategoryPage
            title="Linhas de Pesca"
            products={productsByPage.linhas}
            activeSubcategory={activeSubcategory}
            onAddToCart={handleAddToCart}
          />
        );

      case "acessorios":
        return (
          <CategoryPage
            title="Acessórios"
            products={productsByPage.acessorios}
            activeSubcategory={activeSubcategory}
            onAddToCart={handleAddToCart}
          />
        );

      case "ofertas":
        return (
          <DailyOffers
            offers={content.offers}
            onAddToCart={handleAddToCart}
            onNavigate={navigate}
          />
        );

      case "catalogo":
        return (
          <CategoryPage
            title="Catálogo Completo"
            products={[...allProducts, ...customProducts]}
            onAddToCart={handleAddToCart}
          />
        );

      case "lancamentos":
        return (
          <CategoryPage
            title="Lançamentos & Premium"
            products={premiumProducts}
            onAddToCart={handleAddToCart}
          />
        );

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
            onAddToCart={handleAddToCart}
            onBackHome={() => navigate("home")}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col text-ink">
      <Header
        onNavigate={navigate}
        currentPage={getHeaderCurrentPage()}
        cartCount={cart.count}
        onOpenCart={cart.open}
        onSearch={handleSearch}
        onAccountClick={goToAccount}
      />

      <main className="flex-1">{renderCurrentPage()}</main>

      <Footer onNavigate={navigate} />

      <CartCheckout cart={cart} />

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