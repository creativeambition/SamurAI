"use client";
import useChatStore from "@/store/chatStore";
import useSideBarStore from "@/store/sidebarStore";
import { ChevronDown, Menu03, Wand } from "@lib/Icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../../public/logo.svg";

const Header = () => {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const expand = useSideBarStore((state) => state.expand);

  const [optionsMenu, setOptionsMenu] = useState(false);

  function toggleOptionsMenu() {
    setOptionsMenu(!optionsMenu);
  }
  useEffect(() => {
    document.body.addEventListener("click", () => {
      if (optionsMenu) {
        setOptionsMenu(false);
      }
    });
  });

  const chats = useChatStore((state) => state.chats);
  const chat = chats[chatId];

  return (
    <header
      className={clsx(
        "sticky top-0 h-14 w-full p-2 md:px-4 flex items-center justify-start bg-gradient-to-b from-[var(--background-alt)] to-transparent z-10"
      )}
    >
      <Link
        href="/"
        className={clsx(
          "absolute hidden md:flex items-center gap-2 transition-all duration-700 ease-out",
          chatId ? "left-16" : "left-[50%] translate-x-[-50%]"
        )}
      >
        <Image src={logo} className="size-8" alt="" />
        <span className="text-xl font-semibold font-[CabinetGrotesk]">
          SamurAI
        </span>
      </Link>

      <Menu03
        className="absolute size-8 min-w-fit p-1 cursor-pointer md:hidden"
        onClick={expand}
      />

      <div
        className={clsx(
          "relative items-center justify-center gap-2 px-3 py-1 rounded-lg cursor-pointer hover:bg-[var(--foreground-alt)]/40 max-w-[55%] lg:max-w-[50%]",
          chatId ? "flex mx-auto" : "hidden"
        )}
        onClick={toggleOptionsMenu}
      >
        {optionsMenu && (
          <div
            className="absolute top-full translate-y-[2px] w-[105%] bg-[var(--foreground-alt)] rounded-lg p-1 backdrop-blur-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-[var(--background)]/50">
                Rename
              </li>
              <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-[var(--background)]/50">
                Delete
              </li>
              <li className="px-3 py-1 rounded-lg cursor-pointer hover:bg-[var(--background)]/50">
                Star
              </li>
            </ul>
          </div>
        )}

        <Wand className="min-w-fit" />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {chat?.messages[0].prompt}
        </span>

        <ChevronDown
          className={clsx(
            "min-w-fit size-5 transition-all",
            optionsMenu && "rotate-180"
          )}
        />
      </div>
    </header>
  );
};

export default Header;
