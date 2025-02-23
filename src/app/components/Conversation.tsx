import UserPrompt from "./UserPrompt";
import AIResponse from "./AIResponse";
import useChatStore from "@/store/chatStore";
import { useCallback, useEffect, useRef, useState } from "react";

const Conversation = ({
  content,
  chatId,
}: {
  content: {
    id: string;
    prompt: string;
    response: string;
  };
  chatId: string;
}) => {
  const [response, setResponse] = useState("");

  const hasFetched = useRef(false);
  const [error, setError] = useState(false);

  const updateChatResponse = useChatStore((state) => state.updateChatResponse);

  const getResponse = useCallback(async () => {
    try {
      const request = await fetch("/chat/api", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ prompt: content.prompt }),
      });

      const reader = request.body!.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream complete: ", result);
          break;
        }

        const decode = decoder.decode(value, { stream: true });
        result += decode;

        setResponse((prev) => prev + decode);
      }

      updateChatResponse(chatId, content.id, result);
    } catch (error) {
      setError(true);
      console.error("Couldn't fetch chat response:", error);
    }
  }, [chatId, content.id, content.prompt, updateChatResponse]);

  useEffect(() => {
    if (!content.response) {
      if (hasFetched.current) return;

      hasFetched.current = true;
      getResponse();
    }
  }, [chatId, content.id, content.response, getResponse, updateChatResponse]);

  return (
    <>
      <UserPrompt animate={!content.response} input={content.prompt} />
      <AIResponse response={content.response || response} error={error} />
    </>
  );
};
export default Conversation;
