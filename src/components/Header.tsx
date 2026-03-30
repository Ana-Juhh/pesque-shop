import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, User, Menu, Truck, ShieldCheck, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

export type CategoryType = "home" | "register" | "varas" | "molinetes" | "iscas" | "linhas" | "acessorios";

interface HeaderProps {
  onNavigate: (page: any, subcategory?: string) => void;
  currentPage: string;
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ onNavigate, currentPage, cartCount, onOpenCart, onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { 
      id: "varas", 
      label: "Varas",
      subcategories: ["Vara de Carbono", "Vara Telescópica", "Vara de Molinete", "Vara de Carretilha"]
    },
    { 
      id: "molinetes", 
      label: "Molinetes e Carretilhas",
      subcategories: ["Carretilhas Perfil Alto", "Carretilhas Perfil Baixo", "Molinetes"]
    },
    { 
      id: "iscas", 
      label: "Iscas Artificiais",
      subcategories: ["Iscas de Superfície", "Iscas Meia Água", "Iscas de Fundo", "Iscas Soft"]
    },
    { 
      id: "linhas", 
      label: "Linhas",
      subcategories: ["Linhas Monofilamentos", "Linhas Multifilamentos"]
    },
    { 
      id: "acessorios", 
      label: "Acessórios",
      subcategories: ["Alicates", "Snaps e Giradores", "Caixas e Estojos", "Bolsas", "Lanternas", "Vestuário", "Boias", "Anzois", "Chumbo", "Anteninhas", "Capas de Chuva"]
    },
    { id: "ofertas", label: "Ofertas" },
  ];

  return (
    <header className="w-full font-sans sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-paper py-2 border-b border-primary/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] text-primary font-black uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <MessageCircle size={12} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-secondary transition-colors">WhatsApp (11) 99649-2175</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={12} className="text-primary" />
              <span>Envio Rápido para Todo Brasil</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-primary" />
              <span>Compra 100% Segura</span>
            </div>
            <button 
              onClick={() => onNavigate("register")}
              className="flex items-center gap-2 hover:text-secondary transition-colors group"
            >
              <User size={12} className="text-primary group-hover:scale-110 transition-transform" />
              <span>Minha Conta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-4 shadow-md border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-8">
          {/* Logo - Full Image as requested */}
          <div 
            className="flex items-center cursor-pointer group shrink-0" 
            onClick={() => onNavigate("home")}
          >
            <div className="relative w-24 md:w-24 transition-all group-hover:scale-105">
              <img 
                src="public/img/logo.png" 
                alt="Pesque Shop Logo" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
              {/* Note: In a real scenario, this would be the uploaded logo.png */}
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative group"
          >
            <input 
              type="text" 
              placeholder="O que você procura?" 
              className="w-full border-2 border-primary/10 rounded-2xl py-4 px-8 pr-16 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-sm font-bold text-ink placeholder:text-gray-300 shadow-inner transition-all"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-primary hover:text-secondary transition-all transform hover:scale-110">
              <Search size={24} strokeWidth={3} />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-6 shrink-0">
            <button className="md:hidden text-primary hover:text-secondary transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={32} />
            </button>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={onOpenCart}
                className="relative text-primary hover:text-secondary transition-all transform hover:scale-110 group"
              >
                <div className="absolute -inset-4 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <ShoppingCart size={32} className="relative z-10" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xl animate-bounce z-20">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-primary text-white hidden md:block border-t border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-10 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => onNavigate(item.id as any)}
                  className={cn(
                    "flex items-center gap-2 hover:text-highlight transition-all py-1 relative",
                    currentPage === item.id && "text-highlight"
                  )}
                >
                  {item.label} 
                  {item.subcategories && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                  {currentPage === item.id && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-highlight rounded-full"
                    />
                  )}
                </button>

                {/* Dropdown */}
                {item.subcategories && activeDropdown === item.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-ink shadow-2xl border border-primary/5 min-w-[240px] py-4 rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-[100]">
                    <div className="grid grid-cols-1 gap-1">
                      {item.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => onNavigate(item.id as CategoryType, sub)}
                          className="w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all border-l-4 border-transparent hover:border-primary"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-900 text-white p-4 absolute w-full z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col gap-4 text-sm font-bold uppercase">
            {menuItems.map((item) => (
              <li key={item.id} className="border-b border-green-800 pb-2">
                <div 
                  className="flex justify-between items-center"
                  onClick={() => {
                    if (!item.subcategories) {
                      onNavigate(item.id as CategoryType);
                      setIsMenuOpen(false);
                    } else {
                      setActiveDropdown(activeDropdown === item.id ? null : item.id);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.subcategories && <ChevronDown size={16} className={cn("transition-transform", activeDropdown === item.id && "rotate-180")} />}
                </div>
                {item.subcategories && activeDropdown === item.id && (
                  <ul className="mt-2 ml-4 flex flex-col gap-2 text-xs font-normal normal-case text-green-100">
                    {item.subcategories.map((sub) => (
                      <li 
                        key={sub} 
                        onClick={() => {
                          onNavigate(item.id as CategoryType, sub);
                          setIsMenuOpen(false);
                        }}
                        className="py-1"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li onClick={() => { onNavigate("register"); setIsMenuOpen(false); }} className="pt-2">Minha Conta</li>
          </ul>
        </div>
      )}
    </header>
  );
}

