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
        const result = await pb.collection(COLLECTION).getList(1, 1, {
        sort: "-updated",
      });;

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
  if (!recordId) return false;

  try {
    const saved = await pb.collection(COLLECTION).update(recordId, newContent);

    setContent({
      hero: saved.hero || defaultSiteContent.hero,
      offers: saved.offers || defaultSiteContent.offers,
      bestSellers: saved.bestSellers || defaultSiteContent.bestSellers,
      customProducts: saved.customProducts || defaultSiteContent.customProducts,
      pages: saved.pages || defaultSiteContent.pages,
    });

    return true;
  } catch (error) {
    console.error("Erro ao salvar conteúdo:", error);
    return false;
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