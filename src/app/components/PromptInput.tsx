"use client";
import { FormEvent, useEffect, useState } from "react";
import { Globe, Paperclip, Send } from "../lib/Icons";
import Form from "next/form";
import useChatStore from "@/store/chatStore";
import { useSearchParams } from "next/navigation";
import { v4 as uuid } from "uuid";
import IconButton from "@/app/components/IconButton";
import usePromptStore from "@/store/promptStore";

const PromptInput = () => {
  const searchParams = useSearchParams();
  const storedPrompt = usePromptStore((state) => state.prompt);
  const [prompt, setPrompt] = useState({
    id: "",
    prompt: "",
    response: "",
  });

  useEffect(() => {
    if (storedPrompt) {
      setPrompt({
        id: uuid(),
        prompt: storedPrompt,
        response: "",
      });
    }
  }, [storedPrompt]);

  const chat = useChatStore((state) => state.chats);
  const newChat = useChatStore((state) => state.newChat);
  const updateChatMessages = useChatStore((state) => state.updateChat);

  function handleSubmit(event: FormEvent) {
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    textarea.style.height = 48 + "px";

    const chatId = searchParams.get("id");

    if (chatId) {
      event.preventDefault();
      if (chat[chatId]?.messages.at(-1)?.response) {
        const promptId = uuid();
        updateChatMessages(chatId, {
          ...prompt,
          id: promptId,
        });
      }
    } else {
      const form = event.target as HTMLFormElement;
      const hidden = form.elements.namedItem("id") as HTMLInputElement;

      const chatId = (hidden.value = uuid());
      const promptId = uuid();
      newChat(chatId, {
        ...prompt,
        id: promptId,
      });
    }

    setPrompt({
      id: "",
      prompt: "",
      response: "",
    });
  }

  // textarea
  useEffect(() => {
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const maxRows = 6;
    const lineHeight = 24;

    textarea.addEventListener("input", () => {
      textarea.style.height = 48 + "px";
      const newHeight = Math.min(textarea.scrollHeight, maxRows * lineHeight);
      textarea.style.height = `${newHeight}px`;

      if (textarea.scrollHeight > maxRows * lineHeight) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    });
    return () => textarea.removeEventListener("input", () => {});
  }, []);
  //...

  return (
    <>
      <div className="sticky bottom-0 flex flex-col items-start justify-center mt-auto w-full px-2 py-4 pt-1 bg-[var(--background)] md:border-0 md:flex-row md:items-end md:gap-4">
        <Form
          action="/chat"
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-center md:gap-4"
        >
          <div className="hidden md:flex flex-col items-center gap-2 w-16 p-2 lg:gap-4">
            <IconButton>
              <Paperclip />
            </IconButton>
            <IconButton>
              <Globe />
            </IconButton>
          </div>

          <input readOnly hidden type="text" value="" name="id" />

          <textarea
            required={true}
            id="textarea"
            rows={1}
            className="resize-none py-3 min-h-12 md:min-h-24 md:max-w-[80%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[45%] px-4 border w-full rounded-xl border-[var(--foreground-alt)] bg-[var(--foreground-alt)]/40"
            value={prompt.prompt}
            onChange={(e) =>
              setPrompt({ ...prompt, prompt: e.target.value, response: "" })
            }
            placeholder="Ask me anything..."
          />

          <button
            name="submit"
            disabled={!prompt.prompt}
            className={
              "h-16 aspect-square flex justify-center items-center z-10 cursor-pointer self-end disabled:opacity-20 disabled:cursor-not-allowed"
            }
          >
            <Send size="60%" />
          </button>
        </Form>
      </div>

      {!searchParams.get("id") && (
        <span className="text-center text-xs lg:text-sm opacity-80 w-full pb-2">
          SamurAI can be dumb sometimes. Verify crucial info
        </span>
      )}
    </>
  );
};

export default PromptInput;
