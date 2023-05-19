import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    let prompts;
    prompts = await Prompt.find({
      $or: [
        // { "creator.username": { $regex: params.id, $options: "i" } },
        { tag: { $regex: params.id, $options: "i" } },
      ],
    }).populate("creator");

    if (prompts.length === 0) {
      const tempPrompts = await Prompt.find({}).populate("creator");
      tempPrompts.forEach((prompt) => {
        if (prompt.creator.username == params.id) {
          prompts.push(prompt);
        }
      });
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get prompt", { status: 500 });
  }
};
