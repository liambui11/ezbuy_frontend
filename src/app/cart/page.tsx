"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import { useAppSelector } from "@/lib/redux/hook";
import {
  clearCart,
  increaseQuantity,
  reduceQuantity,
  selectItemsArray,
  setQuantity,
} from "@/lib/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function CartPage() {
  const items = useAppSelector(selectItemsArray);
  const dispatch = useDispatch();
  console.log(items);
  // const items = [
  //   {
  //     id: "p1",
  //     name: "EZPhone Z Pro 128GB Black",
  //     slug: "ezphone-z-pro-128gb-black",
  //     imageUrl: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
  //     price: 1299,
  //     qty: 1,
  //   },
  //   {
  //     id: "p2",
  //     name: "EZ Buds 2 Wireless",
  //     slug: "ez-buds-2-wireless",
  //     imageUrl: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
  //     price: 1290,
  //     qty: 2,
  //   },
  //   {
  //     id: "p3",
  //     name: "EZ Buds 2 Wireless",
  //     slug: "ez-buds-2-wireless",
  //     imageUrl: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
  //     price: 1290,
  //     qty: 2,
  //   },
  // ];

  const currency = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  // const shipping = subtotal > 3_000 ? 0 : 30000;
  const discount = 0;
  const total = subtotal - discount;

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full p-4 ring-8 ring-primary/10">
          <div className="relative h-18 w-18 rounded-full flex items-center justify-center">
            <Image
              src="/images/logo/ezbuy_logo.png"
              alt="EZPhone"
              width={350}
              height={350}
              priority
            />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">
          Let’s find something you love. Browse our latest phones and
          accessories.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm hover:bg-primary-700"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
        Your Cart
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 ">
        {/* Items list */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-secondary bg-white shadow-sm">
            <ul className="divide-y divide-secondary">
              {items.map((it) => (
                <li key={it.productId} className="p-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/product/${it.slug}`}
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50"
                    >
                      {it.imageUrl && (
                        <Image
                          src={it.imageUrl}
                          alt={it.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      )}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/product/${it.slug}`}
                        className="line-clamp-1 font-medium hover:underline"
                      >
                        {it.name}
                      </Link>
                      <div className="mt-2 font-semibold text-secondary-600">
                        {currency(it.price)}
                      </div>
                    </div>

                    {/* Qty (static) */}
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="h-9 w-9 text-lg flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          dispatch(
                            reduceQuantity({ productId: it.productId, step: 1 })
                          )
                        }
                      >
                        −
                      </div>
                      <input
                        className="w-10 text-center font-semibold flex items-center justify-center "
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) => {
                          const raw = e.target.value;
                          // if (raw === "") {
                          //   dispatch(
                          //     setQuantity({
                          //       productId: it.productId,
                          //       qty: 0,
                          //     })
                          //   );
                          //   return;
                          // }
                          dispatch(
                            setQuantity({
                              productId: it.productId,
                              qty: Number(raw),
                            })
                          );
                        }}
                      ></input>
                      <div
                        className="h-9 w-9 text-lg flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          dispatch(
                            increaseQuantity({
                              productId: it.productId,
                              step: 1,
                            })
                          )
                        }
                      >
                        +
                      </div>
                    </div>

                    {/* total */}
                    <div className="ml-9 text-danger font-semibold min-w-30 text-center">
                      {currency(it.qty * it.price)}
                    </div>

                    <div className="ml-4 text-secondary hover:text-danger cursor-pointer">
                      <GoTrash />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Continue shopping
            </Link>
            <div
              className="text-sm hover:bg-danger hover:text-white py-1 px-2 border font-bold rounded-sm text-danger select-none cursor-pointer"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border border-secondary bg-white p-5 shadow-sm">
          <h2 className="text-lg text-success font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{items.reduce((n, it) => n + it.qty, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-gray-500">—</span>
            </div>
            <div className="my-2 h-px bg-gray-100" />
            <div className="flex justify-between text-base font-semibold text-danger">
              <span>Total</span>
              <span>{currency(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 font-medium text-primary-foreground shadow-sm hover:bg-primary-700"
          >
            Checkout
          </Link>

          <p className="mt-3 text-center text-xs text-gray-500">
            By placing your order, you agree to EZPhone’s Terms & Privacy.
          </p>
        </aside>
      </div>
    </div>
  );
}
