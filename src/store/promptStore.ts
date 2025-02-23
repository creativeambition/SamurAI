import { create } from "zustand";
import { v4 as uuid } from "uuid";

type promptState = {
  prompt: string;
  updatePrompt: (value: string) => void;
};

const usePromptStore = create<promptState>()((set) => ({
  prompt: "",
  updatePrompt: (value: string) =>
    set(() => ({
      id: uuid(),
      prompt: value,
      response: "",
    })),
}));

export default usePromptStore;
