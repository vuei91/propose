import { IContent, IPage } from "@/types";
import { create } from "zustand";

interface IMode {
  mode: "VIEW" | "EDIT";
  toggleMode: () => void;
}

export const useModeState = create<IMode>((set) => ({
  mode: "VIEW",
  toggleMode: () => set((state: IMode) => ({ mode: state.mode === "EDIT" ? "VIEW" : "EDIT" })),
}));

interface IPageState {
  pages: IPage[];
  setPages: (pages: IPage[]) => void;
  addPage: (page: IPage) => void;
  removePage: (page: number) => void;
  modfityPage: (id: number, data: Partial<IPage>) => void;
  addContent: (content: IContent, page: number) => void;
  removeContent: (id: number) => void;
  modifyContent: (id: number, data: Partial<IContent>) => void;
}

export const usePageState = create<IPageState>((set, get) => ({
  pages: [],
  setPages: (pages: IPage[]) => set(() => ({ pages })),
  setContents: (pages: IPage[]) => set(() => ({ pages })),
  addContent: (newContent: IContent, page: number) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.page === page ? { ...p, contents: [...p.contents, newContent] } : p)),
    })),
  removeContent: (id: number) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        contents: page.contents.filter((content) => content.id !== id),
      })),
    })),
  modifyContent: (id: number, data: Partial<IContent>) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        contents: page.contents.map((content) => (content.id === id ? { ...content, ...data } : content)),
      })),
    })),
  addPage: (page: IPage) => set((state) => ({ pages: [...state.pages, page] })),
  removePage: (page: number) => set((state) => ({ pages: state.pages.filter((p) => p.page !== page) })),
  modfityPage: (id: number, data: Partial<IPage>) =>
    set((state) => ({
      pages: state.pages.map((page) => (page.id === id ? { ...page, ...data } : page)),
    })),
}));

export const useCurrentContentState = create<{
  currentContent: IContent | null;
  setCurrentContent: (content: IContent | null) => void;
}>((set) => ({
  currentContent: null,
  setCurrentContent: (content: IContent | null) => set(() => ({ currentContent: content })),
}));
