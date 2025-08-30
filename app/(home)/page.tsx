"use client";

import OnboardCard from "./onboard-card";
import ProgressCard from "./progress-card";

function Hero() {
  return (
    <div className="min-h-screen pt-16 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:px-8">
      <div className="md:col-span-1">
        <ProgressCard />
      </div>
      <div className="md:col-span-2 grid grid-cols-1 gap-4">
        <OnboardCard />
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Reference (context)</h3>
            <span className="text-xs text-muted-foreground">
              not part of final UI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
