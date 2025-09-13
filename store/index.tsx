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
