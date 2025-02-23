"use client";
import { TimeAfternoon, TimeMorning, TimeLateEvening } from "@lib/Icons";

const Greeting = () => {
  const hrs = new Date().getHours();
  let greeting;
  let illustration;

  if (hrs < 12) {
    greeting = "Morning";
    illustration = <TimeMorning className="size-20 lg:size-24" />;
  } else if (hrs >= 12 && hrs <= 17) {
    greeting = "Afternoon";
    illustration = <TimeAfternoon className="size-20 lg:size-24" />;
  } else {
    greeting = "Evening";
    illustration = <TimeLateEvening className="size-20 lg:size-24" />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-1 mt-8 md:mt-28 xl:mt-16 2xl:mt-24 text-center">
      {illustration}
      <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold px-2 font-[CabinetGrotesk]">
        Good {greeting},{" "}
        <span className="bg-gradient-to-tr from-0% bg-[purple] to-100% to-red-500 bg-clip-text text-transparent">
          CA ~ IO
        </span>
      </h1>
    </div>
  );
};

export default Greeting;
