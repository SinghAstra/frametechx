"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";

type Stage = {
  label: string;
  value: string;
  color: string;
};

function GrowthChip({ value = "+7.4%" }: { value?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs border-green-500 text-green-500">
      <TrendingUp className="h-3.5 w-3.5" aria-hidden />
      {value}
    </span>
  );
}

function StageRow({ stage }: { stage: Stage }) {
  return (
    <div className="flex items-center justify-between flex-1 py-2">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: stage.color }}
          aria-hidden
        />
        <span className="text-sm text-foreground">{stage.label}</span>
      </div>
      <span className="text-sm font-semibold">{stage.value}</span>
    </div>
  );
}

export function OnboardCard() {
  const stages: Stage[] = [
    { label: "Stage 1 ( Initial Inquiry )", value: "02", color: "#3b82f6 " },
    {
      label: "Stage 2 ( Document Submission )",
      value: "07",
      color: "#3b82f6",
    },
    { label: "Stage 3 ( Training )", value: "05", color: "#60a5fa" },
  ];

  return (
    <div className="px-3 py-2 border flex flex-col justify-evenly flex-1 rounded-md">
      <div className="pb-2 flex flex-col gap-2">
        <h2 className="text-lg font-bold ">Total Franchisees Onboard</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold leading-none">14</span>
            <GrowthChip />
          </div>
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <Avatar
                key={i}
                className="h-6 w-6 ring-2"
                style={
                  { ringColor: "var(--background)" } as React.CSSProperties
                }
              >
                <AvatarImage src={`/user-${i + 1}.jpg`} alt={`User ${i + 1}`} />
                <AvatarFallback className="text-[10px]">
                  U{i + 1}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="grid h-6 w-6 place-items-center rounded-full border bg-card text-[10px]">
              +7
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6  gap-2">
        <div className="col-span-2 bg-blue-600 h-2 rounded"></div>
        <div className="col-span-1 bg-blue-500 h-2 rounded"></div>
        <div className="col-span-3 bg-blue-400 h-2 rounded"></div>
      </div>
      <div>
        {stages.map((s, i) => (
          <StageRow key={i} stage={s} />
        ))}
      </div>
    </div>
  );
}

export function WellBeing() {
  const stages: Stage[] = [
    { label: "Stage 1 ( Initial Inquiry )", value: "02", color: "#3b82f6 " },
    {
      label: "Stage 2 ( Document Submission )",
      value: "07",
      color: "#3b82f6",
    },
    { label: "Stage 3 ( Training )", value: "05", color: "#60a5fa" },
  ];

  return (
    <div className="px-3 py-2 border flex flex-col justify-evenly flex-1 rounded-md">
      <div className="pb-2 flex flex-col gap-2">
        <h2 className="text-lg font-bold ">Financial Wellbeing</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-semibold leading-none">20</span>
            <span className="">Total Franchises</span>
          </div>
          <GrowthChip />
        </div>
      </div>
      <hr />

      <div className="flex gap-2">
        <div className="bg-muted flex-1 flex flex-col gap-2 p-2">
          <h1 className="font-light">Target</h1>
          <h1 className=" text-xl font-extrabold">$500,000</h1>
        </div>
        <div className="bg-muted flex-1 flex flex-col gap-2 p-2">
          <h1 className="font-light">Current</h1>
          <h1 className=" text-xl font-extrabold">$450,000</h1>
        </div>
      </div>
    </div>
  );
}
