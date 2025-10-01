"use client";

import ProductCard from "@/components/product/ProductCard";


const promotions = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    oldPrice: 34990000,
    newPrice: 29740000,
    discountPercent: 15,
    smemberDiscount: "300.000đ",
    description: "Hiệu năng cực mạnh với chip A17 Pro, camera đỉnh cao.",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    oldPrice: 29990000,
    newPrice: 25990000,
    discountPercent: 14,
    smemberDiscount: "250.000đ",
    description: "Bút S Pen đa năng, camera zoom siêu nét.",
    rating: 5,
  },
  {
    id: 3,
    name: "Xiaomi 14T Pro",
    image: "/images/promotions/xiaomi_14t_pro_5g.jpg",
    oldPrice: 15990000,
    newPrice: 12790000,
    discountPercent: 20,
    smemberDiscount: "200.000đ",
    description: "Chip Snapdragon mạnh mẽ, sạc siêu nhanh 120W.",
    rating: 4.8,
  },
  {
    id: 4,
    name: "OPPO Find X6 Pro",
    image: "/images/promotions/oppo_find_x6_pro.jpg",
    oldPrice: 22990000,
    newPrice: 19990000,
    discountPercent: 13,
    smemberDiscount: "150.000đ",
    description: "Camera Hasselblad đẳng cấp, màn hình 2K siêu sáng.",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Vivo X100 Pro 5G",
    image: "/images/promotions/huawei_p60_pro.jpg",
    oldPrice: 22990000,
    newPrice: 19990000,
    discountPercent: 13,
    smemberDiscount: "100.000đ",
    description: "Camera ZEISS chuyên nghiệp, màn hình sắc nét.",
    rating: 4.7,
  },
  {
    id: 6,
    name: "OPPO Find X6 Pro",
    image: "/images/promotions/oppo_find_x6_pro.jpg",
    oldPrice: 22990000,
    newPrice: 19990000,
    discountPercent: 13,
    smemberDiscount: "150.000đ",
    description: "Camera Hasselblad đẳng cấp, màn hình 2K siêu sáng.",
    rating: 4.6,
  },
  {
    id: 7,
    name: "Vivo X100 Pro 5G",
    image: "/images/promotions/huawei_p60_pro.jpg",
    oldPrice: 22990000,
    newPrice: 19990000,
    discountPercent: 13,
    smemberDiscount: "100.000đ",
    description: "Camera ZEISS chuyên nghiệp, màn hình sắc nét.",
    rating: 4.7,
  },
  {
    id: 8,
    name: "iPhone 15 Pro Max 256GB",
    image: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    oldPrice: 34990000,
    newPrice: 29740000,
    discountPercent: 15,
    smemberDiscount: "300.000đ",
    description: "Hiệu năng cực mạnh với chip A17 Pro, camera đỉnh cao.",
    rating: 4.9,
  },
  {
    id: 9,
    name: "Samsung Galaxy S24 Ultra",
    image: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    oldPrice: 29990000,
    newPrice: 25990000,
    discountPercent: 14,
    smemberDiscount: "250.000đ",
    description: "Bút S Pen đa năng, camera zoom siêu nét.",
    rating: 5,
  },
  {
    id: 10,
    name: "Xiaomi 14T Pro",
    image: "/images/promotions/xiaomi_14t_pro_5g.jpg",
    oldPrice: 15990000,
    newPrice: 12790000,
    discountPercent: 20,
    smemberDiscount: "200.000đ",
    description: "Chip Snapdragon mạnh mẽ, sạc siêu nhanh 120W.",
    rating: 4.8,
  },
];

export default function PromotionPage() {
  return (
    <div className="bg-primary-700 py-7 rounded-2xl shadow mb-7">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center py-3">
          📱 Khuyến mãi điện thoại HOT 🔥
        </h1>

        {/* Grid 5 cột */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {promotions.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
