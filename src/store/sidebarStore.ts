import { create } from "zustand";

type SidebarState = {
  active: boolean;
  expand: () => void;
  collapse: () => void;
  activePanel: boolean;
  expandPanel: () => void;
  collapsePanel: () => void;
};

const useSideBarStore = create<SidebarState>((set) => ({
  active: false,
  activePanel: false,
  expand: () =>
    set(() => ({
      active: true,
    })),
  collapse: () =>
    set(() => ({
      active: false,
    })),
  expandPanel: () =>
    set(() => ({
      activePanel: true,
    })),
  collapsePanel: () =>
    set((state) => {
      return {
        activePanel: !state.activePanel,
      };
    }),
}));

export default useSideBarStore;
