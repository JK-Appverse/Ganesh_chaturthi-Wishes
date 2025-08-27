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

const ganeshaQuotes = [
  'May Lord Ganesha remove all obstacles and bless you with wisdom and prosperity.',
  'Wishing you a very happy Ganesh Chaturthi. May you find all the delights of life.',
  'May Lord Ganesha bestow you with power, destroy your sorrows, and enhance happiness in your life.',
  'On this auspicious occasion of Ganesh Chaturthi, I wish you happiness, and may all your dreams come true.',
  'May the divine blessings of Lord Ganesha make your life blissful and happy.',
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
  async input => {
    const audioResult = await ai.generate({
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
    });

    const quote = ganeshaQuotes[Math.floor(Math.random() * ganeshaQuotes.length)];
    
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
