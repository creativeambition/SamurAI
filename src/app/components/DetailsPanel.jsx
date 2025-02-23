import useSideBarStore from "@/store/sidebarStore";
import clsx from "clsx";

const DetailsPanel = () => {
  const active = useSideBarStore((state) => state.activePanel);
  const collapse = useSideBarStore((state) => state.collapsePanel);

  return (
    <div
      className={clsx(
        "fixed flex flex-col h-full w-[75%] top-0 right-0 bg-[var(--background-alt)] border border-[var(--foreground-alt)] px-4 py-3 z-50 transition-transform overflow-hidden lg:h-[98%] lg:w-[300px] lg:rounded-lg lg:right-1 lg:top-[50%] lg:translate-y-[-50%] opacity-90",
        active ? "translate-x-0" : "translate-x-[100%]"
      )}
      onMouseLeave={collapse}
    >
      <span className="font-medium font-[CabinetGrotesk] text-2xl">
        Details Panel
      </span>
      <span className="my-6">Coming soon...</span>
    </div>
  );
};

export default DetailsPanel;
