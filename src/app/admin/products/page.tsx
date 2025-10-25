"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  X, Plus, Edit2, Trash2, Search,
  ChevronLeft, ChevronRight, Check, Loader2,
  Image as ImageIcon, CircleX
} from "lucide-react";

/**
 * EZPhone — Admin Product Manager (LOCAL, no API)
 * - No API calls. Uses hardcoded mock data and local state CRUD.
 * - Place at: app/(admin)/products/page.tsx
 */

/* ============================= Types ============================= */
export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Manufacturer = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  price: number; // store as USD
  quantity_in_stock: number;
  category_id: number;
  manufacturer_id: number;
  is_active: boolean; // 1/0 on DB; boolean in UI
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
const fmtMoney = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

/* ============================= MOCK DATA ============================= */
const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Smartphones", slug: "smartphones" },
  { id: 2, name: "HeadPhone", slug: "headphone" },
  { id: 3, name: "Watch", slug: "watch" },
];

const MOCK_MANUFACTURERS: Manufacturer[] = [
  { id: 1, name: "Apple", slug: "apple" },
  { id: 2, name: "Samsung", slug: "samsung" },
  { id: 3, name: "Xiaomi", slug: "xiaomi" },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1001,
    name: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max-256gb",
    description: "Titanium design, A17 Pro, Pro camera system.",
    image_url: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    price: 1299,
    quantity_in_stock: 12,
    category_id: 1,
    manufacturer_id: 1,
    is_active: true,
  },
  {
    id: 1002,
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-galaxy-s24-ultra-256gb",
    description: "Snapdragon, S-Pen, quad camera.",
    image_url: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    price: 1099,
    quantity_in_stock: 7,
    category_id: 1,
    manufacturer_id: 2,
    is_active: true,
  },
  {
    id: 1003,
    name: "AirPods Max",
    slug: "airpod-max",
    description: "ANC with hi-res audio.",
    image_url: "/images/promotions/AirPods-Max.jpg",
    price: 79.99,
    quantity_in_stock: 40,
    category_id: 2,
    manufacturer_id: 3,
    is_active: true,
  },
];

// (phần còn lại giữ nguyên, chỉ thay formatter và mock data sang USD)


/* ============================= Modal ============================= */
function Modal({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: React.ReactNode; title: string; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
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

/* ============================= Product Form ============================= */
function ProductForm({
  initial,
  categories,
  manufacturers,
  onSubmit,
  submitting,
}: {
  initial?: Partial<Product>;
  categories: Category[];
  manufacturers: Manufacturer[];
  onSubmit: (data: Omit<Product, "id"> | Partial<Product>) => void;
  submitting?: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [price, setPrice] = useState<number | "">(initial?.price ?? "");
  const [stock, setStock] = useState<number | "">(initial?.quantity_in_stock ?? "");
  const [categoryId, setCategoryId] = useState<number | "">(initial?.category_id ?? "");
  const [manufacturerId, setManufacturerId] = useState<number | "">(initial?.manufacturer_id ?? "");
  const [isActive, setIsActive] = useState<boolean>(initial?.is_active ?? true);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!initial?.id) setSlug(slugifyVi(name));
  }, [name, initial?.id]);

  const nameError = touched && !name.trim() ? "Product name is required" : "";
  const priceError = touched && (price === "" || Number(price) <= 0) ? "Price must be > 0" : "";
  const stockError = touched && (stock === "" || Number.isNaN(Number(stock)) || Number(stock) < 0) ? "Stock must be ≥ 0" : "";
  const catError = touched && !categoryId ? "Category is required" : "";
  const mfrError = touched && !manufacturerId ? "Manufacturer is required" : "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const ok = !nameError && !priceError && !stockError && !catError && !mfrError;
    if (!ok) return;
    const payload: Omit<Product, "id"> = {
      name: name.trim(),
      slug: (slug.trim() || slugifyVi(name)).toLowerCase(),
      description: description?.trim() || null,
      image_url: imageUrl?.trim() || null,
      price: Number(price),
      quantity_in_stock: Number(stock),
      category_id: Number(categoryId),
      manufacturer_id: Number(manufacturerId),
      is_active: !!isActive,
    };
    onSubmit(payload);
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name<span className="text-red-500"> *</span></label>
          <input
            className={cx(
              "w-full rounded-xl border px-3 py-2 outline-none focus:ring-2",
              nameError ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-primary/30"
            )}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g., iPhone 15 Pro Max"
          />
          {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Slug</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="iphone-15-pro-max"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Price (USD)<span className="text-red-500"> *</span></label>
          <input
            type="number" min={0} step={1000}
            className={cx(
              "w-full rounded-xl border px-3 py-2 outline-none focus:ring-2",
              priceError ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-primary/30"
            )}
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="32990000"
          />
          {priceError && <p className="mt-1 text-xs text-red-600">{priceError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Quantity In Stock<span className="text-red-500"> *</span></label>
          <input
            type="number" min={0}
            className={cx(
              "w-full rounded-xl border px-3 py-2 outline-none focus:ring-2",
              stockError ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-primary/30"
            )}
            value={stock}
            onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="10"
          />
          {stockError && <p className="mt-1 text-xs text-red-600">{stockError}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category<span className="text-red-500"> *</span></label>
          <select
            className={cx(
              "w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2",
              catError ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-primary/30"
            )}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
          >
            <option value="">(Select category)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {catError && <p className="mt-1 text-xs text-red-600">{catError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Manufacturer<span className="text-red-500"> *</span></label>
          <select
            className={cx(
              "w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2",
              mfrError ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-primary/30"
            )}
            value={manufacturerId}
            onChange={(e) => setManufacturerId(e.target.value === "" ? "" : Number(e.target.value))}
          >
            <option value="">(Select manufacturer)</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          {mfrError && <p className="mt-1 text-xs text-red-600">{mfrError}</p>}
        </div>

        <div className="md:col-span-2">
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

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            rows={4}
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description..."
          />
        </div>

        <div className="flex items-center gap-3 pt-1 md:col-span-2">
          <input id="is_active" type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
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
export default function ProductManagerPage() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // search, filter, sort, paging
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState<number | "">("");
  const [filterMfr, setFilterMfr] = useState<number | "">("");
  const [filterActive, setFilterActive] = useState<"" | "1" | "0">("");

  const [sortKey, setSortKey] = useState<keyof Product>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nextIdRef = useRef<number>(Math.max(...MOCK_PRODUCTS.map((p) => p.id)) + 1);

  // load mock
  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      setData(MOCK_PRODUCTS);
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, []);

  // lookup maps
  const catMap = useMemo(() => new Map(MOCK_CATEGORIES.map((c) => [c.id, c.name])), []);
  const mfrMap = useMemo(() => new Map(MOCK_MANUFACTURERS.map((m) => [m.id, m.name])), []);

  const filtered = useMemo(() => {
    const norm = (v: unknown) => String(v ?? "").toLowerCase();
    const arr = data.filter((p) => {
      const byQuery = [p.name, p.slug, catMap.get(p.category_id) || "", mfrMap.get(p.manufacturer_id) || ""].some((s) => norm(s).includes(norm(query)));
      const byCat = filterCat ? p.category_id === Number(filterCat) : true;
      const byMfr = filterMfr ? p.manufacturer_id === Number(filterMfr) : true;
      const byActive = filterActive === "" ? true : (p.is_active === (filterActive === "1"));
      return byQuery && byCat && byMfr && byActive;
    });

    return arr.sort((a: Product, b: Product) => {
      let va: string | number = a[sortKey] as any;
      let vb: string | number = b[sortKey] as any;
      // normalize for sorting
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, query, filterCat, filterMfr, filterActive, sortKey, sortAsc, catMap, mfrMap]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { setPage(1); }, [query, filterCat, filterMfr, filterActive]);

  function handleSort(key: keyof Product) {
    if (key === sortKey) setSortAsc((s) => !s);
    else { setSortKey(key); setSortAsc(true); }
  }

  function openCreate() { setEditing(null); setOpen(true); }
  function openEdit(p: Product) { setEditing(p); setOpen(true); }

  function handleToggleActive(p: Product) {
    setData((prev) => prev.map((x) => (x.id === p.id ? { ...x, is_active: !x.is_active } : x)));
  }

  function handleDelete(p: Product) {
    if (!confirm(`Delete product "${p.name}"?`)) return;
    setData((prev) => prev.filter((x) => x.id !== p.id));
  }

  async function submitForm(payload: Omit<Product, "id"> | Partial<Product>) {
    setSubmitting(true);
    try {
      if (editing) {
        setData((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...(payload as Partial<Product>) } : x)));
      } else {
        const newProd: Product = { id: nextIdRef.current++, ...(payload as Omit<Product, "id">) };
        setData((prev) => [newProd, ...prev]);
      }
      setOpen(false);
    } catch (e) {
      alert(errMsg(e) || "Could not save");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-sm text-gray-600">Create, edit, delete and organize products.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, slug, category, manufacturer..."
              className="w-72 rounded-xl border border-gray-300 pl-9 pr-9 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:bg-gray-100">
                <CircleX className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <select className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={filterCat} onChange={(e) => setFilterCat(e.target.value === "" ? "" : Number(e.target.value))}>
            <option value="">All Categories</option>
            {MOCK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={filterMfr} onChange={(e) => setFilterMfr(e.target.value === "" ? "" : Number(e.target.value))}>
            <option value="">All Manufacturers</option>
            {MOCK_MANUFACTURERS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <select className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={filterActive} onChange={(e) => setFilterActive(e.target.value as any)}>
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-white hover:opacity-90">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th label="#" className="w-14" />
              <Th label="Name" sortable onClick={() => handleSort("name")} active={sortKey === "name"} asc={sortAsc} />
              <Th label="Slug" sortable onClick={() => handleSort("slug")} active={sortKey === "slug"} asc={sortAsc} />
              <Th label="Category" />
              <Th label="Manufacturer" />
              <Th label="Price" sortable onClick={() => handleSort("price")} active={sortKey === "price"} asc={sortAsc} className="w-36" />
              <Th label="Stock" sortable onClick={() => handleSort("quantity_in_stock")} active={sortKey === "quantity_in_stock"} asc={sortAsc} className="w-28" />
              <Th label="Active" className="w-28" />
              <Th label="Image" className="w-24" />
              <Th label="Actions" className="w-44" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading && (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-500">
                  <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading...</span>
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={10} className="p-6 text-center text-red-600">{error}</td>
              </tr>
            )}
            {!loading && !error && paged.length === 0 && (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-500">No data</td>
              </tr>
            )}
            {!loading && !error && paged.map((p, idx) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 text-center text-sm text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                <td className="p-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">ID: {p.id}</div>
                </td>
                <td className="p-3 text-sm text-gray-700">{p.slug}</td>
                <td className="p-3 text-sm text-gray-700">{catMap.get(p.category_id) ?? "—"}</td>
                <td className="p-3 text-sm text-gray-700">{mfrMap.get(p.manufacturer_id) ?? "—"}</td>
                <td className="p-3 text-sm font-semibold">{fmtMoney(p.price)}</td>
                <td className="p-3 text-sm text-gray-700">{p.quantity_in_stock}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleActive(p)}
                    className={cx(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                      p.is_active ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
                    )}
                    title="Toggle"
                  >
                    <Check className={cx("h-3.5 w-3.5", !p.is_active && "opacity-30")} />
                    {p.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="inline-flex items-center gap-1 rounded-xl border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button onClick={() => handleDelete(p)} className="inline-flex items-center gap-1 rounded-xl border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
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
      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-gray-600">Total: {filtered.length} products</p>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50">
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm">Page {page}/{totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50">
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Product" : "Add Product"}>
        <ProductForm
          initial={editing ?? undefined}
          categories={MOCK_CATEGORIES}
          manufacturers={MOCK_MANUFACTURERS}
          submitting={submitting}
          onSubmit={submitForm}
        />
      </Modal>
    </div>
  );
}

/* ============================= Table Th ============================= */
function Th({ label, sortable, onClick, active, asc, className, }: { label: string; sortable?: boolean; onClick?: () => void; active?: boolean; asc?: boolean; className?: string; }) {
  return (
    <th className={cx("px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600", className)}>
      {sortable ? (
        <button onClick={onClick} className="inline-flex items-center gap-1">
          <span>{label}</span>
          <span className={cx("text-gray-400", active && "text-gray-800")}>{active ? (asc ? "▲" : "▼") : "↕"}</span>
        </button>
      ) : (
        <span>{label}</span>
      )}
    </th>
  );
}

