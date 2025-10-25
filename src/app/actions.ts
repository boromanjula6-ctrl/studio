'use server';

import { suggestAppsToLock, type SuggestAppsToLockInput } from '@/ai/flows/suggest-apps-to-lock';

export async function getLockSuggestions(appUsageData: SuggestAppsToLockInput['appUsageData']) {
  try {
    const result = await suggestAppsToLock({ appUsageData });
    return { suggestions: result.suggestedApps, error: null };
  } catch (error) {
    console.error('Error getting lock suggestions:', error);
    return { suggestions: [], error: 'Failed to get suggestions from AI. Please try again later.' };
  }
}
