import type { FC } from 'react';
import type { Intruder } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Camera } from 'lucide-react';

interface IntruderAlertsProps {
  intruders: Intruder[];
}

export const IntruderAlerts: FC<IntruderAlertsProps> = ({ intruders }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="text-destructive" />
          <span>Intruder Alerts</span>
        </CardTitle>
        <CardDescription>Failed unlock attempts are logged here.</CardDescription>
      </CardHeader>
      <CardContent>
        {intruders.length > 0 ? (
          <ul className="space-y-4">
            {intruders.map(intruder => (
              <li key={intruder.id} className="flex items-center gap-4">
                <Image
                  src={intruder.photoUrl}
                  alt="Intruder photo"
                  data-ai-hint={intruder.photoHint}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-destructive"
                />
                <div className="flex-grow">
                  <p className="font-semibold">Unauthorized Attempt</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(intruder.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">No intruder alerts yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
