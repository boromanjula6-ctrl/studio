import type { LucideIcon } from 'lucide-react';

export type App = {
  id: string;
  name: string;
  icon: string; // Changed from LucideIcon
  locked: boolean;
  usage: number;
};

export type Profile = {
  id: string;
  name: string;
  icon: string; // Changed from LucideIcon
  appIds: string[];
};

export type Intruder = {
  id: string;
  timestamp: Date;
  photoUrl: string;
  photoHint: string;
};
