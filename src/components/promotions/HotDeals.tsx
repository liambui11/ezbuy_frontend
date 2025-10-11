"use client";

import ProductCard from "@/components/product/ProductCard";

const promotions = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image_url: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    price: 29740000,
    description: "Hiệu năng cực mạnh với chip A17 Pro, camera đỉnh cao.",
    quantity_in_stock: 10,
    category_id: 1,
    manufacturer_id: 1,
    slug: "iphone-15-pro-max-256gb",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image_url: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    price: 25990000,
    description: "Bút S Pen đa năng, camera zoom siêu nét.",
    quantity_in_stock: 8,
    category_id: 1,
    manufacturer_id: 2,
    slug: "samsung-galaxy-s24-ultra",
  },
  {
    id: 3,
    name: "Xiaomi 14T Pro",
    image_url: "/images/promotions/xiaomi_14t_pro_5g.jpg",
    price: 12790000,
    description: "Chip Snapdragon mạnh mẽ, sạc siêu nhanh 120W.",
    quantity_in_stock: 12,
    category_id: 1,
    manufacturer_id: 3,
    slug: "xiaomi-14t-pro",
  },
  {
    id: 4,
    name: "OPPO Find X6 Pro",
    image_url: "/images/promotions/oppo_find_x6_pro.jpg",
    price: 19990000,
    description: "Camera Hasselblad đẳng cấp, màn hình 2K siêu sáng.",
    quantity_in_stock: 9,
    category_id: 1,
    manufacturer_id: 4,
    slug: "oppo-find-x6-pro",
  },
  {
    id: 5,
    name: "Vivo X100 Pro 5G",
    image_url: "/images/promotions/huawei_p60_pro.jpg",
    price: 19990000,
    description: "Camera ZEISS chuyên nghiệp, màn hình sắc nét.",
    quantity_in_stock: 7,
    category_id: 1,
    manufacturer_id: 5,
    slug: "vivo-x100-pro-5g",
  },
];

export default function PromotionPage() {
  return (
    <div className="bg-primary-700 py-7 rounded-2xl shadow mb-7">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center py-3">
          Hot Phone Promotion
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {promotions.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
