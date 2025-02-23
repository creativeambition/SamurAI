import { Wand } from "@lib/Icons";
import Greeting from "@components/Greeting";
import SamplePrompt from "./components/SamplePrompt";
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center flex-1">
      <Greeting />

      <div className="flex flex-col mt-16 lg:mt-28 xl:mt-14 2xl:mt-32 items-center gap-4 px-4">
        <Wand className="size-[40px] md:size-[40px]" />

        <p className="md:max-w-[70%] text-center">
          Choose a sample prompt below, or create your own to kick-start a
          conversation with{" "}
          <b className="bg-gradient-to-tr from-0% bg-[purple] to-100% to-red-500 bg-clip-text text-transparent italic">
            SamurAI
          </b>
        </p>
      </div>

      <div className="flex gap-2 overflow-auto mt-8 w-full px-2 md:justify-center md:px-0 md:max-w-[80%] md:flex-wrap xl:max-w-[50%] lg:max-w-[65%] 2xl:max-w-[45%] mb-auto">
        {[
          "Quantum Computing",
          "NVIDIA 4090 Graphics Card",
          "Calculus Overview",
          "Quantum Computing",
          "NVIDIA 4090 Graphics Card",
          "World Economics",
        ].map((prompt, index) => (
          <Fragment key={index}>
            <SamplePrompt prompt={prompt} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
