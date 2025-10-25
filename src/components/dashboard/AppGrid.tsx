import type { FC } from 'react';
import type { App } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Lock, Unlock, MessageCircle, Instagram, Twitter, Youtube, Image as ImageIcon, File, Banknote, Slack, Mail, Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface AppGridProps {
  apps: App[];
  onToggleLock: (appId: string) => void;
  onUnlockAll: () => void;
}

const iconComponents: { [key: string]: Icon } = {
  MessageCircle,
  Instagram,
  Twitter,
  Youtube,
  Image: ImageIcon,
  File,
  Banknote,
  Slack,
  Mail,
};


export const AppGrid: FC<AppGridProps> = ({ apps, onToggleLock, onUnlockAll }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>App Lock</CardTitle>
          <CardDescription>Toggle the switch to lock or unlock an application.</CardDescription>
        </div>
        <Button variant="outline" onClick={onUnlockAll}>Unlock All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map(app => {
          const IconComponent = iconComponents[app.icon];
          return (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-background"
            >
              <div className="flex items-center gap-4">
                {IconComponent && <IconComponent className={cn('h-6 w-6 transition-colors', app.locked ? 'text-primary' : 'text-muted-foreground')} />}
                <span className="font-medium">{app.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {app.locked ? (
                  <Lock className="h-4 w-4 text-primary transition-all" />
                ) : (
                  <Unlock className="h-4 w-4 text-muted-foreground transition-all" />
                )}
                <Switch
                  checked={app.locked}
                  onCheckedChange={() => onToggleLock(app.id)}
                  aria-label={`Lock ${app.name}`}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  );
};
