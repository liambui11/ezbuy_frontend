'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdExit } from "react-icons/io";
import { useRouter, useParams } from "next/navigation";

export default function EditPromotion() {
  const router = useRouter();
  const params = useParams(); // 👈 Lấy id từ URL
  const promotionId = params?.id;

  const [promotion, setPromotion] = useState({
    code: "",
    description: "",
    discountValue: 0,
    startDate: "",
    endDate: "",
    isActive: true,
  });

  // ✅ Lấy dữ liệu khuyến mãi theo ID khi vào trang
  useEffect(() => {
    if (!promotionId) return;

    const token = localStorage.getItem("accessToken");
    axios.get(`http://localhost:8081/api/promotions/${promotionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      const data = res.data.data;
      setPromotion({
        code: data.code || "",
        description: data.description || "",
        discountValue: data.discountValue || 0,
        startDate: data.startDate?.slice(0, 16) || "",
        endDate: data.endDate?.slice(0, 16) || "",
        isActive: data.isActive ?? true,
      });
    })
    .catch(err => {
      console.error("Error fetching promotion:", err.response?.data || err.message);
      alert("Failed to load promotion data");
    });
  }, [promotionId]);

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
      startDate: promotion.startDate ? `${promotion.startDate}:00` : null,
      endDate: promotion.endDate ? `${promotion.endDate}:00` : null,
    };

    try {
      const res = await axios.put(
        `http://localhost:8081/api/promotions/${promotionId}`, // ✅ đúng endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res.data);
      alert("Promotion updated successfully!");
      router.push("/admin/promotions");
    } catch (error: any) {
      console.error("Error updating promotion:", error.response?.data || error.message);
      alert("Error updating promotion");
    }
  };

  return (
    <div>
      <div className="flex items-center mx-10 relative">
        <div className="text-2xl font-extrabold text-primary-400">Edit Promotion</div>
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
          <div className="mb-2">
            <label className="block font-medium text-gray-700 mb-2">Code</label>
            <input
              name="code"
              value={promotion.code}
              onChange={handleChange}
              placeholder="Input Code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Description</label>
            <input
              name="description"
              value={promotion.description}
              onChange={handleChange}
              placeholder="Input Description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Discount</label>
            <input
              name="discountValue"
              value={promotion.discountValue}
              onChange={handleChange}
              placeholder="Input Discount"
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:outline-none"
            />
          </div>

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

          <div className="flex items-center justify-between mb-6 pt-4">
            <label className="font-medium text-gray-700">Active</label>
            <input
              type="checkbox"
              name="isActive"
              checked={promotion.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 cursor-pointer font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
