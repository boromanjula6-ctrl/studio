'use client';

import { useState, type FC } from 'react';
import { AppGrid } from './AppGrid';
import { ProfileSection } from './ProfileSection';
import { AiSuggestions } from './AiSuggestions';
import { IntruderAlerts } from './IntruderAlerts';
import type { App, Profile, Intruder } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface DashboardClientProps {
  initialApps: App[];
  initialProfiles: Profile[];
  initialIntruders: Intruder[];
}

export const DashboardClient: FC<DashboardClientProps> = ({
  initialApps,
  initialProfiles,
  initialIntruders,
}) => {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToggleLock = (appId: string) => {
    setApps(currentApps =>
      currentApps.map(app =>
        app.id === appId ? { ...app, locked: !app.locked } : app
      )
    );
    setActiveProfileId(null);
  };
  
  const handleLockApps = (appNames: string[]) => {
    const appNamesSet = new Set(appNames);
    setApps(currentApps =>
      currentApps.map(app =>
        appNamesSet.has(app.name) ? { ...app, locked: true } : app
      )
    );
    toast({
      title: "AI Suggestions Applied",
      description: `${appNames.length} apps have been locked.`,
    });
    setActiveProfileId(null);
  };

  const handleActivateProfile = (profileId: string | null) => {
    if (activeProfileId === profileId) {
      setActiveProfileId(null);
      toast({ description: "Profile deactivated." });
      return;
    }
    
    setActiveProfileId(profileId);
    
    if (!profileId) return;

    const profile = initialProfiles.find(p => p.id === profileId);
    if (!profile) return;

    const profileAppIds = new Set(profile.appIds);
    setApps(currentApps =>
      currentApps.map(app => ({
        ...app,
        locked: profileAppIds.has(app.id),
      }))
    );
    toast({
      title: "Profile Activated",
      description: `The "${profile.name}" profile is now active.`,
    });
  };

  const handleUnlockAll = () => {
    setApps(currentApps =>
      currentApps.map(app => ({ ...app, locked: false }))
    );
    toast({
      title: "All Apps Unlocked",
      description: "All applications have been unlocked.",
    });
    setActiveProfileId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-6 lg:space-y-8">
        <ProfileSection
          profiles={initialProfiles}
          activeProfileId={activeProfileId}
          onActivateProfile={handleActivateProfile}
        />
        <AppGrid apps={apps} onToggleLock={handleToggleLock} onUnlockAll={handleUnlockAll} />
      </div>
      <div className="lg:col-span-1 space-y-6 lg:space-y-8">
        <AiSuggestions apps={apps} onLockApps={handleLockApps} />
        <IntruderAlerts intruders={initialIntruders} />
      </div>
    </div>
  );
};
