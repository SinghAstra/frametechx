import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeTone = "orange" | "green" | "teal" | "blue" | "rose";

const TONE_CLASSES: Record<BadgeTone, string> = {
  orange:
    "text-orange-700 border border-orange-200 bg-orange-50 dark:text-orange-100 dark:border-orange-800 dark:bg-orange-900/30",
  green:
    "text-green-700 border border-green-200 bg-green-50 dark:text-green-100 dark:border-green-800 dark:bg-green-900/30",
  teal: "text-teal-700 border border-teal-200 bg-teal-50 dark:text-teal-100 dark:border-teal-800 dark:bg-teal-900/30",
  blue: "text-blue-700 border border-blue-200 bg-blue-50 dark:text-blue-100 dark:border-blue-800 dark:bg-blue-900/30",
  rose: "text-rose-700 border border-rose-200 bg-rose-50 dark:text-rose-100 dark:border-rose-800 dark:bg-rose-900/30",
};

const DEFAULT_VALUE_TO_TONE: Record<string, BadgeTone> = {
  legal: "blue",
  "vendors & assets": "green",
  technology: "orange",
  agreement: "green",
  financial: "rose",
};

export type CategoryBadgeProps = {
  label: string;
};

export function CategoryBadge({ label }: CategoryBadgeProps) {
  const normalized = label.trim().toLowerCase();
  const tone: BadgeTone = DEFAULT_VALUE_TO_TONE[normalized];
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-sm font-medium",
        TONE_CLASSES[tone]
      )}
    >
      {label}
    </Badge>
  );
}
