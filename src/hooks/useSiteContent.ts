import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import { defaultCategoryProducts, defaultSiteContent } from "../data/siteContent";
import type { CustomCategoryProduct, SiteContent } from "../types/siteContent";

const COLLECTION = "site_content";

function mergeDefaultCategoryProducts(products: CustomCategoryProduct[]) {
  const existingIds = new Set(products.map((product) => product.id));
  const missingDefaultProducts = defaultCategoryProducts.filter(
    (product) => !existingIds.has(product.id)
  );

  return [...products, ...missingDefaultProducts];
}

function migrateContent(content: SiteContent): SiteContent {
  if (content.catalogSeeded && content.customProducts.length > 0) {
    return content;
  }

  return {
    ...content,
    catalogSeeded: true,
    customProducts: mergeDefaultCategoryProducts(content.customProducts ?? []),
  };
}

function mapRecordToContent(record: any) {
  return migrateContent({
    catalogSeeded: record.catalogSeeded ?? false,
    hero: record.hero || defaultSiteContent.hero,
    offers: record.offers || defaultSiteContent.offers,
    bestSellers: record.bestSellers || defaultSiteContent.bestSellers,
    customProducts: record.customProducts || defaultSiteContent.customProducts,
    pages: record.pages || defaultSiteContent.pages,
  });
}

function toPocketBasePayload(content: SiteContent) {
  const { catalogSeeded, ...payload } = content;
  return payload;
}

export function useSiteContent() {
  const [content, setContent] = useState(defaultSiteContent);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function getLatestRecord() {
    const result = await pb.collection(COLLECTION).getList(1, 1, {
      sort: "-updated",
    });

    return result.items[0] ?? null;
  }

  useEffect(() => {
    async function loadContent() {
      try {
        const record = await getLatestRecord();

        if (!record) {
          console.error("Nenhum registro encontrado em site_content.");
          setContent(defaultSiteContent);
          return;
        }

        setRecordId(record.id);
        setContent(mapRecordToContent(record));
      } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
        setContent(defaultSiteContent);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  async function updateContent(newContent: typeof defaultSiteContent) {
    try {
      let currentRecordId = recordId;

      if (!currentRecordId) {
        const latestRecord = await getLatestRecord();

        if (!latestRecord) {
          console.error("Nenhum registro encontrado para atualizar.");
          return false;
        }

        currentRecordId = latestRecord.id;
        setRecordId(latestRecord.id);
      }

      const saved = await pb
        .collection(COLLECTION)
        .update(currentRecordId, toPocketBasePayload(newContent));

      setContent(mapRecordToContent(saved));
      setRecordId(saved.id);

      return true;
    } catch (error: any) {
      console.error("Erro ao salvar conteúdo:", error);

      try {
        const latestRecord = await getLatestRecord();

        if (!latestRecord) return false;

        const saved = await pb
          .collection(COLLECTION)
          .update(latestRecord.id, toPocketBasePayload(newContent));

        setContent(mapRecordToContent(saved));
        setRecordId(saved.id);

        return true;
      } catch (retryError) {
        console.error("Erro ao tentar salvar novamente:", retryError);
        return false;
      }
    }
  }

  async function resetContent() {
    try {
      const latestRecord = await getLatestRecord();

      if (!latestRecord) return;

      const saved = await pb
        .collection(COLLECTION)
        .update(latestRecord.id, toPocketBasePayload(defaultSiteContent));

      setRecordId(saved.id);
      setContent(mapRecordToContent(saved));
    } catch (error) {
      console.error("Erro ao resetar conteúdo:", error);
    }
  }

  return {
    content,
    updateContent,
    resetContent,
    loading,
  };
}
