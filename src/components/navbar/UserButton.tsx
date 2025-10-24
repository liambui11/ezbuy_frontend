"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";

type User = {
  fullName: string;
  imageUrl: string | null;
  role: string;
  email: string;
};

export default function UserButton() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        console.error("Invalid user JSON in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };
    load(); // đọc lần đầu

    // nghe sự kiện auth thay đổi
    window.addEventListener("auth:changed", load);
    // (tuỳ chọn) nghe chuyển trang để đồng bộ UI khi navigate
    window.addEventListener("popstate", load);

    return () => {
      window.removeEventListener("auth:changed", load);
      window.removeEventListener("popstate", load);
    };
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 text-primary hover:text-primary-700 transition"
      >
        <IoPersonOutline className="w-5 h-5 md:w-6 md:h-6" />
        <span className="hidden md:block font-[550] text-[15px] lg:text-[18px]">
          Login
        </span>
      </Link>
    );
  }

  const avatarSrc = user.imageUrl || "/images/profile/default-avatar.jpg";

  const logOutHandle = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    document.cookie = "role=; Path=/; Max-Age=0; SameSite=Lax";
    document.cookie = "logged_in=; Path=/; Max-Age=0; SameSite=Lax";

    window.dispatchEvent(new Event("auth:changed"));
    window.location.href = "/login"; // logout rồi reload
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="flex items-center gap-2 group"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* Avatar bằng next/image */}
        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-border">
          <Image
            src={avatarSrc}
            alt={user.fullName || "User avatar"}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>

        <span className="hidden md:block font-[550] text-[15px] lg:text-[18px] text-primary group-hover:text-primary-700 cursor-pointer">
          {user.fullName}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-card border border-border rounded-xl shadow-lg p-2 z-50 cursor-pointer"
        >
          <Link
            href="/account"
            className="block px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-primary hover:to-primary-400 hover:text-white"
          >
            Profile
          </Link>
          <Link
            href="/orders"
            className="block px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-primary hover:to-primary-400 hover:text-white"
          >
            Orders
          </Link>
          <button
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-primary hover:to-primary-400 hover:text-white cursor-pointer"
            onMouseDown={(e) => e.preventDefault()}
            onClick={logOutHandle}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
