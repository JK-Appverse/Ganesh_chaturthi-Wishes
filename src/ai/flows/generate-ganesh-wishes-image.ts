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

const generateGaneshWishesImageFlow = ai.defineFlow(
  {
    name: 'generateGaneshWishesImageFlow',
    inputSchema: GenerateGaneshWishesImageInputSchema,
    outputSchema: GenerateGaneshWishesImageOutputSchema,
  },
  async ({userName}) => {
    const {media} = await ai.generate({
      prompt: `A beautiful, divine image of Lord Ganesha for Ganesh Chaturthi, with blessings. The image should be based on the style and composition of "https://i.postimg.cc/RVT1yS4v/ganesh-chaturthi-wishes-card-with-name-and-photo.jpg". Include the text 'Happy Ganesh Chaturthi from ${userName}' in a subtle, elegant font. The image should have a warm color palette with gold, saffron, and cream colors.`,
    });

    return {imageDataUri: media.url!};
  }
);
