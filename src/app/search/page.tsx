"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/features/products/hooks";
import ProductCard from "@/components/product/ProductCard";

export default function SearchPage() {
  const { products, loading } = useProducts();
  const [query, setQuery] = useState("");

  // Lọc sản phẩm theo tên hoặc thương hiệu
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-primary">
        🔍 Search Products
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product name or brand..."
          className="w-full px-4 py-2 border border-border rounded-xl shadow-sm
                     focus:ring-2 focus:ring-ring focus:outline-none bg-card text-foreground"
        />
      </div>

      {/* Kết quả */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.description}
              image_url={p.image_url}
              price={p.price}
              // brand={p.brand}
              // inStock={p.inStock}
            />
          ))}
        </div>
      )}
    </div>
  );
}
