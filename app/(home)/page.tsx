"use client";

import { Feedback, ProspectLeads } from "./feedback";
import { OnboardCard, WellBeing } from "./onboard-card";
import ProgressCard from "./progress-card";
import UploadsTable from "./uploads-table";

function Hero() {
  return (
    <div className="pt-16 flex flex-col gap-8 ">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:px-8">
        <ProgressCard />
        <div className="grid grid-cols-1 px-3 py-2 gap-4 border rounded h-full">
          <OnboardCard />
          <WellBeing />
        </div>
        <div className="grid grid-cols-1 px-3 py-2 gap-4 border rounded h-full">
          <Feedback />
          <ProspectLeads />
        </div>
      </div>

      <section className="p-4 sm:px-8 ">
        <div className="border rounded-md">
          <header className="p-3">
            <h1 className="text-balance text-2xl font-semibold">My Uploads</h1>
            <p className="mt-1 text-sm">Documents that are uploaded by you.</p>
          </header>

          <UploadsTable />
        </div>
      </section>
    </div>
  );
}

export default Hero;
