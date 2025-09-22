// app/(store)/product/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// -------- Types --------
type Product = {
  id: number | string;
  slug: string;
  name: string;
  brand?: string;
  shortDesc?: string;
  description?: string;
  price: number;
  priceBeforeDiscount?: number | null;
  thumbnail: string;
  images?: string[];
  specs?: Record<string, string | number>;
  inStock?: boolean;
  rating?: number;
};

// -------- Hardcode DB --------
const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "iphone-15-pro-max-256gb",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    shortDesc: "Titanium design, A17 Pro, 120Hz ProMotion.",
    description:
      "iPhone 15 Pro Max with A17 Pro chip, 120Hz ProMotion display, improved cameras and USB-C. Great battery and premium build.",
    price: 1199,
    priceBeforeDiscount: 1299,
    thumbnail: "/images/hero/iphone_mockup2.png",
    images: [
      "/images/demo/iphone15pm_1.jpg",
      "/images/demo/iphone15pm_2.jpg",
      "/images/demo/iphone15pm_3.jpg",
      "/images/demo/iphone15pm_4.jpg",
    ],
    specs: {
      Display: '6.7" OLED 120Hz',
      Chipset: "A17 Pro",
      RAM: "8 GB",
      Storage: "256 GB",
      Battery: "4422 mAh",
      Camera: "48MP + 12MP + 12MP",
    },
    inStock: true,
    rating: 4.8,
  },
];

function getProductBySlug(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

// -------- Page --------
export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const discount =
    product.priceBeforeDiscount && product.priceBeforeDiscount > product.price
      ? Math.round(
          (1 - product.price / (product.priceBeforeDiscount as number)) * 100
        )
      : null;

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
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 8).map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl border">
                  <Image
                    src={src}
                    alt={`${product.name} #${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>
          )} */}
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
            {product.priceBeforeDiscount &&
              product.priceBeforeDiscount > product.price && (
                <>
                  <div className="text-lg line-through text-muted-foreground">
                    {Number(product.priceBeforeDiscount).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    )}
                  </div>
                  {discount !== null && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
          </div>

          {/* Stock + rating */}
          <div className="flex items-center gap-4 text-sm">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-current" />
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              className="rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-sm transition hover:bg-primary-700 cursor-pointer"
              disabled={!product.inStock}
            >
              Add to cart
            </button>

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
