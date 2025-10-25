import type { App, Profile, Intruder } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const initialApps: App[] = [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', locked: false, usage: 12 },
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', locked: true, usage: 25 },
  { id: 'twitter', name: 'Twitter', icon: 'Twitter', locked: false, usage: 18 },
  { id: 'youtube', name: 'YouTube', icon: 'Youtube', locked: false, usage: 30 },
  { id: 'gallery', name: 'Gallery', icon: 'Image', locked: true, usage: 5 },
  { id: 'files', name: 'File Manager', icon: 'File', locked: true, usage: 3 },
  { id: 'banking', name: 'Banking App', icon: 'Banknote', locked: true, usage: 7 },
  { id: 'slack', name: 'Slack', icon: 'Slack', locked: false, usage: 22 },
  { id: 'gmail', name: 'Gmail', icon: 'Mail', locked: false, usage: 28 },
];

export const initialProfiles: Profile[] = [
  { id: 'work', name: 'Work', icon: 'Briefcase', appIds: ['slack', 'gmail'] },
  { id: 'home', name: 'Home', icon: 'House', appIds: ['youtube', 'instagram'] },
  { id: 'all-locked', name: 'All Locked', icon: 'Moon', appIds: ['whatsapp', 'gallery', 'files', 'banking', 'instagram', 'twitter', 'slack', 'gmail', 'youtube'] },
];

const intruderImage = PlaceHolderImages.find(img => img.id === 'intruder-photo');
const photoUrl = intruderImage?.imageUrl || "https://picsum.photos/seed/fallback/200/200";
const photoHint = intruderImage?.imageHint || "person";

export const initialIntruders: Intruder[] = [
  { id: '1', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), photoUrl, photoHint },
  { id: '2', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), photoUrl, photoHint },
];
