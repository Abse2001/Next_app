import connectToDB from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
import { Params } from "@global-types";

//GET (read)
export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new NextResponse(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};

//PATCH (update)
export const PATCH = async (req: Request, { params }: Params) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new NextResponse("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag.split("#").join("").split(" ").join("");
    await existingPrompt.save();

    return new NextResponse(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update prompt", { status: 500 });
  }
};

//DELETE

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findByIdAndDelete(params.id);

    return new NextResponse(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update prompt", { status: 500 });
  }
};
