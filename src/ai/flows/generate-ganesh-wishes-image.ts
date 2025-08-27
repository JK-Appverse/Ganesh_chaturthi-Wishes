'use server';
/**
 * @fileOverview Generates a Ganesh Chaturthi wishes image with the user's name.
 *
 * - generateGaneshWishesImage - A function that generates the Ganesh Chaturthi wishes image.
 * - GenerateGaneshWishesImageInput - The input type for the generateGaneshWishesImage function.
 * - GenerateGaneshWishesImageOutput - The return type for the generateGaneshWishesImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGaneshWishesImageInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
});
export type GenerateGaneshWishesImageInput = z.infer<typeof GenerateGaneshWishesImageInputSchema>;

const GenerateGaneshWishesImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // prettier-ignore
    ),
});
export type GenerateGaneshWishesImageOutput = z.infer<typeof GenerateGaneshWishesImageOutputSchema>;

export async function generateGaneshWishesImage(
  input: GenerateGaneshWishesImageInput
): Promise<GenerateGaneshWishesImageOutput> {
  return generateGaneshWishesImageFlow(input);
}

const renderInstructionTool = ai.defineTool({
  name: 'renderInstructionTool',
  description: 'This tool will take user name and render all text, image, layout and color details into one base64 encoded image.',
  inputSchema: z.object({
    userName: z.string().describe('Name of the user'),
  }),
  outputSchema: z.string().describe('A base64 encoded image'),
},
async (input) => {
  // TODO: Implement the image generation logic here using a suitable library or API.
  // This is a placeholder, replace with actual image generation code.
  const placeholderImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w+bLly//gwMDAwMDAwMDQ//8AAwAjR7SvoAAAAAElFTkSuQmCC`;
  return placeholderImage;
});

const generateGaneshWishesImagePrompt = ai.definePrompt({
  name: 'generateGaneshWishesImagePrompt',
  tools: [renderInstructionTool],
  input: {schema: GenerateGaneshWishesImageInputSchema},
  output: {schema: GenerateGaneshWishesImageOutputSchema},
  prompt: `You are an AI capable of generating personalized Ganesh Chaturthi greetings images.

  The user will provide their name, and you will generate an image with the following elements:
  1.  The phrase 'Happy Ganesh Chaturthi' written in Hindi at the top.
  2.  An image of Lord Ganesha.
  3.  The phrase 'Happy Ganesh Chaturthi from [user's name]' at the bottom.

  Instructions:
  *   Use the renderInstructionTool to generate the image using user name: {{{userName}}}.
  *   Ensure the Hindi phrase and user's name are correctly rendered in the image, with suitable line breaks.
  *   The image should have a gold color scheme (#D4AF37) for divinity, a light cream background (#F5F5DC), and a deep saffron accent color (#FF9933).

  Return the data URI of the generated image.
  `,
});

const generateGaneshWishesImageFlow = ai.defineFlow(
  {
    name: 'generateGaneshWishesImageFlow',
    inputSchema: GenerateGaneshWishesImageInputSchema,
    outputSchema: GenerateGaneshWishesImageOutputSchema,
  },
  async input => {
    const {userName} = input;
    const {output} = await generateGaneshWishesImagePrompt({
      userName: userName,
    });
    return {imageDataUri: output!};
  }
);
