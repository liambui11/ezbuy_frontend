// app/categories/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";

// ⬇️ import your ProductCard component (adjust the path if needed)
import ProductCard from "@/components/product/ProductCard";
import axios from "axios";
import { Product } from "@/features/products/types";
import { Category } from "@/features/categories/types";

/* ============================= Types ============================= */

// type Product = {
//   id: number;
//   name: string;
//   slug: string;
//   image_url: string;
//   price: number;
//   compare_at_price?: number | null;
//   in_stock: boolean;
//   category_id: number;
//   description?: string;
// };

/* ============================= Mock Data ============================= */
// const CATEGORIES: Category[] = [
//   {
//     id: 1,
//     name: "Smartphones",
//     slug: "smartphones",
//     image_url: "/images/categories/category_phone.png",
//     description:
//       "Latest Android and iOS devices with powerful cameras and performance.",
//   },
//   {
//     id: 2,
//     name: "HeadPhone",
//     slug: "headphone",
//     image_url: "/images/categories/category_headphone.png",
//     description: "Premium audio for music, calls and gaming.",
//   },
//   {
//     id: 3,
//     name: "Watch",
//     slug: "watch",
//     image_url: "/images/categories/category_watch.png",
//     description: "Wearables to track fitness and stay connected.",
//   },
// ];

// const PRODUCTS: Product[] = [
//   {
//     id: 101,
//     name: "Iphone 17 Promax",
//     slug: "iphone-17-pro-max-256gb",
//     image_url: "/images/products/iphone_17_pro_512gb.jpg",
//     price: 10990000,
//     compare_at_price: 12990000,
//     in_stock: true,
//     category_id: 1,
//     description: "Flagship performance with great camera.",
//   },

//   {
//     id: 102,
//     name: "Samsung Galaxy S26 Ultra",
//     slug: "samsung-galaxy-s26-ultra-512gb",
//     image_url: "/images/products/samsung_s26.jpg",
//     price: 29990000,
//     compare_at_price: 32990000,
//     in_stock: true,
//     category_id: 1,
//     description:
//       "The ultimate Android experience with a pro-grade camera and S Pen.",
//   },
//   {
//     id: 103,
//     name: "Xiaomi 15 Pro",
//     slug: "xiaomi-15-pro-256gb-leica",
//     image_url: "/images/products/xiaomi_15pro.png",
//     price: 21490000,
//     compare_at_price: 23990000,
//     in_stock: true,
//     category_id: 1,
//     description: "Co-engineered with Leica for stunning photography.",
//   },
//   {
//     id: 104,
//     name: "Oppo Reno12 Pro",
//     slug: "oppo-reno-12-pro-5g",
//     image_url: "/images/products/oppo-reno12-pro-5g-tim.jpg",
//     price: 14990000,
//     compare_at_price: 16500000,
//     in_stock: false,
//     category_id: 1,
//     description: "The Portrait Expert with a sleek design and fast charging.",
//   },
//   {
//     id: 105,
//     name: "Google Pixel 10",
//     slug: "google-pixel-10-128gb",
//     image_url: "/images/products/google_pixel.jpg",
//     price: 18990000,
//     compare_at_price: 20990000,
//     in_stock: true,
//     category_id: 1,
//     description: "Smart, helpful, and powered by Google AI.",
//   },
//   {
//     id: 106,
//     name: "Asus ROG Phone 9",
//     slug: "asus-rog-phone-9-ultimate",
//     image_url: "/images/products/asus-rog-phone-9-pro-1.png",
//     price: 25990000,
//     compare_at_price: 27990000,
//     in_stock: true,
//     category_id: 1,
//     description: "Unleash your gaming potential with extreme performance.",
//   },

//   {
//     id: 201,
//     name: "Tab Pro 11",
//     slug: "tab-pro-11",
//     image_url: "/images/products/tab-pro-11.jpg",
//     price: 12990000,
//     compare_at_price: null,
//     in_stock: true,
//     category_id: 2,
//     description: "Sharp display for work and play.",
//   },
//   {
//     id: 202,
//     name: "iSlate Air 10",
//     slug: "islate-air-10",
//     image_url: "/images/products/islate-air-10.jpg",
//     price: 9990000,
//     compare_at_price: 10990000,
//     in_stock: true,
//     category_id: 2,
//   },
//   {
//     id: 301,
//     name: "FastCharge 33W",
//     slug: "fastcharge-33w",
//     image_url: "/images/products/fastcharge-33w.jpg",
//     price: 390000,
//     compare_at_price: null,
//     in_stock: true,
//     category_id: 3,
//   },
//   {
//     id: 302,
//     name: "Type-C Cable 1m",
//     slug: "typec-cable-1m",
//     image_url: "/images/products/typec-cable-1m.jpg",
//     price: 149000,
//     compare_at_price: 199000,
//     in_stock: true,
//     category_id: 3,
//   },
// ];

/* ============================= Helpers ============================= */
// function getCategoryBySlug(slug: string): Category | undefined {
//   return CATEGORIES.find((c) => c.slug === slug);
// }
// function getProductsByCategory(id: number): Product[] {
//   return PRODUCTS.filter((p) => p.category_id === id);
// }
type SortKey = "price" | "name";
type SortOrder = "asc" | "desc";
/* ============================= Page ============================= */
export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // const cat = getCategoryBySlug(params.slug) ?? CATEGORIES[0];
  // const products = getProductsByCategory(cat.id);
  const { slug } = React.use(params);
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const applySort = (key: SortKey) => {
    const newOrder: SortOrder =
      key === sortKey ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  };
  const [category, setCategory] = useState<Category>();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${slug}`
      );
      setCategory(res.data.data);
    };

    fetchData()
  }, [slug]);

  useEffect(() => {
    const fetchData = async () =>{
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?categoryId=${slug}&manufacturerId=&sortBy=${sortKey}&sortDir=${sortOrder}&page=${page}&size=8`
      );
      setProducts(res.data.data.content)
      setTotalPages(res.data.data.totalPages || 1)
    }

    fetchData()
  }, [slug, sortKey, sortOrder, page]);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      {/* Header: image left (fit), name right */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-6">
        {/* Ảnh */}
        <div className="md:col-span-5 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] md:aspect-[5/4] bg-gray-50">
              {category && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-contain p-3 sm:p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* Nội dung + danh mục con + sort */}
        <div className="md:col-span-7 lg:col-span-7">
          <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-gray-100">
            {/* Tiêu đề */}
            <h1
              className="font-bold leading-tight tracking-tight text-balance"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)" }}
            >
              {category?.name}
            </h1>

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600"
            >
              <Link
                href="/"
                className="rounded-full border px-3 py-1 hover:bg-gray-50"
              >
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <span className="font-medium text-gray-700">
                {category?.name}
              </span>
            </nav>

            {/* Danh mục con (nếu có) */}
            {/* {subcategories.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Danh mục con
              </div>
              <div className="-mx-1 flex gap-2 overflow-x-auto pb-1"
                   role="listbox" aria-label="Danh mục con">
                {subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/categories/${sub.slug}`}
                    className="shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
                    role="option"
                    aria-label={sub.name}
                    title={sub.name}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          )} */}

            {/* Thanh sắp xếp */}
            <div className="mt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sort Products By
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Nút theo KEY */}
                <button
                  type="button"
                  onClick={() => applySort("price")}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm transition w-25 cursor-pointer",
                    sortKey === "price"
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
                  ].join(" ")}
                >
                  Price{" "}
                  {sortKey === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </button>

                <button
                  type="button"
                  onClick={() => applySort("name")}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm transition w-25 cursor-pointer",
                    sortKey === "name"
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
                  ].join(" ")}
                >
                  Name{" "}
                  {sortKey === "name"
                    ? sortOrder === "asc"
                      ? "A→Z"
                      : "Z→A"
                    : ""}
                </button>

                {/* (tuỳ chọn) nút reset */}
                {/* <button
                type="button"
                onClick={() => { setSortKey("price"); setSortOrder("asc"); onSortChange?.("price", "asc"); }}
                className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                Mặc định
              </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-semibold">Products in this category</h2>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-gray-500">
            No products available.
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {products.map((p) => (
              <li key={p.id} className="flex justify-center">
                <ProductCard
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  imageUrl={p.imageUrl}
                  price={p.price}
                />
              </li>
            ))}
          </ul>
          
        )}
        <div className="mt-6 flex justify-center ">
            <ReactPaginate
              breakLabel="…"
              nextLabel="Next ›"
              previousLabel="‹ Prev"
              onPageChange={({ selected }) => setPage(selected)}
              pageCount={totalPages}
              forcePage={page}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              containerClassName="flex items-center gap-1"
              pageLinkClassName="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50 cursor-pointer border-secondary-600"
              previousLinkClassName="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50 cursor-pointer border-secondary-600"
              nextLinkClassName="px-3 py-2 rounded-lg border bg-white text-sm hover:bg-gray-50 cursor-pointer border-secondary-600"
              activeLinkClassName="!bg-[#0e7cc9] !text-white !border-[#0e7cc9]"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakLinkClassName="px-2 text-gray-500 select-none"
            />
          </div>
      </section>
    </div>
  );
}
