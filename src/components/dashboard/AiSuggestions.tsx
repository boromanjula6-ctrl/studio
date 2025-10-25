'use client';

import { useState, useTransition, type FC } from 'react';
import type { App } from '@/lib/types';
import { getLockSuggestions } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AiSuggestionsProps {
  apps: App[];
  onLockApps: (appNames: string[]) => void;
}

export const AiSuggestions: FC<AiSuggestionsProps> = ({ apps, onLockApps }) => {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetSuggestions = () => {
    startTransition(async () => {
      setError(null);
      setSuggestions([]);
      const appUsageData = JSON.stringify(
        apps.map(({ name, usage }) => ({ appName: name, usageFrequency: usage }))
      );

      const result = await getLockSuggestions(appUsageData);
      
      if (result.error) {
        setError(result.error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: result.error,
        });
      } else if (result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
        toast({
          title: "Suggestions Ready!",
          description: "AI has analyzed your app usage.",
        });
      } else {
         setError("No suggestions were generated. You're all set!");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          <span>Lock Recommendations</span>
        </CardTitle>
        <CardDescription>Let AI suggest apps to lock based on usage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[120px] flex flex-col justify-center">
        {isPending ? (
          <div className="flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Analyzing usage patterns...</span>
          </div>
        ) : suggestions.length > 0 ? (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Suggested Apps</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside mt-2">
                {suggestions.map(name => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            {error || 'Click the button to get your personalized suggestions.'}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button onClick={handleGetSuggestions} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Get AI Suggestions
        </Button>
        {suggestions.length > 0 && !isPending && (
          <Button variant="outline" onClick={() => onLockApps(suggestions)}>
            Lock Suggested Apps
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
