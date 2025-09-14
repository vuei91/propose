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

interface IResize {
  width: number;
  height: number;
  rotate: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

export const useResizeState = create<IResize>((set, get) => ({
  width: 500,
  height: 500,
  rotate: 0,
  setWidth: (width: number) => set(() => ({ ...get(), width })),
  setHeight: (height: number) => set(() => ({ ...get(), height })),
  setRotate: (rotate: number) => set(() => ({ rotate })),
}));
