'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function AddPromotion() {
  const router = useRouter();

  const [promotion, setPromotion] = useState({
    code: "",
    description: "",
    discountValue: 0,
    startDate: "",
    endDate: "",
    active: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setPromotion(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? (value === "" ? "" : Number(value))
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const payload = {
      ...promotion,
      // chuẩn hóa ngày giờ: nếu backend yêu cầu ISO string thì dùng toISOString()
      startDate: promotion.startDate ? `${promotion.startDate}:00` : null,
      endDate: promotion.endDate ? `${promotion.endDate}:00` : null,
    };

    console.log("🚀 Payload gửi đi:", payload);

    try {
      const res = await axios.post("http://localhost:8081/api/promotions", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Response:", res.data);
      alert("✅ Promotion created successfully!");
      router.push("/admin/promotions");
    } catch (error: any) {
      // Log chi tiết hơn để biết lỗi từ đâu
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });
      } else {
        console.error("❌ Unknown error:", error);
      }

      alert("⚠️ Error creating promotion. Check console for details.");
    }
  };

  return (
    <div>
      <div className="flex items-center mx-10 relative">
        <div className="text-2xl font-extrabold text-primary-400">Add New Promotion</div>
        <button
          onClick={() => router.back()}
          className="flex items-center absolute right-3 top-1/2 text-2xl font-semibold cursor-pointer"
        >
          <IoMdExit className="text-danger" />
        </button>
      </div>

      <div className="flex justify-center items-center pt-10 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-200"
        >
          {/* Promotion Code */}
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">Promotion Code</label>
            <input
              name="code"
              value={promotion.code}
              onChange={handleChange}
              placeholder="Input Code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">Description</label>
            <input
              name="description"
              value={promotion.description}
              onChange={handleChange}
              placeholder="Input Description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
            />
          </div>

          {/* Discount */}
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">Discount Value</label>
            <input
              type="number"
              name="discountValue"
              value={promotion.discountValue}
              onChange={handleChange}
              placeholder="Input Discount Value"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
            />
          </div>

          {/* Start - End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={promotion.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={promotion.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <label className="font-medium text-gray-700">Active</label>
            <input
              type="checkbox"
              name="active"
              checked={promotion.active}
              onChange={handleChange}
              className="w-5 h-5 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary-500 cursor-pointer font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            Save Promotion
          </button>
        </form>
      </div>
    </div>
  );
}
