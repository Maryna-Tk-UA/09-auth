import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DraftNote = {
  title: string;
  content: string;
  tag: string;
};

type NoteDraftStore = {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
};

const initialDraft = {
  // початкове значенння чорнетки
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft, // об'єкт чорнетки, що містить поля майбутньої нотатки
      setDraft: (note: DraftNote) => set(() => ({ draft: note })), // оновлює чорнетку при зміні будь-якого поля
      clearDraft: () => set(() => ({ draft: initialDraft })), // очищує чорнетку
    }),
    {
      // Ключ у localStorage
      name: "note-draft",
      // Збереження лише властивості draft
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
