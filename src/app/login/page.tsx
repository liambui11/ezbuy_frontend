"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

/*
  How to use
  ----------
  1) Save this file as: app/(auth)/login/page.tsx
     (Create the folders if they don't exist.)
  2) Ensure your Tailwind v4 theme defines brand colors, e.g. --color-primary: #0e7cc9
  3) Wire up the onSubmit() to your real API later (fetch('/api/login', ...))

  Notes
  -----
  - Uses Next.js <Image> and <Link> (no <img> / <a> as requested)
  - Pure Tailwind, no extra UI libs
  - Accessible form fields with labels & aria attributes
  - Includes a simple client-side demo validation
*/

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // very basic client-side checks
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);
      // TODO: replace with your API call
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password, remember })});
      // if (!res.ok) throw new Error("Invalid credentials");

      // Simulate successful login
      await new Promise((r) => setTimeout(r, 900));
      router.push("/"); // go home after login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">
        {/* Brand header */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="relative w-14 h-14">
            <Image
              src="/images/logo/ezphone_logo.png"
              alt="EZPhone Logo"
              fill
              sizes="56px"
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to continue shopping smart with{" "}
            <span className="font-medium text-primary">EZPhone</span>.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-card shadow-sm">
          <div className="p-6 md:p-7">
            <form onSubmit={onSubmit} className="grid gap-4">
              {error && (
                <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md px-3 py-2">
                  {error}
                </div>
              )}

              <div className="grid gap-2 border-gray-300">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 px-3 rounded-lg border border-gray-300 bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="ezphone@example.com"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 px-3 rounded-lg border border-gray-300 bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="••••••••"
                />
              </div>

              <label className="flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary/40"
                  aria-label="Remember me"
                />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-primary-foreground font-medium shadow-sm hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                aria-busy={submitting}
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

              <div className="relative py-2 text-center text-xs text-muted-foreground">
                <span className="px-2 bg-card relative z-[1]">or</span>
                <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border" />
              </div>

              {/* Social auth (optional) */}
              <div className="grid gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 h-11 rounded-lg border border-gray-300 bg-background font-medium hover:bg-accent transition"
                  onClick={() => alert("TODO: Sign in with Google")}
                >
                  <FcGoogle size={30} />
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-primary-700 font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
