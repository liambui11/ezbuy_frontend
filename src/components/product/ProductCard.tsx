"use client";

import Image from "next/image";
import { FaStar, FaRegHeart } from "react-icons/fa";

interface ProductCardProps {
  name: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discountPercent: number;
  smemberDiscount?: string;
  studentDiscount?: string;
  description?: string;
  rating?: number;
}

export default function ProductCard({
  name,
  image,
  oldPrice,
  newPrice,
  discountPercent,
  smemberDiscount,
  studentDiscount,
  description,
  rating = 5,
}: ProductCardProps) {
  return (
    <div className="relative bg-white border rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col w-60">
      {/* Badge giảm giá */}
      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
        Giảm {discountPercent}%
      </span>

      {/* Ảnh */}
      <div className="flex justify-center">
        <Image
          src={image}
          alt={name}
          width={220}
          height={220}
          className="object-contain h-40"
        />
      </div>

      {/* Tên sản phẩm */}
      <h2 className="mt-3 text-gray-800 font-semibold text-sm line-clamp-2">
        {name}
      </h2>

      {/* Giá */}
      <div className="mt-2">
        <span className="text-red-600 font-bold text-lg">
          {newPrice.toLocaleString()}đ
        </span>
        <span className="line-through text-gray-400 ml-2 text-sm">
          {oldPrice.toLocaleString()}đ
        </span>
      </div>

      {/* Ưu đãi */}
      {smemberDiscount && (
        <p className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mt-2">
          Smember giảm đến {smemberDiscount}
        </p>
      )}
      {studentDiscount && (
        <p className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded mt-1">
          S-Student giảm thêm {studentDiscount}
        </p>
      )}

      {/* Mô tả */}
      {description && (
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{description}</p>
      )}

      {/* Rating + Yêu thích */}
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center text-yellow-500 text-sm gap-1">
          <FaStar /> <span className="text-gray-700">{rating}</span>
        </div>
        <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm">
          <FaRegHeart /> Yêu thích
        </button>
      </div>
    </div>
  );
}
