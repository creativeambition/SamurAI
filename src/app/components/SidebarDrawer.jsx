"use client";

import useSideBarStore from "@/store/sidebarStore";
import { MageChevronRight } from "../lib/Icons";

const SidebarDrawer = () => {
  const expand = useSideBarStore((state) => state.expand);

  return (
    <div
      className="hidden md:flex fixed top-0 left-0 h-full w-15 z-20"
      onMouseEnter={expand}
    >
      <div className="absolute top-0 left-0 h-full w-15 bg-black blur-[50px] opacity-35"></div>
      <div className="absolute top-[50%] left-[40%] translate-y-[-50%] opacity-50">
        <MageChevronRight />
      </div>
    </div>
  );
};

export default SidebarDrawer;
