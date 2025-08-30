"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryBadge } from "./category-badge";
import { FileBadge, type FileExt } from "./file-badge";

type Stage = "Full" | "Onboarding" | "Franchisee" | "Prospect";
type UploadRow = {
  id: string;
  name: string;
  size: string;
  ext: FileExt;
  category: string;
  aiInclusion: boolean;
  dashInclusion: boolean;
  stage: Stage;
};

const initialData: UploadRow[] = [
  {
    id: "1",
    name: "Tech requirements.pdf",
    size: "200 KB",
    ext: "pdf",
    category: "Legal",
    aiInclusion: true,
    dashInclusion: true,
    stage: "Full",
  },
  {
    id: "2",
    name: "Dashboard screenshot.jpg",
    size: "720 KB",
    ext: "jpg",
    category: "Vendors & Assets",
    aiInclusion: true,
    dashInclusion: true,
    stage: "Onboarding",
  },
  {
    id: "3",
    name: "Dashboard prototype recording.mp4",
    size: "16 MB",
    ext: "mp4",
    category: "Technology",
    aiInclusion: false,
    dashInclusion: true,
    stage: "Franchisee",
  },
  {
    id: "4",
    name: "Financial Overview",
    size: "4.2 MB",
    ext: "doc",
    category: "Financial",
    aiInclusion: true,
    dashInclusion: true,
    stage: "Prospect",
  },
  {
    id: "5",
    name: "UX Design Guidelines.docx",
    size: "400 KB",
    ext: "doc",
    category: "Legal",
    aiInclusion: true,
    dashInclusion: false,
    stage: "Onboarding",
  },
  {
    id: "6",
    name: "Dashboard interaction.aep",
    size: "12 MB",
    ext: "aep",
    category: "Legal",
    aiInclusion: true,
    dashInclusion: true,
    stage: "Onboarding",
  },
  {
    id: "7",
    name: "Briefing call recording.mp3",
    size: "18.6 MB",
    ext: "mp3",
    category: "Financial",
    aiInclusion: false,
    dashInclusion: false,
    stage: "Prospect",
  },
];

export default function UploadsTable() {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<UploadRow[]>(initialData);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const allChecked =
    filtered.length > 0 && filtered.every((r) => selected[r.id]);

  return (
    <section className="rounded-xl border bg-card shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search here.."
            className="pl-9 bg-muted/20"
            aria-label="Search uploads"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <div className="border-t overflow-x-auto rounded-b-xl">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  aria-label="Select all"
                  checked={allChecked}
                  onCheckedChange={(v) => {
                    const next: Record<string, boolean> = { ...selected };
                    filtered.forEach((r) => {
                      next[r.id] = !!v;
                    });
                    setSelected(next);
                  }}
                />
              </TableHead>
              <TableHead>Document Name</TableHead>
              <TableHead>Document Type</TableHead>
              <TableHead>AI App Inclusion</TableHead>
              <TableHead>Dashboard Inclusion</TableHead>
              <TableHead>Stage Access</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/20">
                <TableCell className="align-top pt-5">
                  <Checkbox
                    aria-label={`Select ${row.name}`}
                    checked={!!selected[row.id]}
                    onCheckedChange={(v) =>
                      setSelected((s) => ({ ...s, [row.id]: !!v }))
                    }
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <FileBadge ext={row.ext} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FileText
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden
                        />
                        <span className="truncate font-medium">{row.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {row.size}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="align-middle">
                  <CategoryBadge label={row.category} />
                </TableCell>

                <TableCell className="align-middle">
                  <Switch
                    aria-label="Toggle AI App Inclusion"
                    checked={row.aiInclusion}
                    onCheckedChange={(v) =>
                      setRows((rs) =>
                        rs.map((r) =>
                          r.id === row.id ? { ...r, aiInclusion: !!v } : r
                        )
                      )
                    }
                  />
                </TableCell>

                <TableCell className="align-middle">
                  <Switch
                    aria-label="Toggle Dashboard Inclusion"
                    checked={row.dashInclusion}
                    onCheckedChange={(v) =>
                      setRows((rs) =>
                        rs.map((r) =>
                          r.id === row.id ? { ...r, dashInclusion: !!v } : r
                        )
                      )
                    }
                  />
                </TableCell>

                <TableCell className="align-middle">
                  <Select
                    value={row.stage}
                    onValueChange={(val: Stage) =>
                      setRows((rs) =>
                        rs.map((r) =>
                          r.id === row.id ? { ...r, stage: val } : r
                        )
                      )
                    }
                  >
                    <SelectTrigger className="w-[160px] bg-muted/20">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full">Full</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                      <SelectItem value="Franchisee">Franchisee</SelectItem>
                      <SelectItem value="Prospect">Prospect</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                      aria-label={`Delete ${row.name}`}
                      onClick={() =>
                        setRows((rs) => rs.filter((r) => r.id !== row.id))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                      aria-label={`Edit ${row.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No documents match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
