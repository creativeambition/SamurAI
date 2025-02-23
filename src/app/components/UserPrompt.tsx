import clsx from "clsx";
import { User } from "../lib/Icons";

const UserPrompt = ({
  input,
  animate,
}: {
  input: string;
  animate: boolean;
}) => {
  return (
    <div
      className={clsx(
        "mt-8 md:mt-4 w-full flex items-center gap-1 lg:gap-2",
        animate && "animate-fade"
      )}
    >
      <User className="size-4 xl:size-5" />

      <p className={"text-base xl:text-lg whitespace-pre-wrap break-words"}>
        {input}
      </p>
    </div>
  );
};

export default UserPrompt;
