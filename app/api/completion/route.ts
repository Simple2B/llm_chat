import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';

const HUGGINGFACE_TOKEN: string = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_TOKEN) {
    throw new Error(
        "The HUGGINGFACE_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
}

const Hf = new HfInference(HUGGINGFACE_TOKEN);

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { prompt, model, maxTokens } = await req.json();
        const response = await Hf.textGenerationStream({
            model: model,
            inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
            parameters: {
                max_new_tokens: maxTokens,
                return_full_text: false,
            }
        });
        const stream = HuggingFaceStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        throw new Error(error); // Try-catch blocks don't work here
    }
}
