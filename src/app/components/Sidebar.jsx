"use client";
import useChatStore from "@/store/chatStore";
import useSideBarStore from "@/store/sidebarStore";
import clsx from "clsx";
import Link from "next/link";
import { Plus, IconChat } from "../lib/Icons";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import profile from "../../../public/profile.jpg";

const Sidebar = () => {
  const chats = useChatStore((state) => state.chats);
  const active = useSideBarStore((state) => state.active);
  const collapse = useSideBarStore((state) => state.collapse);

  return (
    <div
      className={clsx(
        "fixed flex flex-col h-full w-[75%] top-0 left-0 bg-[var(--background-alt)] border border-[var(--foreground-alt)] px-4 py-3 z-50 transition-transform overflow-hidden lg:h-[98%] md:w-[300px] lg:rounded-lg lg:left-1 lg:top-[50%] lg:translate-y-[-50%] opacity-90",
        active ? "translate-x-0" : "translate-x-[-100%]"
      )}
      onMouseLeave={collapse}
    >
      <div
        className="flex items-center pb-3 px-2 border-b border-[var(--foreground-alt)] mb-4"
        onClick={collapse}
      >
        <Link href="/" className="flex gap-2 items-center">
          <Image src={logo} className="size-6" alt="" />
          <h1 className="text-xl mt-0.5 font-semibold font-[CabinetGrotesk]">
            SamurAI
          </h1>
        </Link>
      </div>

      <button className="bg-[var(--accent-clr)] rounded-lg" onClick={collapse}>
        <Link href="/" className="p-2 flex-1 flex items-center gap-2">
          <Plus className="size-4" />

          <span className="font-medium">Start New chat</span>
        </Link>
      </button>

      <hr className="my-4 mb-2 border-t-[var(--foreground-alt)]" />

      <ul className="flex flex-col">
        {Object.values(chats).map((chat, index) => (
          <li
            key={chat.id}
            onClick={collapse}
            className="flex hover:bg-[var(--foreground-alt)] rounded-lg items-center"
          >
            <Link
              className="w-full flex px-3 py-2 max-w-full overflow-hidden whitespace-nowrap text-ellipsis"
              href={`/chat?id=${chat.id}`}
            >
              {chat.messages[0].prompt}
            </Link>
          </li>
        ))}
      </ul>

      <Profile />
    </div>
  );
};

export default Sidebar;

function Profile() {
  return (
    <div className="flex mt-auto gap-2 bg-[var(--background)] p-2 border border-white/20 rounded-xl cursor-pointer hover:border-white/50">
      <Image
        src={profile}
        alt="profile"
        className="size-10 object-cover rounded-full border border-white/40"
      />

      <div className="flex flex-col">
        <span className="font-medium">Creative Ambition</span>
        <p className="text-xs">@ CA~IO</p>
      </div>
    </div>
  );
}
