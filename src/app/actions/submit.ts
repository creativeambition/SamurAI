"use server";

import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log("Res: ", data);
  redirect(`/chat/id`);
}
