"use client";

import Link from "next/link";
import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectCurrentUser } from "@/store/authSlice";
import { IoPersonOutline } from "react-icons/io5";
// import { logout } from "@/store/authSlice"; // nếu bạn có action

export default function UserButton() {
//   const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

  if (true) {
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
        {/* <img
          src={user.avatarUrl || "/avatar-placeholder.png"}
          alt={user.name}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-border object-cover"
        /> */}
        {/* <span className="hidden md:block font-[550] text-[15px] lg:text-[18px] text-foreground group-hover:text-primary">
          {user.name}
        </span> */}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-card border border-border rounded-xl shadow-lg p-2 z-50"
        >
          <Link href="/account" className="block px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-primary hover:to-primary-400 hover:text-white">
            Profile
          </Link>
          <Link href="/orders" className="block px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-primary hover:to-primary-400 hover:text-white">
            Orders
          </Link>
          <button
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-primary hover:to-primary-400 hover:text-white"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              // dispatch(logout());
              // optional: router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
