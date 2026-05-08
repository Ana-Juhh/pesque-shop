import React, { useEffect, useState } from "react";
import type { SiteContent } from "../types/siteContent";
import AdminPanel from "../components/admin/AdminPanel";

interface AccountProps {
  content: SiteContent;
  onChangeContent: (content: SiteContent) => Promise<boolean | void> | boolean | void;
  onResetContent: () => Promise<void> | void;
}

export default function Account({
  content,
  onChangeContent,
  onResetContent,
}: AccountProps) {
  const [draftContent, setDraftContent] = useState<SiteContent>(content);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "dirty" | "saving" | "saved" | "error"
  >("idle");

  // Sempre sincroniza quando vem do banco
  useEffect(() => {
    setDraftContent(content);
  }, [content]);

  const hasUnsavedChanges =
    JSON.stringify(draftContent) !== JSON.stringify(content);

  async function handleSaveAdminChanges() {
    setSaveStatus("saving");

    try {
      const result = await onChangeContent(draftContent);

      if (result === false) {
        setSaveStatus("error");
        return;
      }

      setSaveStatus("saved");

      setTimeout(() => {
        setSaveStatus("idle");
      }, 2500);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setSaveStatus("error");
    }
  }

  async function handleResetAdminChanges() {
    await onResetContent();
    setDraftContent(content);
    setSaveStatus("idle");
  }

  return (
    <div className="min-h-screen bg-paper text-ink px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* STATUS + BOTÕES */}
        <div className="bg-white p-5 rounded-3xl shadow-xl border border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Status das alterações
            </p>

           <p
  className={[
    "text-sm font-black mt-1 transition-all",
    saveStatus === "saved"
      ? "text-green-600"
      : saveStatus === "error"
      ? "text-red-500"
      : hasUnsavedChanges
      ? "text-yellow-600"
      : "text-primary",
  ].join(" ")}
>
  {saveStatus === "saving" && "Salvando alterações..."}

  {saveStatus === "saved" &&
    "Alterações salvas com sucesso."}

  {saveStatus === "error" &&
    "Não foi possível salvar as alterações."}

  {saveStatus === "idle" &&
    !hasUnsavedChanges &&
    "Tudo salvo."}

  {hasUnsavedChanges &&
    saveStatus !== "saving" &&
    "Existem alterações pendentes."}
</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleResetAdminChanges}
              className="bg-white text-primary px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-primary/10 shadow-md"
            >
              Descartar
            </button>

            <button
              type="button"
              onClick={handleSaveAdminChanges}
              disabled={!hasUnsavedChanges || saveStatus === "saving"}
              className="bg-primary disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-md"
            >
              {saveStatus === "saving" ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </div>

        {/* ADMIN PANEL */}
        <AdminPanel
          content={draftContent}
          onChange={(nextContent) => {
            setDraftContent(nextContent);
            setSaveStatus("dirty");
          }}
          onReset={handleResetAdminChanges}
        />
      </div>
    </div>
  );
}