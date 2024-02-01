import { create, StateCreator } from "zustand";

interface SidebarToggle {
  toggleCollapse: boolean;
  invokeToggleCollapse: () => void;
}

export const useSidebarToggle = create<SidebarToggle>((set, get) => ({
  toggleCollapse: false,
  invokeToggleCollapse: () => set({ toggleCollapse: !get().toggleCollapse }),
}));
