"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

type Stage = {
  label: string;
  value: number;
  pct: number;
  tone?: "primary" | "muted";
};

function SlimBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-2 w-full rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
    >
      <div
        className="h-2 rounded-full"
        style={{ width: `${v}%`, backgroundColor: "var(--primary)" }}
      />
    </div>
  );
}

function GrowthChip({ value = "+7.4%" }: { value?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
      style={{
        color: "var(--chart-2)",
        borderColor: "var(--chart-2)",
        backgroundColor: "color-mix(in oklab, var(--chart-2) 12%, transparent)",
      }}
    >
      <TrendingUp className="h-3.5 w-3.5" aria-hidden />
      {value}
    </span>
  );
}

function StageRow({ stage }: { stage: Stage }) {
  const dotColor =
    stage.tone === "muted"
      ? "color-mix(in oklab, var(--foreground) 35%, transparent)"
      : "var(--primary)";
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden
        />
        <span className="text-sm text-foreground">{stage.label}</span>
      </div>
      <span className="text-sm font-semibold tabular-nums">
        {String(stage.value).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function OnboardCard() {
  const stages: Stage[] = [
    { label: "Stage 1 (Initial Inquiry)", value: 2, pct: 90, tone: "muted" },
    {
      label: "Stage 2 (Document Submission)",
      value: 7,
      pct: 65,
      tone: "primary",
    },
    { label: "Stage 3 ((Training))", value: 5, pct: 40, tone: "muted" },
  ];

  return (
    <Card className="h-fit">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium text-foreground">
            Total Franchisees Onboard
          </CardTitle>
          <div className="flex -space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <Avatar
                key={i}
                className="h-6 w-6 ring-2"
                style={
                  { ringColor: "var(--background)" } as React.CSSProperties
                }
              >
                <AvatarImage
                  src={`/user-.png?height=24&width=24&query=user-${i}`}
                  alt={`User ${i + 1}`}
                />
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

        <div className="mt-2 flex items-center gap-3">
          <span className="text-3xl font-semibold leading-none">14</span>
          <GrowthChip />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {stages.map((s, i) => (
            <SlimBar key={i} value={s.pct} />
          ))}
        </div>
        <div className="pt-2">
          {stages.map((s, i) => (
            <StageRow key={i} stage={s} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
