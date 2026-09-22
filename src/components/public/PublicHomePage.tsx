import React from 'react';
import { PublicNavbar } from './PublicNavbar';
import { PublicHero } from './PublicHero';
import { AutoDaddyPlatformSection } from './AutoDaddyPlatformSection';
import { MainServicesSection } from './MainServicesSection';
import { CommitmentAndNextDueSection } from './CommitmentAndNextDueSection';
import { MethodologyAndSoftwareSection } from './MethodologyAndSoftwareSection';
import { MobileAppAndNetworkSection } from './MobileAppAndNetworkSection';
import { PlatformCapabilitiesSection } from './PlatformCapabilitiesSection';
import { AboutUsAndFooterSection } from './AboutUsAndFooterSection';

export const PublicHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col selection:bg-[#76bc21] selection:text-black">
      <PublicNavbar />
      <main className="flex-1">
        <PublicHero />
        <AutoDaddyPlatformSection />
        <MainServicesSection />
        <CommitmentAndNextDueSection />
        <MethodologyAndSoftwareSection />
        <MobileAppAndNetworkSection />
        <PlatformCapabilitiesSection />
        <AboutUsAndFooterSection />
      </main>
    </div>
  );
};
