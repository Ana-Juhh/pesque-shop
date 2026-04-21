import { useEffect, useMemo, useState } from "react";
import AdminPanel from "../components/admin/AdminPanel";
import { pb } from "../lib/pocketbase";
import { mapRecordToSiteContent, mapSiteContentToRecord } from "../lib/siteContentMapper";
import type { SiteContent } from "../types/siteContent";
import { defaultSiteContent } from "../data/siteContent";

const COLLECTION_NAME = "site_content";

export default function AdminPage() {
  const fallbackContent = useMemo<SiteContent>(() => defaultSiteContent, []);
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function loadContent() {
      try {
        const records = await pb.collection(COLLECTION_NAME).getList(1, 1);

        if (records.items.length > 0) {
          const record = records.items[0];
          setRecordId(record.id);
          setContent(mapRecordToSiteContent(record as any, fallbackContent));
        } else {
          const created = await pb.collection(COLLECTION_NAME).create(
            mapSiteContentToRecord(fallbackContent)
          );
          setRecordId(created.id);
          setContent(fallbackContent);
        }
      } catch (error) {
        console.error("Erro ao carregar conteúdo do site:", error);
        setMessage("Não foi possível carregar o conteúdo do banco.");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [fallbackContent]);

  async function handleSave(nextContent: SiteContent) {
    setContent(nextContent);

    if (!recordId) return;

    try {
      setSaving(true);
      setMessage("");

      await pb.collection(COLLECTION_NAME).update(
        recordId,
        mapSiteContentToRecord(nextContent)
      );

      setMessage("Conteúdo salvo com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
      setMessage("Erro ao salvar no PocketBase.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!recordId) return;

    try {
      setSaving(true);
      setContent(fallbackContent);

      await pb.collection(COLLECTION_NAME).update(
        recordId,
        mapSiteContentToRecord(fallbackContent)
      );

      setMessage("Conteúdo restaurado com sucesso.");
    } catch (error) {
      console.error("Erro ao restaurar conteúdo:", error);
      setMessage("Erro ao restaurar conteúdo.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm font-bold">Carregando painel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {message ? (
        <div className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm font-bold">
          {message}
        </div>
      ) : null}

      {saving ? (
        <div className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-bold">
          Salvando...
        </div>
      ) : null}

      <AdminPanel
        content={content}
        onChange={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}