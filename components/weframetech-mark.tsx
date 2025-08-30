import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function WeframeTechMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 80 56"
      role="img"
      aria-label="WeframeTech logo mark"
      className={cn("h-12 w-auto", className)}
    >
      <path d="M28 6 L34 12 L28 18 L22 12 Z" fill="#59CDD3" />
      <path
        d="M12 30 L26 44 L42 17"
        fill="none"
        stroke="#232323"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 30 L46 44 L68 8"
        fill="none"
        stroke="#59CDD3"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default WeframeTechMark;
