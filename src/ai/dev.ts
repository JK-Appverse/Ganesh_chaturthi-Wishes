import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkitEval, GenkitMetric} from '@genkit-ai/evaluator';
// import {googleCloud} from '@genkit-ai/google-cloud';

import * as datastore from './datastore';
import * as flows from './flows';

export default genkit({
  plugins: [
    googleAI(),
    // googleCloud(),
    genkitEval({
      judge: 'googleai/gemini-1.5-flash',
      metrics: [GenkitMetric.FAITHFULNESS, GenkitMetric.MALICIOUSNESS],
      embedder: 'googleai/embedding-004',
    }),
  ],
  flows: Object.values(flows),
  evaluators: Object.values(datastore),
  logLevel: 'debug',
  enableTracing: true,
});
