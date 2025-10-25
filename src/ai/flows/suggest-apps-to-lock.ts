'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests apps to lock based on user usage patterns.
 *
 * - suggestAppsToLock - A function that suggests apps to lock.
 * - SuggestAppsToLockInput - The input type for the suggestAppsToLock function.
 * - SuggestAppsToLockOutput - The return type for the suggestAppsToLock function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAppsToLockInputSchema = z.object({
  appUsageData: z
    .string()
    .describe(
      'A stringified JSON array containing the list of apps and their usage frequency. For example: [{\"appName\": \"Facebook\", \"usageFrequency\": 10}, {\"appName\": \"Instagram\", \"usageFrequency\": 5}]'
    ),
});
export type SuggestAppsToLockInput = z.infer<typeof SuggestAppsToLockInputSchema>;

const SuggestAppsToLockOutputSchema = z.object({
  suggestedApps: z
    .array(z.string())
    .describe('An array of app names that the user should lock.'),
});
export type SuggestAppsToLockOutput = z.infer<typeof SuggestAppsToLockOutputSchema>;

export async function suggestAppsToLock(input: SuggestAppsToLockInput): Promise<SuggestAppsToLockOutput> {
  return suggestAppsToLockFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAppsToLockPrompt',
  input: {schema: SuggestAppsToLockInputSchema},
  output: {schema: SuggestAppsToLockOutputSchema},
  prompt: `You are an AI assistant that suggests apps to lock based on user usage patterns.

  Analyze the following app usage data and suggest the top 3 apps that the user should lock to secure their device. Only return the app names in an array.

  App Usage Data: {{{appUsageData}}}
  `,
});

const suggestAppsToLockFlow = ai.defineFlow(
  {
    name: 'suggestAppsToLockFlow',
    inputSchema: SuggestAppsToLockInputSchema,
    outputSchema: SuggestAppsToLockOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
