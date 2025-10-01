// components/promotions/SmemberDeals.tsx
"use client";
import ProductCard from "@/components/product/ProductCard";

const smemberDeals = [
  {
    id: 1,
    name: "Samsung Galaxy S23 Ultra",
    image: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    oldPrice: 28990000,
    newPrice: 25990000,
    discountPercent: 10,
    smemberDiscount: "500.000đ",
    description: "Giảm thêm cho thành viên Smember.",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    oldPrice: 29990000,
    newPrice: 25990000,
    discountPercent: 14,
    smemberDiscount: "250.000đ",
    description: "Giảm thêm cho thành viên Smember.",
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
    description: "Giảm thêm cho thành viên Smember.",
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
    description: "Giảm thêm cho thành viên Smember.",
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
    description: "Giảm thêm cho thành viên Smember.",
    rating: 4.7,
  },
];

export default function SmemberDeals() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🎁 Ưu đãi Smember
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {smemberDeals.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
