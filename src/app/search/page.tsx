"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/features/products/hooks"

export default function SearchPage() {
  const { products, loading } = useProducts()
  const [query, setQuery] = useState("")

  // Lọc sản phẩm theo tên hoặc thương hiệu
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }, [products, query])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-[var(--color-primary)]">
        🔍 Search Products
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product name or brand..."
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl shadow-sm
                     focus:ring-2 focus:ring-[var(--color-ring)] focus:outline-none"
        />
      </div>

      {/* Kết quả */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="border border-[var(--color-border)] rounded-2xl p-4 shadow-sm
                         hover:shadow-lg transition duration-200 bg-[var(--color-card)]"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="font-semibold text-[var(--color-foreground)] truncate">
                {p.name}
              </h2>
              <p className="text-[var(--color-secondary)]">{p.brand}</p>
              <p className="text-[var(--color-primary)] font-bold mt-1">
                ${p.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
