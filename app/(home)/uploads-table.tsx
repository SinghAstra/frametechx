"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";

type DocType = "Legal" | "Vendors & Assets" | "Technology" | "Financial";
type Stage = "Full" | "Onboarding" | "Franchisee" | "Prospect";
type FileKind = "PDF" | "DOC" | "MP4" | "MP3" | "JPG" | "AEP";

type Upload = {
  id: string;
  fileKind: FileKind;
  name: string;
  size: string;
  docType: DocType;
  aiInclusion: boolean;
  dashboardInclusion: boolean;
  stage: Stage;
};

type FilterState = {
  types: Set<DocType>;
  stages: Set<Stage>;
  aiOnly: boolean;
  dashboardOnly: boolean;
};

const initialUploads: Upload[] = [
  {
    id: "1",
    fileKind: "PDF",
    name: "Tech requirements.pdf",
    size: "200 KB",
    docType: "Legal",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Full",
  },
  {
    id: "2",
    fileKind: "JPG",
    name: "Dashboard screenshot.jpg",
    size: "720 KB",
    docType: "Vendors & Assets",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Onboarding",
  },
  {
    id: "3",
    fileKind: "MP4",
    name: "Dashboard prototype recording.mp4",
    size: "16 MB",
    docType: "Technology",
    aiInclusion: false,
    dashboardInclusion: true,
    stage: "Franchisee",
  },
  {
    id: "4",
    fileKind: "DOC",
    name: "Financial Overview",
    size: "4.2 MB",
    docType: "Financial",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Prospect",
  },
  {
    id: "5",
    fileKind: "DOC",
    name: "UX Design Guidelines.docx",
    size: "400 KB",
    docType: "Legal",
    aiInclusion: true,
    dashboardInclusion: false,
    stage: "Onboarding",
  },
  {
    id: "6",
    fileKind: "PDF",
    name: "Dashboard interaction.aep",
    size: "12 MB",
    docType: "Legal",
    aiInclusion: true,
    dashboardInclusion: true,
    stage: "Onboarding",
  },
  {
    id: "7",
    fileKind: "MP3",
    name: "Briefing call recording.mp3",
    size: "18.6 MB",
    docType: "Financial",
    aiInclusion: false,
    dashboardInclusion: false,
    stage: "Prospect",
  },
];

const stageOptions: Stage[] = ["Full", "Onboarding", "Franchisee", "Prospect"];
const docTypeOptions: DocType[] = [
  "Legal",
  "Vendors & Assets",
  "Technology",
  "Financial",
];

export default function UploadsTable() {
  const [uploads, setUploads] = useState<Upload[]>(initialUploads);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    types: new Set(),
    stages: new Set(),
    aiOnly: false,
    dashboardOnly: false,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return uploads.filter((u) => {
      if (q && !u.name.toLowerCase().includes(q)) return false;
      if (filters.types.size && !filters.types.has(u.docType)) return false;
      if (filters.stages.size && !filters.stages.has(u.stage)) return false;
      if (filters.aiOnly && !u.aiInclusion) return false;
      if (filters.dashboardOnly && !u.dashboardInclusion) return false;
      return true;
    });
  }, [uploads, search, filters]);

  const selectAllRef = useRef<HTMLInputElement>(null);
  const allVisibleSelected =
    filtered.length > 0 && filtered.every((u) => selected.has(u.id));
  const someVisibleSelected =
    filtered.length > 0 &&
    filtered.some((u) => selected.has(u.id)) &&
    !allVisibleSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someVisibleSelected;
    }
  }, [someVisibleSelected]);

  function toggleSelectAll() {
    const next = new Set(selected);
    if (allVisibleSelected) {
      filtered.forEach((u) => next.delete(u.id));
    } else {
      filtered.forEach((u) => next.add(u.id));
    }
    setSelected(next);
  }

  function toggleRow(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function updateUpload(id: string, patch: Partial<Upload>) {
    setUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...patch } : u))
    );
  }

  function deleteUpload(id: string) {
    setUploads((prev) => prev.filter((u) => u.id !== id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  }

  return (
    <div className="w-full border">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <input
            aria-label="Search"
            className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-4"
            placeholder="Search here.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
        </div>

        <Button
          variant={"outline"}
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
        >
          <FilterIcon />
          Filters
          {activeFilterCount(filters) > 0 && (
            <span className="ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ">
              {activeFilterCount(filters)}
            </span>
          )}
        </Button>
      </div>

      {filtersOpen && (
        <FiltersPopover
          filters={filters}
          onClose={() => setFiltersOpen(false)}
          onChange={setFilters}
        />
      )}
      <div className="grid grid-cols-[1fr,2fr,1fr,1fr,3.5fr] items-center gap-4 border-b px-4 py-3 text-xs font-medium sm:text-sm">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            aria-label="Select all"
            ref={selectAllRef}
            checked={allVisibleSelected}
            onChange={toggleSelectAll}
            className="h-4 w-4 rounded"
          />
          <span>Document Name</span>
        </div>
        <div className="text-left">Document Type</div>
        <div className="text-center">AI App Inclusion</div>
        <div className="text-center">Dashboard Inclusion</div>
        <div className="text-center">Stage Access</div>
      </div>

      <ul className="divide-y">
        {filtered.map((u) => (
          <li
            key={u.id}
            className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1.5fr] items-center gap-4 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                aria-label={`Select ${u.name}`}
                checked={selected.has(u.id)}
                onChange={() => toggleRow(u.id)}
                className="h-4 w-4 rounded"
              />
              <FileBadge kind={u.fileKind} />
            </div>

            <div className="text-left overflow-hidden">
              <div className="truncate font-medium text-gray-900">{u.name}</div>
              <div className="text-xs text-gray-500">{u.size}</div>
            </div>

            {/* Doc Type */}
            <div>
              <TypePill type={u.docType} />
            </div>

            {/* AI toggle */}
            <div className="flex justify-center">
              <Switch
                checked={u.aiInclusion}
                onChange={(v) => updateUpload(u.id, { aiInclusion: v })}
                ariaLabel={`AI inclusion for ${u.name}`}
              />
            </div>

            {/* Dashboard toggle */}
            <div className="flex justify-center">
              <Switch
                checked={u.dashboardInclusion}
                onChange={(v) => updateUpload(u.id, { dashboardInclusion: v })}
                ariaLabel={`Dashboard inclusion for ${u.name}`}
              />
            </div>

            {/* Stage */}
            <div className="w-full">
              <StageSelect
                value={u.stage}
                onChange={(v) => updateUpload(u.id, { stage: v })}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pr-2 text-sm">
              <button
                className="text-gray-600 underline-offset-4 hover:text-red-600 hover:underline"
                onClick={() => deleteUpload(u.id)}
              >
                Delete
              </button>
              <button
                className="text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
                onClick={() => alert(`Edit "${u.name}"`)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-gray-500">
            No documents match your search or filters.
          </li>
        )}
      </ul>
    </div>
  );
}

/* UI Pieces */

function FileBadge({ kind }: { kind: FileKind }) {
  const colors: Record<FileKind, { bg: string; text: string; label: string }> =
    {
      PDF: { bg: "bg-red-100", text: "text-red-700", label: "PDF" },
      DOC: { bg: "bg-blue-100", text: "text-blue-700", label: "DOC" },
      MP4: { bg: "bg-orange-100", text: "text-orange-700", label: "MP4" },
      MP3: { bg: "bg-amber-100", text: "text-amber-800", label: "MP3" },
      JPG: { bg: "bg-green-100", text: "text-green-700", label: "JPG" },
      AEP: { bg: "bg-purple-100", text: "text-purple-700", label: "AEP" },
    };

  const c = colors[kind];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}

function TypePill({ type }: { type: DocType }) {
  const m: Record<DocType, { bg: string; text: string; ring: string }> = {
    Legal: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200" },
    "Vendors & Assets": {
      bg: "bg-green-50",
      text: "text-green-700",
      ring: "ring-green-200",
    },
    Technology: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      ring: "ring-orange-200",
    },
    Financial: {
      bg: "bg-pink-50",
      text: "text-pink-700",
      ring: "ring-pink-200",
    },
  };
  const c = m[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${c.bg} ${c.text} ring-1 ${c.ring}`}
    >
      {type}
    </span>
  );
}

function Switch({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${
          checked ? "bg-blue-500" : "bg-gray-300"
        } focus:outline-none focus:ring-4 focus:ring-blue-100`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

function StageSelect({
  value,
  onChange,
}: {
  value: Stage;
  onChange: (v: Stage) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value}
        <ChevronDownIcon />
      </button>
      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          {stageOptions.map((opt) => (
            <li key={opt}>
              <button
                role="option"
                aria-selected={opt === value}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50
                  ${
                    opt === value ? "bg-gray-50 text-gray-900" : "text-gray-700"
                  }`}
              >
                <span>{opt}</span>
                {opt === value && <CheckIcon />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FiltersPopover({
  filters,
  onChange,
  onClose,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  function toggleSet<T>(set: Set<T>, v: T): Set<T> {
    const n = new Set(set);
    if (n.has(v)) {
      n.delete(v);
    } else {
      n.add(v);
    }
    return n;
  }

  return (
    <div
      ref={ref}
      className="mx-4 mt-3 w-[min(28rem,calc(100%-2rem))] rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:mx-auto"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-900">
            Document Type
          </h4>
          <div className="flex flex-wrap gap-2">
            {docTypeOptions.map((t) => {
              const active = filters.types.has(t);
              return (
                <button
                  key={t}
                  onClick={() =>
                    onChange({ ...filters, types: toggleSet(filters.types, t) })
                  }
                  className={`rounded-full px-3 py-1 text-sm ring-1 transition
                    ${
                      active
                        ? "bg-blue-50 text-blue-700 ring-blue-200"
                        : "text-gray-700 ring-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-900">Stage</h4>
          <div className="flex flex-wrap gap-2">
            {stageOptions.map((s) => {
              const active = filters.stages.has(s);
              return (
                <button
                  key={s}
                  onClick={() =>
                    onChange({
                      ...filters,
                      stages: toggleSet(filters.stages, s),
                    })
                  }
                  className={`rounded-full px-3 py-1 text-sm ring-1 transition
                    ${
                      active
                        ? "bg-gray-100 text-gray-900 ring-gray-300"
                        : "text-gray-700 ring-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
        <div className="sm:col-span-2">
          <h4 className="mb-2 text-sm font-medium text-gray-900">
            Quick toggles
          </h4>
          <div className="flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.aiOnly}
                onChange={(e) =>
                  onChange({ ...filters, aiOnly: e.target.checked })
                }
              />
              AI Inclusion only
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.dashboardOnly}
                onChange={(e) =>
                  onChange({ ...filters, dashboardOnly: e.target.checked })
                }
              />
              Dashboard Inclusion only
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          className="rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          Close
        </button>
        <button
          className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 21l-4.2-4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 10l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function activeFilterCount(f: FilterState) {
  let n = 0;
  n += f.types.size;
  n += f.stages.size;
  if (f.aiOnly) n += 1;
  if (f.dashboardOnly) n += 1;
  return n;
}
