import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    const HF_TOKEN = process.env.HF_TOKEN;
    const HF_MODEL = process.env.HF_MODEL;

    if (!HF_TOKEN || !HF_MODEL) {
      console.error("Missing HF_TOKEN or HF_MODEL in environment variables.");
      return new Response("Server misconfiguration", { status: 500 });
    }

    console.log("Prompt: ", prompt);

    const inference = new HfInference(HF_TOKEN);

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // This function is for manually sending a response

    // async function streamData() {
    //   try {
    //     const messages = [
    //       "Hello! ",
    //       "This ",
    //       "is a ",
    //       "simulated ",
    //       "AI ",
    //       "streaming ",
    //       "response. ",
    //       "</think>",
    //       "No ",
    //       "real ",
    //       "API ",
    //       "calls ",
    //       "here. ",
    //       "Hope ",
    //       "this ",
    //       "helps! 🚀",
    //     ];

    //     for (const message of messages) {
    //       await writer.write(encoder.encode(message));
    //       await new Promise((resolve) => setTimeout(resolve, 200));
    //     }
    //   } catch (err) {
    //     console.error("Streaming error:", err);
    //     await writer.write(encoder.encode("Error processing response."));
    //   } finally {
    //     await writer.close();
    //     console.log("Stream ended");
    //   }
    // }

    async function streamData() {
      try {
        for await (const chunk of inference.chatCompletionStream({
          model: HF_MODEL,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 512,
        })) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            await writer.write(encoder.encode(content));
          }
        }
      } catch (err) {
        console.error("Streaming error:", err);
        await writer.write(encoder.encode("Error processing response."));
      } finally {
        await writer.close();
        console.log("Stream ended");
      }
    }

    streamData();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Request handling error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
