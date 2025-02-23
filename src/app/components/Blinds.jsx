"use client";

import useSideBarStore from "@/store/sidebarStore";
import clsx from "clsx";

function Blinds() {
  const active = useSideBarStore((state) => state.active);
  const collapse = useSideBarStore((state) => state.collapse);
  const panelActive = useSideBarStore((state) => state.activePanel);
  const collapsePanel = useSideBarStore((state) => state.collapsePanel);
  return (
    <div
      onClick={active ? collapse : collapsePanel}
      className={clsx(
        "fixed inset-0 bg-[var(--background)] transition-opacity z-10",
        active || panelActive
          ? "opacity-95 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    ></div>
  );
}

export default Blinds;
