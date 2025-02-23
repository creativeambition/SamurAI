"use client";

import useSideBarStore from "@/store/sidebarStore";
import { MageChevronRight } from "../lib/Icons";

const DetailsPaneDrawer = () => {
  const expand = useSideBarStore((state) => state.expandPanel);

  return (
    <div
      className="hidden lg:flex fixed top-0 right-0 h-full w-15 z-20"
      onMouseEnter={expand}
    >
      <div className="absolute top-0 left-0 h-full w-15 bg-black blur-[60px] opacity-35"></div>
      <div className="absolute top-[50%] left-[40%] translate-y-[-50%] opacity-90 rotate-180">
        <MageChevronRight />
      </div>
    </div>
  );
};

export default DetailsPaneDrawer;
