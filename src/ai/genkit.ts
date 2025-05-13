import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure GOOGLE_API_KEY is loaded from .env. 
// This should be handled by `dotenv.config()` in `src/ai/dev.ts` before this file is processed.
const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey && process.env.NODE_ENV !== 'production' && typeof window === 'undefined') {
  // Warning will appear in the terminal where Genkit server is running
  console.warn(
    '\n**************************************************************************************\n' +
    'WARNING: GOOGLE_API_KEY is not set in your .env file.\n' +
    'The Genkit Google AI plugin may not function correctly without it.\n' +
    'Please add GOOGLE_API_KEY=your_api_key to your .env file.\n' +
    '**************************************************************************************\n'
  );
}

export const ai = genkit({
  plugins: [googleAI({ apiKey: googleApiKey })], // Explicitly pass apiKey
  model: 'googleai/gemini-2.0-flash',
});
