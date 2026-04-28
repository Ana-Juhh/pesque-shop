import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";
import { defaultSiteContent } from "../data/siteContent";

const COLLECTION = "site_content";

export function useSiteContent() {
  const [content, setContent] = useState(defaultSiteContent);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const result = await pb.collection(COLLECTION).getList(1, 1);

        if (result.items.length > 0) {
          const record = result.items[0];

          setRecordId(record.id);

          setContent({
            hero: record.hero || defaultSiteContent.hero,
            offers: record.offers || defaultSiteContent.offers,
            bestSellers: record.bestSellers || defaultSiteContent.bestSellers,
            customProducts: record.customProducts || defaultSiteContent.customProducts,
            pages: record.pages || defaultSiteContent.pages,
          });
        } else {
          const created = await pb.collection(COLLECTION).create(defaultSiteContent);

          setRecordId(created.id);
          setContent(defaultSiteContent);
        }
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
    setContent(newContent);

    if (!recordId) return;

    try {
      await pb.collection(COLLECTION).update(recordId, newContent);
      console.log("Salvo no PocketBase ✅");
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
    }
  }

  async function resetContent() {
    setContent(defaultSiteContent);

    if (!recordId) return;

    try {
      await pb.collection(COLLECTION).update(recordId, defaultSiteContent);
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