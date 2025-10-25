import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { Header } from '@/components/Header';
import { initialApps, initialProfiles, initialIntruders } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <DashboardClient
          initialApps={initialApps}
          initialProfiles={initialProfiles}
          initialIntruders={initialIntruders}
        />
      </main>
    </div>
  );
}
