"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  X, Plus, Edit2, Trash2, Search,
  ChevronLeft, ChevronRight, Check, Loader2,
  Image as ImageIcon
} from "lucide-react";

/**
 * EZPhone — Admin Category Manager (LOCAL, no API)
 * - No API calls. Uses hardcoded mock data and local state CRUD.
 * - Place at: app/(admin)/categories/page.tsx
 */

type Category = {
  id: number;
  name: string;
  slug: string;
  image_url?: string | null;
  is_active: boolean;
  parent_id?: number | null;
};

/* ============================= Helpers ============================= */
function slugifyVi(input: string): string {
  const from =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIoooooooooooooooooUUUUUUUUUUYYYYYĐ";
  const m: Record<string, string> = {};
  for (let i = 0; i < from.length; i++) m[from[i]] = to[i];
  const s = input
    .split("")
    .map((c) => m[c] || c)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");
const errMsg = (e: unknown) => (e instanceof Error ? e.message : String(e));

/* ============================= MOCK DATA ============================= */
const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Smartphones", slug: "smartphones", is_active: true, parent_id: null, image_url: "/images/categories/category_phone.png" },
  { id: 2, name: "HeadPhone", slug: "headphone", is_active: true, parent_id: 1, image_url: "/images/categories/category_headphone.png" },
  { id: 3, name: "Watch", slug: "watch", is_active: true, parent_id: 1, image_url: "/images/categories/category_watch.png" },

];

/* ============================= Modal ============================= */
function Modal({
  open, onClose, children, title,
}: {
  open: boolean; onClose: () => void; children: React.ReactNode; title: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================= Form ============================= */
function CategoryForm({
  initial, parents, onSubmit, submitting,
}: {
  initial?: Partial<Category>;
  parents: Category[];
  onSubmit: (data: Omit<Category, "id"> | Partial<Category>) => void;
  submitting?: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [parentId, setParentId] = useState<number | "" | null>(initial?.parent_id ?? "");
  const [isActive, setIsActive] = useState<boolean>(initial?.is_active ?? true);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!initial?.id) setSlug(slugifyVi(name));
  }, [name, initial?.id]);

  const nameError = touched && !name.trim() ? "Category name is required" : "";

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (!name.trim()) return;
        const payload = {
          name: name.trim(),
          slug: (slug.trim() || slugifyVi(name)).toLowerCase(),
          image_url: imageUrl.trim() || null,
          is_active: !!isActive,
          parent_id: parentId === "" ? null : (parentId as number),
        } as Omit<Category, "id">;
        onSubmit(payload);
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Category Name<span className="text-red-500"> *</span>
          </label>
          <input
            className={cx(
              "w-full rounded-xl border px-3 py-2 outline-none focus:ring-2",
              nameError ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-primary/30"
            )}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g., Smartphones"
          />
          {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Slug</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g., smartphones"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Image (URL)</label>
          <div className="flex items-center gap-2">
            <input
              className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-dashed text-gray-500">
              <ImageIcon className="h-5 w-5" />
            </span>
          </div>
          {imageUrl && (
            <div className="mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="preview"
                className="h-24 w-24 rounded-xl object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Parent</label>
          <select
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            value={parentId === null ? "" : parentId}
            onChange={(e) => setParentId(e.target.value === "" ? "" : Number(e.target.value))}
          >
            <option value="">(None)</option>
            {parents
              .filter((p) => p.id !== (initial as Category | undefined)?.id)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <input
            id="is_active"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="is_active" className="text-sm">Active</label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}<span>Save</span>
        </button>
      </div>
    </form>
  );
}

/* ============================= Page ============================= */
export default function CategoryManagerPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof Category>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // local incremental id
  const nextIdRef = useRef<number>(Math.max(...MOCK_CATEGORIES.map((c) => c.id)) + 1);

  // load mock
  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      setData(MOCK_CATEGORIES);
    } catch (e: unknown) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, []);

  // parentId -> parentName
  const parentNameMap = useMemo(() => {
    const m = new Map<number, string>();
    data.forEach((c) => m.set(c.id, c.name));
    return m;
  }, [data]);

  const filtered = useMemo(() => {
    const norm = (v: unknown) => String(v ?? "").toLowerCase();
    const arr = data.filter((c) => {
      const parentName = c.parent_id ? parentNameMap.get(c.parent_id) || "" : "";
      return [c.name, c.slug, parentName].some((s) => norm(s).includes(norm(query)));
    });
    return arr.sort((a: Category, b: Category) => {
      const va = norm(a[sortKey]);
      const vb = norm(b[sortKey]);
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, query, sortKey, sortAsc, parentNameMap]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query]);

  function handleSort(key: keyof Category) {
    if (key === sortKey) setSortAsc((s) => !s);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function handleToggleActive(cat: Category) {
    setData((prev) => prev.map((c) => (c.id === cat.id ? { ...c, is_active: !c.is_active } : c)));
  }

  function handleDelete(cat: Category) {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    setData((prev) => prev.filter((c) => c.id !== cat.id));
  }

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }
  function openEdit(cat: Category) {
    setEditing(cat);
    setOpen(true);
  }

  async function submitForm(payload: Omit<Category, "id"> | Partial<Category>) {
    setSubmitting(true);
    try {
      if (editing) {
        setData((prev) =>
          prev.map((c) => (c.id === editing.id ? { ...c, ...(payload as Partial<Category>) } : c))
        );
      } else {
        const newCat: Category = { id: nextIdRef.current++, ...(payload as Omit<Category, "id">) };
        setData((prev) => [newCat, ...prev]);
      }
      setOpen(false);
    } catch (e: unknown) {
      alert(errMsg(e) || "Could not save");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-sm text-gray-600">
            Create, edit, delete and organize product categories.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, slug, or parent..."
              className="w-72 rounded-xl border border-gray-300 pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th label="#" className="w-14" />
              <Th
                label="Name"
                sortable
                onClick={() => handleSort("name")}
                active={sortKey === "name"}
                asc={sortAsc}
              />
              <Th
                label="Slug"
                sortable
                onClick={() => handleSort("slug")}
                active={sortKey === "slug"}
                asc={sortAsc}
              />
              <Th label="Parent" />
              <Th label="Active" className="w-28" />
              <Th label="Image" className="w-24" />
              <Th label="Actions" className="w-40" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                  </span>
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-red-600">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && paged.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">No data</td>
              </tr>
            )}
            {!loading && !error && paged.map((c, idx) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-3 text-center text-sm text-gray-500">
                  {(page - 1) * pageSize + idx + 1}
                </td>
                <td className="p-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">ID: {c.id}</div>
                </td>
                <td className="p-3 text-sm text-gray-700">{c.slug}</td>
                <td className="p-3 text-sm text-gray-700">
                  {c.parent_id ? parentNameMap.get(c.parent_id) ?? "—" : "—"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleActive(c)}
                    className={cx(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                      c.is_active
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
                    )}
                    title="Toggle"
                  >
                    <Check className={cx("h-3.5 w-3.5", !c.is_active && "opacity-30")} />
                    {c.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3">
                  {c.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image_url} alt={c.name} className="h-12 w-12 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="inline-flex items-center gap-1 rounded-xl border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                    >
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      className="inline-flex items-center gap-1 rounded-xl border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Total: {filtered.length} categories</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm">Page {page}/{totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          initial={editing ?? undefined}
          parents={data}
          submitting={submitting}
          onSubmit={submitForm}
        />
      </Modal>
    </div>
  );
}

/* ============================= Table Th ============================= */
function Th({
  label, sortable, onClick, active, asc, className,
}: {
  label: string; sortable?: boolean; onClick?: () => void;
  active?: boolean; asc?: boolean; className?: string;
}) {
  return (
    <th className={cx("px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600", className)}>
      {sortable ? (
        <button onClick={onClick} className="inline-flex items-center gap-1">
          <span>{label}</span>
          <span className={cx("text-gray-400", active && "text-gray-800")}>
            {active ? (asc ? "▲" : "▼") : "↕"}
          </span>
        </button>
      ) : (
        <span>{label}</span>
      )}
    </th>
  );
}

/* ============================= Tailwind primary tokens (optional)
:root { --color-primary: 14 124 201; }  // EZPhone blue #0e7cc9
.bg-primary { background-color: rgb(var(--color-primary)); }
.text-primary { color: rgb(var(--color-primary)); }
.ring-primary\/30 { --tw-ring-color: color-mix(in srgb, rgb(var(--color-primary)) 30%, transparent); }
=================================================================== */
