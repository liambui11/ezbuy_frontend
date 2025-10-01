"use client";

import Image from "next/image";
import { FaStar, FaRegHeart, FaBolt } from "react-icons/fa";

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

const formatCurrency = (price: number) => {
  return price.toLocaleString('vi-VN');
};

export default function FlashSaleBanner({
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
    <div className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-row items-center space-x-5 min-h-[220px]">
      
      <div className="relative w-1/4 flex-shrink-0 flex justify-center">
        <span className="absolute top-[-10px] left-[-10px] bg-danger text-white text-sm font-bold px-3 py-1 rounded-br-lg rounded-tl-lg shadow-md flex items-center">
          <FaBolt className="mr-1" /> GIẢM SỐC {discountPercent}%
        </span>

        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="object-contain h-40 w-full"
        />
      </div>

      <div className="flex-grow w-2/4">
        <h2 className="text-xl text-primary-700 font-bold line-clamp-2 hover:underline cursor-pointer">
          {name}
        </h2>
        
        {description && (
          <p className="text-sm text-foreground/80 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center text-yellow-500 text-base gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < rating ? "text-warning" : "text-secondary"} />
          ))}
          <span className="text-sm text-secondary-600 ml-1">({rating} sao)</span>
        </div>
      </div>

      <div className="w-1/4 flex-shrink-0 flex flex-col items-end space-y-2">
        <div className="text-right">
            <span className="text-danger font-extrabold text-3xl block">
                {formatCurrency(newPrice)}đ
            </span>
            <span className="line-through text-secondary ml-2 text-base block mt-1">
                {formatCurrency(oldPrice)}đ
            </span>
        </div>

        <div className="text-right">
            {smemberDiscount && (
                <p className="text-xs text-primary-700 bg-primary-200 px-2 py-1 rounded font-semibold">
                    Smember giảm thêm {smemberDiscount}
                </p>
            )}
            {studentDiscount && (
                <p className="text-xs text-secondary-600 bg-border px-2 py-1 rounded mt-1">
                    S-Student giảm {studentDiscount}
                </p>
            )}
        </div>

        <button className="w-full mt-3 bg-primary hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition shadow-md">
          MUA NGAY
        </button>
        
        <button className="text-sm text-primary-700 hover:text-primary underline mt-1 flex items-center gap-1">
            <FaRegHeart /> Thêm vào yêu thích
        </button>
      </div>
    </div>
  );
}