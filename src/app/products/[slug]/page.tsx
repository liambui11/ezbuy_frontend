"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { ProductRow } from "@/lib/redux/slices/cartSlice";
import { Product } from "@/features/products/types";
import React, { useEffect, useState } from "react";
import axios from "axios";

// -------- Page --------
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`
      );
      setProduct(res.data.data);
    };

    fetchData();
  }, [slug]);

  console.log("product:", product);
  console.log("productMan:", product?.manufacturerName);

  // return <div>product page</div>;
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
        <span className="text-foreground">{product?.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden">
            {product?.imageUrl && (
              <Image
                src={product?.imageUrl}
                alt={product?.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            {product?.name}
          </h1>

          <div className="text-sm text-muted-foreground">
            Brand: {product?.manufacturerName}
          </div>

          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-primary">
              {product?.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${
                  product?.quantity_in_stock
                    ? "bg-green-100 text-green-700"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-current" />
                {product?.quantity_in_stock ? "In stock" : "Out of stock"}
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
            {product && <AddToCartButton product={product} />}

            <button
              className="rounded-2xl border px-6 py-3 transition hover:border-primary hover:text-primary cursor-pointer"
              aria-label="Buy now"
            >
              Buy now
            </button>
          </div>

          {/* Specs */}
          {/* {product.specs && Object.keys(product.specs).length > 0 && (
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
          )} */}

          {/* Full description */}
          {product?.description && (
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
