'use server';
/**
 * @fileOverview Generates a Ganesh Chaturthi quote and background music.
 *
 * - generateGaneshWish - A function that returns a quote and audio data.
 * - GenerateGaneshWishInput - The input type for the generateGaneshWish function.
 * - GenerateGaneshWishOutput - The return type for the generateGaneshWish function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const GenerateGaneshWishInputSchema = z.object({
  userName: z.string().describe("The user's name for personalization."),
});
export type GenerateGaneshWishInput = z.infer<typeof GenerateGaneshWishInputSchema>;

const GenerateGaneshWishOutputSchema = z.object({
  quote: z.string().describe('An inspirational quote about Lord Ganesha.'),
  audioDataUri: z
    .string()
    .describe('Soft, instrumental background music as a data URI.'),
});
export type GenerateGaneshWishOutput = z.infer<
  typeof GenerateGaneshWishOutputSchema
>;

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
  async input => {
    const [quoteResult, audioResult] = await Promise.all([
      ai.generate({
        prompt: `Create a short, inspiring, and divine quote about Lord Ganesha for a Ganesh Chaturthi greeting for ${input.userName}.`,
        model: 'googleai/gemini-2.5-flash',
        output: {
          schema: z.string(),
        },
      }),
      ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {voiceName: 'Algenib'},
            },
          },
        },
        prompt:
          'Generate calming and devotional instrumental music suitable for a Ganesh Chaturthi prayer. The music should be serene, meditative, and about 15 seconds long.',
      }),
    ]);

    const quote = quoteResult.output;
    if (!quote) {
      throw new Error('Failed to generate a quote.');
    }
    
    const media = audioResult.media;
    if (!media) {
      throw new Error('no media returned');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const audioDataUri =
      'data:audio/wav;base64,' + (await toWav(audioBuffer));

    return {
      quote,
      audioDataUri,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
