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

const ganeshaQuotes = [
  'गणपति बाप्पा मोरया, मंगल मूर्ति मोरया।',
  'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा।',
  'गणेश जी का रूप निराला है, चेहरा भी कितना भोला भाला है, जिसे भी आती है कोई मुसीबत, उसे इन्हीं ने तो संभाला है।',
  'सब शुभ कारज में पहले पूजा तेरी, तुम बिना काम ना सरे, अरज सुन मेरी।',
  'भगवान श्री गणेश की कृपा, बनी रहे आप हर दम। हर कार्य में सफलता मिले, जीवन में न आए कोई गम।',
];

export async function generateGaneshWish(
  input: GenerateGaneshWishInput
): Promise<GenerateGaneshWishOutput> {
  return generateGaneshWishFlow(input);
}

const generateGaneshWishFlow = ai.defineFlow(
  {
    name: 'generateGaneshWishFlow',
    inputSchema: GenerateGaneshWishInputSchema,
    outputSchema: GenerateGaneshWishOutputSchema,
  },
  async (input) => {
    const quote = ganeshaQuotes[Math.floor(Math.random() * ganeshaQuotes.length)];
    return {
      quote,
    };
  }
);
