"use client";

import usePromptStore from "@/store/promptStore";

const SamplePrompt = ({ prompt }: { prompt: string }) => {
  const updatePromptInput = usePromptStore((state) => state.updatePrompt);

  return (
    <div
      className="px-5 py-4 min-w-fit border border-white/10 rounded-xl bg-[var(--background-alt)] cursor-pointer"
      onClick={() => updatePromptInput(prompt)}
    >
      <span className="text-sm">{prompt}</span>
    </div>
  );
};

export default SamplePrompt;
