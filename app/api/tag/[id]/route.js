import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ tag: params.id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get prompt", { status: 500 });
  }
};
