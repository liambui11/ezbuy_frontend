// app/categories/[slug]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

// ⬇️ import your ProductCard component (adjust the path if needed)
import ProductCard from "@/components/product/ProductCard";

/* ============================= Types ============================= */
type Category = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  description?: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  price: number;
  compare_at_price?: number | null;
  in_stock: boolean;
  category_id: number;
  description?: string;
};

/* ============================= Mock Data ============================= */
const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Smartphones",
    slug: "smartphones",
    image_url: "/images/categories/category_phone.png",
    description:
      "Latest Android and iOS devices with powerful cameras and performance.",
  },
  {
    id: 2,
    name: "HeadPhone",
    slug: "headphone",
    image_url: "/images/categories/category_headphone.png",
    description: "Premium audio for music, calls and gaming.",
  },
  {
    id: 3,
    name: "Watch",
    slug: "watch",
    image_url: "/images/categories/category_watch.png",
    description: "Wearables to track fitness and stay connected.",
  },
];

const PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Iphone 17 Promax",
    slug: "iphone-17-pro-max-256gb",
    image_url: "/images/products/iphone_17_pro_512gb.jpg",
    price: 10990000,
    compare_at_price: 12990000,
    in_stock: true,
    category_id: 1,
    description: "Flagship performance with great camera.",
  },

  {
    id: 102,
    name: "Samsung Galaxy S26 Ultra",
    slug: "samsung-galaxy-s26-ultra-512gb",
    image_url: "/images/products/samsung_s26.jpg",
    price: 29990000,
    compare_at_price: 32990000,
    in_stock: true,
    category_id: 1,
    description:
      "The ultimate Android experience with a pro-grade camera and S Pen.",
  },
  {
    id: 103,
    name: "Xiaomi 15 Pro",
    slug: "xiaomi-15-pro-256gb-leica",
    image_url: "/images/products/xiaomi_15pro.png",
    price: 21490000,
    compare_at_price: 23990000,
    in_stock: true,
    category_id: 1,
    description: "Co-engineered with Leica for stunning photography.",
  },
  {
    id: 104,
    name: "Oppo Reno12 Pro",
    slug: "oppo-reno-12-pro-5g",
    image_url: "/images/products/oppo-reno12-pro-5g-tim.jpg",
    price: 14990000,
    compare_at_price: 16500000,
    in_stock: false,
    category_id: 1,
    description: "The Portrait Expert with a sleek design and fast charging.",
  },
  {
    id: 105,
    name: "Google Pixel 10",
    slug: "google-pixel-10-128gb",
    image_url: "/images/products/google_pixel.jpg",
    price: 18990000,
    compare_at_price: 20990000,
    in_stock: true,
    category_id: 1,
    description: "Smart, helpful, and powered by Google AI.",
  },
  {
    id: 106,
    name: "Asus ROG Phone 9",
    slug: "asus-rog-phone-9-ultimate",
    image_url: "/images/products/asus-rog-phone-9-pro-1.png",
    price: 25990000,
    compare_at_price: 27990000,
    in_stock: true,
    category_id: 1,
    description: "Unleash your gaming potential with extreme performance.",
  },

  {
    id: 201,
    name: "Tab Pro 11",
    slug: "tab-pro-11",
    image_url: "/images/products/tab-pro-11.jpg",
    price: 12990000,
    compare_at_price: null,
    in_stock: true,
    category_id: 2,
    description: "Sharp display for work and play.",
  },
  {
    id: 202,
    name: "iSlate Air 10",
    slug: "islate-air-10",
    image_url: "/images/products/islate-air-10.jpg",
    price: 9990000,
    compare_at_price: 10990000,
    in_stock: true,
    category_id: 2,
  },
  {
    id: 301,
    name: "FastCharge 33W",
    slug: "fastcharge-33w",
    image_url: "/images/products/fastcharge-33w.jpg",
    price: 390000,
    compare_at_price: null,
    in_stock: true,
    category_id: 3,
  },
  {
    id: 302,
    name: "Type-C Cable 1m",
    slug: "typec-cable-1m",
    image_url: "/images/products/typec-cable-1m.jpg",
    price: 149000,
    compare_at_price: 199000,
    in_stock: true,
    category_id: 3,
  },
];

/* ============================= Helpers ============================= */
function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
function getProductsByCategory(id: number): Product[] {
  return PRODUCTS.filter((p) => p.category_id === id);
}

/* ============================= Page ============================= */
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug) ?? CATEGORIES[0];
  const products = getProductsByCategory(cat.id);

  const { slug } = params;  

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      {/* Header: image left (fit), name right */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {/* CATEGORY IMAGE: fits inside frame */}
        <div className="md:col-span-5">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
            {/* 4:3 frame; object-contain + padding so image never overflows/crops */}
            <div className="relative w-full aspect-[4/3] bg-gray-50">
              <Image
                src={cat.image_url}
                alt={cat.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="h-full rounded-2xl bg-white p-5 shadow-sm">
            <h1 className="text-4xl font-bold sm:text-3xl">{cat.name}</h1>
            {cat.description && (
              <p className="mt-2 text-sm text-gray-600">{cat.description}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              {/* <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200">
                {products.length} products
              </span> */}
              <Link
                href="/"
                className="rounded-full border px-3 py-1 hover:bg-gray-50"
              >
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-gray-700">{cat.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products using YOUR ProductCard */}
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
                  imageUrl={p.image_url}
                  price={p.price}
                  quantity_in_stock={p.in_stoSSck ? 10 : 0} // map from in_stock
                  category_id={p.category_id}
                  manufacturer_id={0} // mock
                  slug={p.slug}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
