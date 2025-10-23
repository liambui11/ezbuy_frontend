// File: app/checkout/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/redux/hook";
import { selectItemsArray, selectCount } from "@/lib/redux/slices/cartSlice";
import { GoTrash } from "react-icons/go";

/**
 * EZPhone Checkout Page (UI only)
 * - Pure client component (no API calls yet)
 * - Reads cart items from Redux
 * - Basic form validation
 * - Shipping + Payment selection
 * - Order Summary with dynamic totals
 * - Promo code (mock)
 */

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
//   const itemCount = useAppSelector(selectCount);

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("STANDARD");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (it.price ?? 0) * (it.qty ?? 1), 0),
    [items]
  );
//   const shippingFee = useMemo(() => calcShipping(shippingMethod, itemCount), [shippingMethod, itemCount]);
  const discount = useMemo(() => (appliedPromo ? Math.min(subtotal * 0.05, 20) : 0), [appliedPromo, subtotal]);
  const total = useMemo(() => Math.max(subtotal - discount, 0), [subtotal, discount]);

  // Basic form state (replace with react-hook-form later if you prefer)
  const [form, setForm] = useState({
    receiverName: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [agree, setAgree] = useState(true);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.receiverName.trim()) e.receiverName = "Please enter receiver name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (form.phone.replace(/\D/g, "").length < 9) e.phone = "Invalid phone";
    if (!form.province) e.province = "Select province";
    if (!form.district) e.district = "Select district";
    if (!form.ward) e.ward = "Select ward";
    if (!form.address.trim()) e.address = "Enter address";
    if (!agree) e.agree = "You must agree to Terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePlaceOrder() {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!validate()) return;

    setPlacing(true);
    // TODO: Call your backend here (Spring Boot) to create order & redirect to payment if needed
    setTimeout(() => {
      setPlacing(false);
      console.log({
        shippingMethod,
        paymentMethod,
        subtotal,
        
        discount,
        total,
        items,
        shippingInfo: form,
        appliedPromo,
      });
      alert("Order placed (demo)! Check console for payload.");
    }, 500);
  }

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    // Mock rule: accept EZ5, PHONE5, WELCOME — give 5% up to $20
    if (["EZ5", "PHONE5", "WELCOME"].includes(code)) {
      setAppliedPromo(code);
      setPromo("");
    } else {
      alert("Invalid or expired promo code");
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
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-primary">Cart</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-semibold">Checkout</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

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
                  onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
                  placeholder="e.g., Liam Nguyen"
                />
                {errors.receiverName && <p className="mt-1 text-sm text-red-600">{errors.receiverName}</p>}
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className={labelCls}>Phone number</label>
                <input
                  inputMode="tel"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: clampPhoneDigits(e.target.value) })}
                  placeholder="(+84) 912 345 678"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelCls}>Province/City</label>
                <select
                  className={inputCls}
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                >
                  <option value="">Select province</option>
                  <option>Ho Chi Minh City</option>
                  <option>Ha Noi</option>
                  <option>Da Nang</option>
                  <option>Other</option>
                </select>
                {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
              </div>
              <div>
                <label className={labelCls}>District</label>
                <input
                  className={inputCls}
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  placeholder="District name"
                />
                {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
              </div>
              <div>
                <label className={labelCls}>Ward</label>
                <input
                  className={inputCls}
                  value={form.ward}
                  onChange={(e) => setForm({ ...form, ward: e.target.value })}
                  placeholder="Ward/Commune"
                />
                {errors.ward && <p className="mt-1 text-sm text-red-600">{errors.ward}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls}>Street address</label>
              <input
                className={inputCls}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="House number, street..."
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
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
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
              <span className="text-sm text-gray-700">
                I agree to EZPhone’s <Link href="/terms" className="text-primary hover:underline">Terms</Link> and
                <Link href="/privacy" className="text-primary hover:underline"> Privacy Policy</Link>.
              </span>
            </label>
            {errors.agree && <p className="mt-1 text-sm text-red-600">{errors.agree}</p>}
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
              {/* <button
                onClick={() => setShippingMethod("EXPRESS")}
                className={`rounded-2xl border p-4 text-left transition ${
                  shippingMethod === "EXPRESS"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="font-semibold">Express</div>
                <div className="text-sm text-gray-600">1–2 business days</div>
                <div className="mt-1 text-sm">{itemCount ? currency(7.9) : currency(0)}</div>
              </button> */}
            </div>
          </div>

          {/* Payment Method */}
          <div className={cardCls + " p-5 md:p-6"}>
            <h2 className="text-lg font-semibold mb-4">Payment method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {([
                { key: "COD", label: "Cash on Delivery" },
                // { key: "VNPAY", label: "VNPay" },
                // { key: "MOMO", label: "MoMo" },
              ] as { key: PaymentMethod; label: string }[]).map((opt) => (
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
                    {/* {opt.key === "VNPAY" && "QR / Card via VNPay"}
                    {opt.key === "MOMO" && "MoMo e‑wallet"} */}
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
                  Your cart is empty. <Link href="/" className="text-primary hover:underline">Continue shopping</Link>
                </li>
              )}

              {items.map((it) => (
                <li key={it.productId} className="py-4 flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border">
                    <Image
                      src={it.imageUrl || "/images/placeholder.png"}
                      alt={it.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${it.slug}`} className="line-clamp-2 text-sm font-medium hover:text-primary">
                      {it.name}
                    </Link>
                    <div className="text-xs text-gray-500 mt-0.5">Qty: {it.qty}</div>
                  </div>
                  <div className="text-sm font-semibold">{currency((it.price ?? 0) * (it.qty ?? 1))}</div>
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
                className="rounded-xl bg-primary px-4 py-2.5 text-white font-semibold hover:bg-primary-700 transition"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="mt-1 text-xs text-green-700">Applied code: {appliedPromo} (5% up to $20)</p>
            )}

            {/* Totals */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-{currency(discount)}</span></div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{currency(total)}</span></div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || items.length === 0}
              className="mt-5 w-full rounded-2xl bg-primary py-3 text-white font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {placing ? "Placing order..." : paymentMethod === "COD" ? "Place order" : "Continue to payment"}
            </button>
            <p className="mt-2 text-center text-xs text-gray-500">Secure checkout — AES‑256 & PCI‑DSS ready (demo)</p>
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

// Tailwind color note:
// Make sure your theme defines `primary` and `primary-700` in tailwind.config or CSS variables.
// Example (Tailwind v4 tokens):
// :root { --color-primary: 14 124 201; }
// .text-primary { color: rgb(var(--color-primary)); } // if using custom utilities
