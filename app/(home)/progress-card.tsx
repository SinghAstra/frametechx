"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type DonutProps = {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
};

function Donut({ value, size = 140, strokeWidth = 12, className }: DonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * circumference;
  const dashArray = `${dash} ${circumference - dash}`;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        role="img"
        aria-label={`Progress ${clamped}%`}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress uses currentColor so it inherits text-primary */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-2xl font-semibold text-foreground">
          {clamped}%
        </span>
      </div>
    </div>
  );
}

function StepItem({ label, done = false }: { label: string; done?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <CheckCircle2
        aria-hidden
        className={cn(
          "h-5 w-5",
          "bg-green-500 rounded-full",
          done ? "text-white" : "text-muted-foreground"
        )}
      />
    </div>
  );
}

export default function ProgressCard() {
  const progress = 85;

  return (
    <div className="px-3 py-1 border flex flex-col gap-4 h-fit">
      <h2 className="text-lg font-semibold text-foreground">
        Account Progress
      </h2>

      <div className="flex items-center justify-center">
        <Donut value={progress} />
      </div>

      <section className="rounded-lg border bg-card">
        <header className="px-4 py-3 border-b">
          <h3 className="text-sm font-medium text-foreground">
            Steps Completed
          </h3>
        </header>
        <div className="px-4">
          <StepItem label="Profile Setup" done />
          <StepItem label="Initial Training" done />
          <StepItem label="Legal Documents" done />
        </div>
      </section>

      <section className="rounded border">
        <header className="px-4 py-3 border-b">
          <h3 className="text-sm font-medium text-foreground">
            Steps Remaining
          </h3>
        </header>
        <div className="px-4">
          <StepItem label="Financial Integration" />
          <StepItem label="Final Review" />
        </div>
      </section>
    </div>
  );
}
