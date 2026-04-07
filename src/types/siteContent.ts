import type { CategoryType, PageType } from "./navigation";
import type { Product } from "./shop";

export interface HeroContent {
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  discountValue: string;
  discountLabel: string;
  primaryButtonLabel: string;
  primaryButtonTarget: PageType;
  secondaryButtonLabel: string;
  secondaryButtonTarget: PageType;
  backgroundImage: string;
  featuredImage: string;
}

export interface OfferCard extends Product {
  oldPrice: number;
  targetPage: PageType;
  targetLabel: string;
}

export interface ShowcaseCard extends Product {
  targetPage: PageType;
  targetLabel: string;
}

export interface SiteContent {
  hero: HeroContent;
  offers: OfferCard[];
  bestSellers: ShowcaseCard[];
  customProducts: CustomCategoryProduct[];
}

export interface CustomCategoryProduct extends Product {
  mainCategory: Exclude<CategoryType, "home" | "register">;
}
