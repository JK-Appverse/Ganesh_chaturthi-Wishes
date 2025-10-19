'use server';
/**
 * @fileOverview Generates a Diwali wish.
 *
 * - generateDiwaliWish - A function that returns a quote.
 * - GenerateDiwaliWishInput - The input type for the generateDiwaliWish function.
 * - GenerateDiwaliWishOutput - The return type for the generateDiwaliWish function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiwaliWishInputSchema = z.object({
  userName: z.string().describe("The user's name for personalization."),
});
export type GenerateDiwaliWishInput = z.infer<typeof GenerateDiwaliWishInputSchema>;

const GenerateDiwaliWishOutputSchema = z.object({
  quote: z.string().describe('An inspirational and festive Diwali wish in Hindi.'),
});
export type GenerateDiwaliWishOutput = z.infer<
  typeof GenerateDiwaliWishOutputSchema
>;

export async function generateDiwaliWish(
  input: GenerateDiwaliWishInput
): Promise<GenerateDiwaliWishOutput> {
  return generateDiwaliWishFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diwaliWishPrompt',
  input: {schema: GenerateDiwaliWishInputSchema},
  output: {schema: GenerateDiwaliWishOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `Generate a short, inspiring, and beautiful Diwali wish in Hindi for a user named {{{userName}}}. The wish should be unique, festive, and heartfelt. It should invoke themes of light, prosperity, and happiness. Do not repeat the same wish. Ensure the output is only the quote text in JSON format.`,
});

const generateDiwaliWishFlow = ai.defineFlow(
  {
    name: 'generateDiwaliWishFlow',
    inputSchema: GenerateDiwaliWishInputSchema,
    outputSchema: GenerateDiwaliWishOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
