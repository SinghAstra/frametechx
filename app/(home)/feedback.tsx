import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export function Feedback() {
  return (
    <div className="px-3 py-2 border flex flex-col justify-evenly h-full rounded-md">
      <div className="pb-2 flex flex-col gap-2">
        <h2 className="text-lg font-bold ">Key Insights & Feedback</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-semibold leading-none">10 %</span>
            <span className="">Sales Growth</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar>
              <AvatarImage src="/user.jpg" alt="@username" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs border-primary text-primary">
              Top Performer
            </span>
          </div>
        </div>
      </div>
      <hr />

      <div className="bg-muted flex flex-col gap-2 p-2">
        <h1 className="font-bold">Feedback</h1>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-2 rounded-full bg-primary" />
          <p>Franchises are requesting more detailed training materials.</p>
        </div>
      </div>
    </div>
  );
}
export function ProspectLeads() {
  const leads = [
    {
      name: "Wade Warren",
      stage: "Initial Inquiry",
    },
    {
      name: "Ava Wright",
      stage: "Initial Inquiry",
    },
    {
      name: "Cody Fisher",
      stage: "Initial Inquiry",
    },
  ];
  return (
    <div className="px-3 py-2 border flex flex-col justify-evenly h-full rounded-md">
      <h2 className="text-lg font-bold mb-2">Prospect Leads</h2>
      {leads.map((lead, index) => {
        return (
          <div
            className="bg-muted flex justify-between items-center p-2"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={`/user-${index + 1}.jpg`} alt="@username" />
                <AvatarFallback>{lead.name}</AvatarFallback>
              </Avatar>
              <p className="font-semibold text-sm">{lead.name}</p>
            </div>
            <p className="text-muted text-xs">
              Stage : <span className="font-semibold">{lead.stage}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
