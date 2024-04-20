import connectToDB from "@utils/database";
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";

export const POST = async (req: Request) => {
  const { userId, prompt, tag, username } = await req.json();
  const newTag = tag.split("#").join("").split(" ").join("");
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: newTag,
      username: username.replace(" ", "").toLowerCase(),
    });

    await newPrompt.save();

    return new NextResponse(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
