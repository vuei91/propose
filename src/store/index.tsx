import { create } from "zustand";

const data: IContent[] = [
  {
    id: 1,
    date: "20250907",
    type: "text",
    width: 320,
    height: 200,
    rotate: 0,
    page: 1,
    x: 0,
    y: 0,
  },
  {
    id: 2,
    date: "20250907",
    type: "text",
    width: 320,
    height: 200,
    rotate: 0,
    page: 2,
    x: 0,
    y: 0,
  },
  {
    id: 3,
    date: "20250907",
    type: "text",
    width: 320,
    height: 200,
    rotate: 0,
    page: 3,
    x: 0,
    y: 0,
  },
  {
    id: 4,
    date: "20250907",
    type: "text",
    width: 320,
    height: 200,
    rotate: 0,
    page: 4,
    x: 0,
    y: 0,
  },
];

interface IMode {
  mode: "VIEW" | "EDIT";
  toggleMode: () => void;
}

export const useModeState = create<IMode>((set) => ({
  mode: "VIEW",
  toggleMode: () =>
    set((state: IMode) => ({ mode: state.mode === "EDIT" ? "VIEW" : "EDIT" })),
}));

interface IContent {
  id: number;
  date: string;
  type: "text" | "image";
  width: number;
  height: number;
  rotate: number;
  page: number;
  x: number;
  y: number;
}

interface IController {
  contents: IContent[];
  getContent: (id: number) => IContent | undefined;
  currentContent: IContent | null;
  setCurrentContent: (id: number | null) => void;
  setWidth: (id: number, width: number) => void;
  setHeight: (id: number, height: number) => void;
  setRotate: (id: number, rotate: number) => void;
  setXY: (id: number, x: number, y: number) => void;
}

export const useResizeState = create<IController>((set, get) => ({
  contents: data,
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
