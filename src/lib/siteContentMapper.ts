import { defaultSiteContent } from "../data/siteContent";

export function mapSiteContent(record: any) {
  if (!record) return defaultSiteContent;

  return {
    hero: record.hero ?? defaultSiteContent.hero,
    offers: record.offers ?? defaultSiteContent.offers,
    bestSellers: record.bestSellers ?? defaultSiteContent.bestSellers,
    customProducts: record.customProducts ?? defaultSiteContent.customProducts,

    // 🔥 AQUI ESTAVA FALTANDO
    pages: record.pages ?? defaultSiteContent.pages,
  };
}