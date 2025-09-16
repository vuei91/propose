import { IContent } from "@/IContent";
import { create } from "zustand";

interface IMode {
  mode: "VIEW" | "EDIT";
  toggleMode: () => void;
}

export const useModeState = create<IMode>((set) => ({
  mode: "VIEW",
  toggleMode: () =>
    set((state: IMode) => ({ mode: state.mode === "EDIT" ? "VIEW" : "EDIT" })),
}));

interface IController {
  contents: IContent[];
  setContents: (contents: IContent[]) => void;
  getContent: (id: number) => IContent | undefined;
  currentContent: IContent | null;
  setCurrentContent: (id: number | null) => void;
  setWidth: (id: number, width: number) => void;
  setHeight: (id: number, height: number) => void;
  setRotate: (id: number, rotate: number) => void;
  setXY: (id: number, x: number, y: number) => void;
}

export const useResizeState = create<IController>((set, get) => ({
  contents: [],
  currentContent: null,
  setCurrentContent: (id: number | null) => {
    if (id === null) {
      set(() => ({ currentContent: null }));
    } else {
      set(() => ({
        currentContent: get().getContent(id) || null,
      }));
    }
  },
  setContents: (contents: IContent[]) => {
    set({ contents });
  },
  getContent: (id: number) =>
    get().contents.find((content) => content.id === id),
  setWidth: (id: number, width: number) =>
    set(() => ({
      contents: get().contents.map((content) =>
        content.id === id ? { ...content, width } : content
      ),
      currentContent: {
        ...get().contents.find((c) => c.id === id),
        width,
      } as IContent,
    })),
  setHeight: (id: number, height: number) =>
    set(() => ({
      contents: get().contents.map((content) =>
        content.id === id ? { ...content, height } : content
      ),
      currentContent: {
        ...get().contents.find((c) => c.id === id),
        height,
      } as IContent,
    })),
  setRotate: (id: number, rotate: number) =>
    set(() => ({
      contents: get().contents.map((content) =>
        content.id === id ? { ...content, rotate } : content
      ),
      currentContent: {
        ...get().contents.find((c) => c.id === id),
        rotate,
      } as IContent,
    })),
  setXY: (id: number, x: number, y: number) =>
    set(() => ({
      contents: get().contents.map((content) =>
        content.id === id ? { ...content, x, y } : content
      ),
    })),
}));
