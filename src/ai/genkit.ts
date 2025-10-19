import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkitNext} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [genkitNext(), googleAI()],
  logLevel: 'debug',
  enableTracing: true,
});
