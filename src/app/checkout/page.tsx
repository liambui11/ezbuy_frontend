// File: app/checkout/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/redux/hook";
import { selectItemsArray, selectCount } from "@/lib/redux/slices/cartSlice";
import { GoTrash } from "react-icons/go";
import api from "@/lib/api/api";
import { notify } from "@/lib/notification/notistack";

// ---- Types ---------------------------------------------------------------

type ShippingMethod = "STANDARD" | "EXPRESS";
type PaymentMethod = "COD";

// ---- Helpers -------------------------------------------------------------

function currency(v: number) {
  return v.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function clampPhoneDigits(v: string) {
  return v.replace(/[^0-9+]/g, "");
}

// ---- Component -----------------------------------------------------------

export default function CheckoutPage() {
  const items = useAppSelector(selectItemsArray);

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("STANDARD");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, it) => sum + (it.price ?? 0) * (it.quantity ?? 1), 0),
    [items]
  );
  const discount = useMemo(
    () => (appliedPromo ? Math.min(subtotal * 0.05, 20) : 0),
    [appliedPromo, subtotal]
  );
  const total = useMemo(
    () => Math.max(subtotal - discount, 0),
    [subtotal, discount]
  );

  const [form, setForm] = useState({
    receiverName: "",
    phone: "",
    shippingAddress: "",
    note: "",
    promoCode: null,
  });

  const [addrUI, setAddrUI] = useState({
    addressLine: "",
    ward: "",
    province: "",
  });

  const joinAddress = ({ addressLine, ward, province }: typeof addrUI) =>
    [addressLine, ward, province].filter(Boolean).join(", ");

  useEffect(() => {
    setForm((f) => ({ ...f, shippingAddress: joinAddress(addrUI) }));
  }, [addrUI]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [agree, setAgree] = useState(true);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.receiverName.trim())
      e.receiverName = "Please enter receiver name";
    if (form.phone.replace(/\D/g, "").length < 9) e.phone = "Invalid phone";
    if (!addrUI.province) e.province = "Select province";
    if (!addrUI.ward) e.ward = "Select ward";
    if (!addrUI.addressLine.trim()) e.address = "Enter address";
    if (!agree) e.agree = "You must agree to Terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePlaceOrder() {
    if (items.length === 0) {
      notify("Your cart is empty.", { variant: "warning" });
      return;
    }
    if (!validate()) return;

    setPlacing(true);

    console.log(form);
    notify("Order successful", { variant: "success" });

    // try{
    //   const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
    // }
    // catch{

    // }
  }

  const applyPromo = async () => {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    // Mock rule: accept EZ5, PHONE5, WELCOME — give 5% up to $20
    if (["EZ5", "PHONE5", "WELCOME"].includes(code)) {
      setAppliedPromo(code);
      setPromo("");
    } else {
      notify("Invalid or expired promo code", { variant: "error" });
    }
  }

  const labelCls = "block text-sm font-medium text-gray-700 mb-1";
  const inputCls =
    "w-full rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 px-4 py-2.5 outline-none";
  const cardCls = "rounded-2xl border border-gray-200 bg-white shadow-sm";

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:pt-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-primary">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-semibold">Checkout</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Shipping & Payment */}
        <section className="xl:col-span-2 space-y-6">
          {/* Contact & Shipping Address */}
          <div className={cardCls + " p-5 md:p-6"}>
            <h2 className="text-lg font-semibold mb-4">Shipping information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Receiver full name</label>
                <input
                  className={inputCls}
                  value={form.receiverName}
                  onChange={(e) =>
                    setForm({ ...form, receiverName: e.target.value })
                  }
                  placeholder="e.g., Liam Nguyen"
                />
                {errors.receiverName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.receiverName}
                  </p>
                )}
              </div>
              <div>
                <label className={labelCls}>Phone number</label>
                <input
                  inputMode="tel"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: clampPhoneDigits(e.target.value),
                    })
                  }
                  placeholder="(+84) 912 345 678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelCls}>Province/City</label>
                <input
                  className={inputCls}
                  value={addrUI.province}
                  onChange={(e) =>
                    setAddrUI((s) => ({ ...s, province: e.target.value }))
                  }
                  placeholder="Province/City"
                ></input>
                {errors.province && (
                  <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>Ward</label>
                <input
                  className={inputCls}
                  value={addrUI.ward}
                  onChange={(e) =>
                    setAddrUI((s) => ({ ...s, ward: e.target.value }))
                  }
                  placeholder="Ward/Commune"
                />
                {errors.ward && (
                  <p className="mt-1 text-sm text-red-600">{errors.ward}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls}>Street address</label>
              <input
                className={inputCls}
                value={addrUI.addressLine}
                onChange={(e) =>
                  setAddrUI((s) => ({ ...s, addressLine: e.target.value }))
                }
                placeholder="House number, street..."
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="mt-4">
              <label className={labelCls}>Order note (optional)</label>
              <textarea
                className={inputCls}
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="e.g., Please call before delivery"
              />
            </div>

            <label className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                I agree to EZPhone’s{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms
                </Link>{" "}
                and
                <Link href="/privacy" className="text-primary hover:underline">
                  {" "}
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.agree && (
              <p className="mt-1 text-sm text-red-600">{errors.agree}</p>
            )}
          </div>

          {/* Shipping Method */}
          <div className={cardCls + " p-5 md:p-6"}>
            <h2 className="text-lg font-semibold mb-4">Shipping method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setShippingMethod("STANDARD")}
                className={`rounded-2xl border p-4 text-left transition ${
                  shippingMethod === "STANDARD"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="font-semibold">Standard</div>
                <div className="text-sm text-gray-600">3–5 business days</div>
                <div className="mt-1 text-sm">Free</div>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className={cardCls + " p-5 md:p-6"}>
            <h2 className="text-lg font-semibold mb-4">Payment method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(
                [{ key: "COD", label: "Cash on Delivery" }] as {
                  key: PaymentMethod;
                  label: string;
                }[]
              ).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setPaymentMethod(opt.key)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === opt.key
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-sm text-gray-600">
                    {opt.key === "COD" && "Pay at your door"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right: Order Summary */}
        <aside className="xl:col-span-1 space-y-6">
          <div className={cardCls + " p-5 md:p-6"}>
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>

            {/* Items */}
            <ul className="divide-y divide-gray-200">
              {items.length === 0 && (
                <li className="py-4 text-sm text-gray-500">
                  Your cart is empty.{" "}
                  <Link href="/" className="text-primary hover:underline">
                    Continue shopping
                  </Link>
                </li>
              )}

              {items.map((it) => (
                <li key={it.productId} className="py-4 flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border">
                    <Image
                      src={it.productImageUrl || "/images/placeholder.png"}
                      alt={it.productName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${it.productId}`}
                      className="line-clamp-2 text-sm font-medium hover:text-primary"
                    >
                      {it.productName}
                    </Link>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Qty: {it.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {currency((it.price ?? 0) * (it.quantity ?? 1))}
                  </div>
                </li>
              ))}
            </ul>

            {/* Promo code */}
            <div className="mt-4 flex items-center gap-2">
              <input
                className={"flex-1 " + inputCls}
                placeholder="Promo code (EZ5 / PHONE5 / WELCOME)"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />
              <button
                onClick={applyPromo}
                className="rounded-xl bg-primary px-4 py-2.5 text-white font-semibold hover:bg-primary-700 transition cursor-pointer"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="mt-1 text-xs text-green-700">
                Applied code: {appliedPromo} (5% up to $20)
              </p>
            )}

            {/* Totals */}
            <div className="mt-4 space-y-2 text-sm">
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
                <span>-{currency(discount)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{currency(total)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || items.length === 0}
              className="mt-5 w-full rounded-2xl bg-primary py-3 text-white font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {placing
                ? "Placing order..."
                : paymentMethod === "COD"
                ? "Place order"
                : "Continue to payment"}
            </button>
          </div>

          {/* Small assurance card */}
          <div className={cardCls + " p-4"}>
            <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                100% genuine products
              </li>
              {/* <li className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                7‑day returns
              </li> */}
              <li className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                Free shipping
              </li>
              {/* <li className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                Secure payments
              </li> */}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
