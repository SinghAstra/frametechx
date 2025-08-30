import { cn } from "@/lib/utils";

export type FileExt = "pdf" | "doc" | "jpg" | "mp4" | "aep" | "mp3";

export function FileBadge({
  ext,
  className,
}: {
  ext: FileExt;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
      aria-label={`File type ${ext.toUpperCase()}`}
    >
      {ext.toUpperCase()}
    </span>
  );
}
