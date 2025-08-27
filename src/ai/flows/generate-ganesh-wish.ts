'use server';
/**
 * @fileOverview Generates a Ganesh Chaturthi quote.
 *
 * - generateGaneshWish - A function that returns a quote.
 * - GenerateGaneshWishInput - The input type for the generateGaneshWish function.
 * - GenerateGaneshWishOutput - The return type for the generateGaneshWish function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGaneshWishInputSchema = z.object({
  userName: z.string().describe("The user's name for personalization."),
});
export type GenerateGaneshWishInput = z.infer<typeof GenerateGaneshWishInputSchema>;

const GenerateGaneshWishOutputSchema = z.object({
  quote: z.string().describe('An inspirational quote about Lord Ganesha in Hindi.'),
});
export type GenerateGaneshWishOutput = z.infer<
  typeof GenerateGaneshWishOutputSchema
>;

export async function generateGaneshWish(
  input: GenerateGaneshWishInput
): Promise<GenerateGaneshWishOutput> {
  return generateGaneshWishFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ganeshWishPrompt',
  input: {schema: GenerateGaneshWishInputSchema},
  output: {schema: GenerateGaneshWishOutputSchema},
  prompt: `Generate a short, inspiring, and beautiful Ganesh Chaturthi wish in Hindi for a user named {{{userName}}}. The wish should be unique and heartfelt. Do not repeat the same wish. Ensure the output is only the quote text in JSON format.`,
});

const generateGaneshWishFlow = ai.defineFlow(
  {
    name: 'generateGaneshWishFlow',
    inputSchema: GenerateGaneshWishInputSchema,
    outputSchema: GenerateGaneshWishOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
