import {create} from "zustand";
import {persist} from "zustand/middleware";

type Message = {
    id: string;
    prompt: string;
    response: string;
}

type Chat = {
    id: string;
    messages: Message[];
}

type ChatState = {
    chats: Record<string, Chat>;
    newChat: (id: string, prompt: Message) => void;
    updateChat: (id: string, prompt: Message) => void;
    updateChatResponse: (chatId: string, messageId: string, response: string) => void;
};

const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            chats: {},
            newChat: (id: string, prompt: Message) =>
                set((state) => ({
                    chats: {
                        ...state.chats, [id]: {
                            id,
                            messages: [prompt]
                        }
                    }
                })),
            updateChat: (id: string, prompt: Message) =>
                set((state) => ({
                    chats: {
                        ...state.chats, [id]: {
                            id,
                            messages: [...state.chats[id].messages, prompt]
                        }
                    }
                })),
            updateChatResponse: (chatId: string, messageId: string, response: string) => set(state => (
                {
                    chats: {
                        ...state.chats,
                        [chatId]: {
                            ...state.chats[chatId],
                            messages: state.chats[chatId].messages.map(msg => {
                                if(msg.id === messageId) {
                                    return {
                                        ...msg,
                                        response: response
                                    }
                                }
                                return msg
                            })
                        }
                    }
                }
            ))
        }),
        {
            name: "chat-store",
            version: 1,
        }
    )
);

export default useChatStore;
