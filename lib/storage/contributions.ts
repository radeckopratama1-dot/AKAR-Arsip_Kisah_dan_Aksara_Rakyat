import { ContributionDraft } from "@/types/contribution";

const DRAFT_KEY = "akar_contribution_draft_v1";

export function getContributionDraft(): ContributionDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveContributionDraft(draft: ContributionDraft): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (err) {
    console.error("Gagal menyimpan draf kontribusi:", err);
  }
}

export function clearContributionDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch (err) {
    console.error("Gagal menghapus draf kontribusi:", err);
  }
}

export function exportDraftAsJSON(draft: ContributionDraft): void {
  if (typeof window === "undefined") return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(draft, null, 2));
  const downloadAnchor = document.createElement("a");
  const fileName = `draf-akar-${draft.titleSu.toLowerCase().replace(/[^a-z0-9]/g, "-") || "kontribusi"}.json`;
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
