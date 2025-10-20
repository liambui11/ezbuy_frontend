// app/(store)/product/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { ProductRow } from "@/lib/redux/slices/cartSlice";

// -------- Types --------
type Product = {
  id: string;
  name: string;
  description?: string;
  image_url?: string | null;
  slug: string;
  price: number;
  quantity_in_stock: number;
  specs?: Record<string, string | number>;
  brand?: string;
};

// -------- Hardcode DB --------
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    description:
      "iPhone 15 Pro Max with A17 Pro chip, 120Hz ProMotion display, improved cameras and USB-C. Great battery and premium build.",
    slug: "iphone-15-pro-max-256gb",
    brand: "Apple",
    price: 1199,
    image_url: "/images/hero/iphone_mockup2.png",
    specs: {
      RAM: "8 GB",
      Storage: "256 GB",
      Battery: "4422 mAh",
      Display: '6.7" OLED 120Hz',
      System: "A17 Pro",
    },
    quantity_in_stock: 10,
  },
];

// function getProductBySlug(slug: string): Product | null {
//   return PRODUCTS.find((p) => p.slug === slug) ?? null;
// }

// -------- Page --------
export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // const product = getProductBySlug(params.slug);
  const product = {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    description:
      "iPhone 15 Pro Max with A17 Pro chip, 120Hz ProMotion display, improved cameras and USB-C. Great battery and premium build.",
    slug: "iphone-15-pro-max-256gb",
    brand: "Apple",
    price: 1199,
    image_url: "/images/hero/iphone_mockup2.png",
    specs: {
      RAM: "8 GB",
      Storage: "256 GB",
      Battery: "4422 mAh",
      Display: '6.7" OLED 120Hz',
      System: "A17 Pro",
    },
    quantity_in_stock: 10,
  }
  if (!product) return notFound();
  const normalized: ProductRow = {
    ...product,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/product" className="hover:underline">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden">
            {product.image_url && (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            {product.name}
          </h1>

          {product.brand && (
            <div className="text-sm text-muted-foreground">
              Brand: {product.brand}
            </div>
          )}

          {/* Price block */}
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-primary">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            {/* Stock + rating */}
            <div className="flex items-center gap-4 text-sm">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${
                  product.quantity_in_stock
                    ? "bg-green-100 text-green-700"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-current" />
                {product.quantity_in_stock ? "In stock" : "Out of stock"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            {/* <button
              className="rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-sm transition hover:bg-primary-700 cursor-pointer"
              disabled={!product.inStock}
            >
              Add to cart
            </button> */}
            <AddToCartButton product={normalized}/>

            <button
              className="rounded-2xl border px-6 py-3 transition hover:border-primary hover:text-primary cursor-pointer"
              aria-label="Buy now"
            >
              Buy now
            </button>
          </div>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-4">
              <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between rounded-xl border px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground">{k}</span>
                    <span className="text-sm font-medium">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          {product.description && (
            <div className="prose prose-zinc max-w-none">
              <h2 className="mb-3 text-lg font-semibold">Description</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
