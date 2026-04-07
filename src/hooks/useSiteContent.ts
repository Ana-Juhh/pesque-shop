import { useEffect, useState } from "react";

import { defaultSiteContent } from "../data/siteContent";
import type { SiteContent } from "../types/siteContent";

const STORAGE_KEY = "pesque-shop-site-content";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    const storedContent = window.localStorage.getItem(STORAGE_KEY);
    if (!storedContent) {
      return;
    }

    try {
      setContent(JSON.parse(storedContent) as SiteContent);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  return {
    content,
    updateContent: setContent,
    resetContent: () => setContent(defaultSiteContent),
  };
}
