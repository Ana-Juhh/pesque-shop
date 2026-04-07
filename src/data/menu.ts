import type { CategoryType } from "../types/navigation";

export interface MenuItem {
  id: CategoryType | "ofertas";
  label: string;
  subcategories?: string[];
}

export const menuItems: MenuItem[] = [
  { id: "home", label: "Home" },
  {
    id: "varas",
    label: "Varas",
    subcategories: ["Vara de Carbono", "Vara Telescopica", "Vara de Molinete", "Vara de Carretilha"],
  },
  {
    id: "molinetes",
    label: "Molinetes e Carretilhas",
    subcategories: ["Carretilhas Perfil Alto", "Carretilhas Perfil Baixo", "Molinetes"],
  },
  {
    id: "iscas",
    label: "Iscas Artificiais",
    subcategories: ["Iscas de Superficie", "Iscas Meia Agua", "Iscas de Fundo", "Iscas Soft"],
  },
  {
    id: "linhas",
    label: "Linhas",
    subcategories: ["Linhas Monofilamentos", "Linhas Multifilamentos"],
  },
  {
    id: "acessorios",
    label: "Acessorios",
    subcategories: ["Alicates", "Snaps e Giradores", "Caixas e Estojos", "Bolsas", "Lanternas", "Vestuario", "Boias", "Anzois", "Chumbo", "Anteninhas", "Capas de Chuva"],
  },
  { id: "ofertas", label: "Ofertas" },
];
