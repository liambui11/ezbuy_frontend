"use client";

import { useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import {useRouter} from "next/navigation"


export default function ProfileCard() {
  const [user] = useState({
    name: "Nguyen Ngoc Long",
    email: "long.nguyen@example.com",
    phone: "+84 987 654 321",
    address: "123 Nguyen Trai, District 1, Ho Chi Minh City",
    avatar: "/images/profile/default-avatar.jpg",
    orders: 3,
    spent: 500,
  });

  const router = useRouter();

  const handleEditClick = () => {
    router.push("/profile/editprofile")
  }

  const handleChangePassClick = () => {
    router.push("/profile/changepassword")
  }

  return (
    <div className="bg-card shadow-lg rounded-2xl p-8 w-full max-w-4xl mx-auto border border-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-muted">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full border-2 border-primary"
          />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{user.name}</h1>
            <p className="text-secondary text-sm">EZPhone Member</p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex items-center gap-3 bg-primary-200 px-4 py-3 rounded-xl shadow-sm w-full md:w-auto justify-center">
          <FaShoppingCart size={30} className="text-primary-700" />
          <div className="text-center">
            <div className="text-xl font-bold text-primary-700">{user.orders}</div>
            <p className="text-sm text-secondary">Total Orders</p>
          </div>
        </div>

        {/* Total Spent */}
        <div className="flex items-center gap-3 bg-primary-200 px-4 py-3 rounded-xl shadow-sm w-full md:w-auto justify-center">
          <MdAttachMoney size={30} className="text-primary-700" />
          <div className="text-center">
            <div className="text-xl font-bold text-primary-700">{user.spent}.000₫</div>
            <p className="text-sm text-secondary">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 text-foreground">
        <div>
          <p className="font-semibold text-primary">Email</p>
          <p className="bg-muted rounded-lg p-3 mt-1 text-foreground">{user.email}</p>
        </div>
        <div>
          <p className="font-semibold text-primary">Phone Number</p>
          <p className="bg-muted rounded-lg p-3 mt-1 text-foreground">{user.phone}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold text-primary">Address</p>
          <p className="bg-muted rounded-lg p-3 mt-1 text-foreground">{user.address}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button
          onClick={handleEditClick} 
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
        >
          Edit Profile
        </button>
        <button
          onClick={handleChangePassClick} 
          className="bg-muted text-foreground px-6 py-2 rounded-lg hover:bg-primary-200 transition font-medium"
        >
          Change Password
        </button>
        <button className="bg-success text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
          Purchase History
        </button>
      </div>
    </div>
  );
}
