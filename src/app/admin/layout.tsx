// // src/app/admin/layout.tsx

// import React from 'react';
// import Link from 'next/link';
// import { 
//   Package, Truck, Percent, Users, LayoutDashboard, LogOut, Settings, List
// } from 'lucide-react';
// // Import mock data
// import { ADMIN_NAME } from '@/features/orders/mockData'; 

// // --- Component Sidebar ---
// const AdminSidebar: React.FC = () => {
//   const navItems = [
//     { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
//     // 4 Chức năng chính
//     { href: '/admin/orders', icon: Truck, label: 'Quản lý Đơn hàng' },
//     { href: '/admin/products', icon: Package, label: 'Quản lý Sản phẩm' },
//     { href: '/admin/categories', icon: List, label: 'Quản lý Danh mục' }, // Thêm Danh mục
//     { href: '/admin/promotions', icon: Percent, label: 'Quản lý Khuyến mãi' },
//     // Chức năng phụ
//     { href: '/admin/settings', icon: Settings, label: 'Cài đặt' },
//   ];

//   return (
//     <nav className="flex flex-col space-y-2 p-4 w-64 bg-[--color-card] border-r border-[--color-border] h-full shadow-lg fixed top-0 left-0 bottom-0 overflow-y-auto z-10">
//       <div className="text-2xl font-extrabold text-[--color-primary] mb-8 mt-2">
//         EZPhone Admin
//       </div>
//       <div className="flex-1 space-y-1">
//         {navItems.map((item) => (
//           <Link 
//             key={item.href} 
//             href={item.href}
//             className="flex items-center space-x-3 p-3 rounded-lg text-[--color-foreground] hover:bg-[--color-primary-200] hover:text-[--color-primary] transition-colors duration-200"
//           >
//             <item.icon className="w-5 h-5" />
//             <span className="font-medium">{item.label}</span>
//           </Link>
//         ))}
//       </div>
      
//       <div className="pt-4 border-t border-[--color-border]">
//         <button className="flex items-center space-x-3 p-3 w-full rounded-lg text-[--color-secondary-600] hover:bg-[--color-muted] transition-colors duration-200">
//             <LogOut className="w-5 h-5" />
//             <span className="font-medium">Đăng xuất</span>
//         </button>
//       </div>
//     </nav>
//   );
// };

// // --- Admin Layout Chính ---
// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//     return (
//       // Đây là layout độc lập, chỉ chứa Sidebar và Header Admin
//       <div className="flex min-h-screen bg-[--color-background]">
//         <AdminSidebar /> 
//         <main className="flex-1 p-6 lg:p-10 ml-64"> 
//           {/* Header Admin */}
//           <header className="flex justify-between items-center pb-6 mb-6 border-b border-[--color-border]">
//             <h1 className="text-2xl font-bold text-[--color-foreground]">Quản lý Hệ thống</h1>
//             {/* ... */}
//           </header>
//           {children}
//         </main>
//       </div>
//     );
//   }
'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  LayoutDashboard,
  Tags,
  PackageSearch,
  ShoppingCart,
  Factory,
  Users,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

/**
 * EZPhone — Admin Layout & Navbar
 *
 * Drop this file at: app/(admin)/layout.tsx
 * This layout wraps all admin pages with a responsive Sidebar + Topbar (navbar),
 * supports active route highlighting, and simple user menu.
 *
 * Routes assumed:
 * - /admin/dashboard
 * - /admin/categories
 * - /admin/products
 * - /admin/orders
 * - /admin/manufacturers
 * - /admin/users
 * - /admin/settings
 *
 * Tailwind tokens for brand color (optional) — add in globals.css:
 * :root { --color-primary: 14 124 201; } // #0e7cc9
 * .bg-primary { background-color: rgb(var(--color-primary)); }
 * .text-primary { color: rgb(var(--color-primary)); }
 */

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

/* ============================= Shell ============================= */
function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <Topbar onMenu={() => setOpen(true)} />

      {/* Sidebar (mobile overlay) */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Brand />
            <button onClick={() => setOpen(false)} className="rounded p-2 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <NavList onNavigate={() => setOpen(false)} />
        </aside>
      </div>

      {/* Sidebar (desktop) */}
      <aside className="fixed left-0 top-14 hidden h-[calc(100vh-56px)] w-72 flex-col border-r bg-white lg:flex">
        <div className="overflow-y-auto p-3">
          <NavList />
        </div>
      </aside>

      {/* Content */}
      <main className="pt-14 lg:pl-72">
        <div className="mx-auto max-w-7xl p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

/* ============================= Topbar ============================= */
function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b bg-white/90 backdrop-blur">
<div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button onClick={onMenu} className="rounded p-2 hover:bg-gray-100 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Brand />
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="relative w-full max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-xl border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Quick search... (products, orders, users)"
            />
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}

function Brand() {
  return (
    <Link href="/admin/dashboard" className="flex items-center gap-2">
      <Image src="/images/logo/ezphone_logo.png" width={28} height={28} alt="EZPhone" className="rounded" />
      <span className="font-semibold tracking-tight">EZPhone <span className="text-primary">Admin</span></span>
    </Link>
  );
}

/* ============================= Sidebar Nav ============================= */
const NAV_ITEMS = [
  { href: "/admin/categories", label: "Categories", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: PackageSearch },
  { href: "/admin/promotions", label: "Promotions", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();

  return (
    <nav className="space-y- mt-15">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={
              `group flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-gray-50 ${
                active
                  ? "bg-gray-100 text-gray-900 ring-1 ring-gray-200"
                  : "text-gray-700"
              }`
            }
          >
            <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-gray-400 group-hover:text-gray-600"}`} />
            <span className="font-medium">{label}</span>
          </Link>
        );
      })}

      <div className="my-3 border-t" />

      <Link
        href="/"
        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
      >
        <LogOut className="h-4 w-4 text-gray-400" />
        <span>Exit Admin Area</span>
      </Link>
    </nav>
  );
}

/* ============================= User Menu ============================= */
function UserMenu() {
  const [open, setOpen] = React.useState(false);
  return (
<div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        <div className="h-6 w-6 overflow-hidden rounded-full bg-primary/10">
          <Image src="/images/avatar-default.png" width={24} height={24} alt="" />
        </div>
        <span className="hidden sm:inline">Admin</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-lg">
          <div className="px-4 py-3 text-sm">
            <div className="font-semibold">Admin</div>
            <div className="text-gray-500">admin@ezphone.com</div>
          </div>
          <div className="border-t" />
          <div className="p-1">
            <Link
              href="/admin/settings"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Account Settings
            </Link>
            <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}