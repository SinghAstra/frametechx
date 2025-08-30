"use client";

import { Feedback, ProspectLeads } from "./feedback";
import { OnboardCard, WellBeing } from "./onboard-card";
import ProgressCard from "./progress-card";

function Hero() {
  return (
    <div className="min-h-screen pt-16 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:px-8">
      <div className="md:col-span-1">
        <ProgressCard />
      </div>
      <div className="grid grid-cols-1 px-3 py-2 gap-4 border rounded h-fit">
        <OnboardCard />
        <WellBeing />
      </div>
      <div className="grid grid-cols-1 px-3 py-2 gap-4 border rounded h-fit">
        <Feedback />
        <ProspectLeads />
      </div>
    </div>
  );
}

export default Hero;
