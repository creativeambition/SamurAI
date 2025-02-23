"use client";
import useChatStore from "@/store/chatStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Conversation from "../components/Conversation";

export default function Page() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  const chat = useChatStore((state) => state.chats[chatId]);

  // scroll-to-bottom
  useEffect(() => {
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [chat]);
  // ...

  return (
    <main className="flex flex-1 flex-col items-center py-2 px-4 pb-12">
      <div className="relative w-full flex-1 md:max-w-[80%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[45%]">
        {chat?.messages.map((message) => (
          <Conversation key={message.id} content={message} chatId={chatId} />
        ))}
      </div>
    </main>
  );
}
