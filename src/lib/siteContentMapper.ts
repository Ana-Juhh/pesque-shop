import type { SiteContent } from "../types/siteContent";

type SiteContentRecord = {
  id: string;
  hero?: any;
  offers?: any[];
  bestSellers?: any[];
  customProducts?: any[];
};

export function mapRecordToSiteContent(record: SiteContentRecord, fallback: SiteContent): SiteContent {
  return {
    hero: record.hero ?? fallback.hero,
    offers: Array.isArray(record.offers) ? record.offers : fallback.offers,
    bestSellers: Array.isArray(record.bestSellers) ? record.bestSellers : fallback.bestSellers,
    customProducts: Array.isArray(record.customProducts) ? record.customProducts : fallback.customProducts,
  };
}

export function mapSiteContentToRecord(content: SiteContent) {
  return {
    hero: content.hero,
    offers: content.offers,
    bestSellers: content.bestSellers,
    customProducts: content.customProducts,
  };
}