"use client";

import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { Product } from "@/features/products/types";
import Link from "next/link";

interface ProductCardProps extends Product {}

export default function ProductCard({
  id,
  name,
  description,
  imageUrl,
  price,
}: ProductCardProps) {
  console.log("image_url:", imageUrl);
  return (
    <Link 
    href="/products/${id}"
    className="relative bg-white border border-muted rounded-2xl shadow hover:shadow-xl transition p-4 flex flex-col w-60">
      {/* Ảnh sản phẩm */}
      <div className="flex justify-center">
        

        <Image
          src={imageUrl ?? "/images/logo/ezbuy_logo_favicon.png"}
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

      {/* Mô tả */}
      <h2 className="mt-3 text-gray-800 font-semibold text-sm line-clamp-2">
        {description}
      </h2>

      {/* Giá */}
      <div className="mt-2">
        <span className="text-red-600 font-bold text-lg">
          {price ? `$${price.toLocaleString("en-US")}` : "Contact us"}
        </span>
      </div>

      {/* Mô tả */}
      {description && (
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {description}
        </p>
      )}

      {/* Nút mua */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="flex items-center justify-center w-full py-2 bg-primary-600 text-primary-700 
                     font-semibold rounded-lg hover:bg-primary-700 transition 
                     duration-300 shadow-md hover:shadow-lg hover:text-white text-sm"
        >
          <FaCartShopping className="mr-2" />
          Buy Now
        </button>
      </div>
    </Link>
  );
}
