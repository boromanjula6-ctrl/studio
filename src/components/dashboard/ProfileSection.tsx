import type { FC } from 'react';
import type { Profile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PowerOff, Briefcase, House, Moon, type Icon } from 'lucide-react';

interface ProfileSectionProps {
  profiles: Profile[];
  activeProfileId: string | null;
  onActivateProfile: (profileId: string | null) => void;
}

const iconComponents: { [key: string]: Icon } = {
  Briefcase,
  House,
  Moon,
};


export const ProfileSection: FC<ProfileSectionProps> = ({ profiles, activeProfileId, onActivateProfile }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Profiles</CardTitle>
        <CardDescription>Activate a profile to apply a set of locked apps.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 items-center">
        {profiles.map(profile => {
          const IconComponent = iconComponents[profile.icon];
          return (
            <Button
              key={profile.id}
              variant={activeProfileId === profile.id ? 'default' : 'secondary'}
              onClick={() => onActivateProfile(profile.id)}
              className="transition-all"
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {profile.name}
            </Button>
          )
        })}
        {activeProfileId && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onActivateProfile(null)}
            title="Deactivate Profile"
            className="rounded-full"
          >
            <PowerOff className="h-5 w-5 text-destructive" />
            <span className="sr-only">Deactivate Profile</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
