const AIResponse = ({
  response,
  error,
}: {
  response: string;
  error: boolean;
}) => {
  return (
    <div className="mt-6 w-full flex mb-6 lg:mb-8 bg-[var(--background-alt)] py-3 px-4 rounded-xl border border-[var(--foreground-alt)]/70 text-sm md:text-base">
      {!error && response && (
        <div className="">
          <ThoughtProcess content={response.split("</think>")[0]} />
          <p>{response.split("</think>")[1]}</p>
        </div>
      )}

      {error && (
        <div className="flex">
          <p className="text-red-400">An error occurred :(</p>
        </div>
      )}

      {!error && !response && (
        <div className="flex flex-col gap-3 w-full">
          <div className="h-2 w-full bg-[var(--foreground-alt)] rounded-full animate-pulse"></div>
          <div className="h-2 w-[75%] bg-[var(--foreground-alt)] rounded-full animate-pulse"></div>
          <div className="h-2 w-full bg-[var(--foreground-alt)] rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default AIResponse;

function ThoughtProcess({ content }: { content: string }) {
  return (
    <div className="text-gray-400 mb-2 flex gap-3">
      <div className="flex-1 min-w-1 max-w-1 rounded-lg bg-gradient-to-bl from-red-500 to-blue-500"></div>
      <span className="">{content}</span>
    </div>
  );
}
