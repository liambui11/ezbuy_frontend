// Tuyệt đối không dùng any
export type Product = {
  id: number;
  name: string;
  description?: string;
  image_url: string;
  price: number;
  quantity_in_stock: number;
  category_id: number;
  manufacturer_id: number;
  slug: string;
};

// Ảnh nên nằm trong /public/images/... để cùng origin, tránh canvas bị "tainted"
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "EZPhone Z Pro 128GB Black",
    description: "Màn 6.7”, RAM 8GB, pin 5000 mAh",
    image_url:"/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    price: 12990000,
    quantity_in_stock: 12,
    category_id: 1,
    manufacturer_id: 1,
    slug: "ezphone-z-pro-128gb-black",
  },
  {
    id: 2,
    name: "EZPhone Z Pro 256GB Blue",
    description: "Màn 6.7”, RAM 12GB, pin 5000 mAh",
    image_url: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    price: 14990000,
    quantity_in_stock: 8,
    category_id: 1,
    manufacturer_id: 1,
    slug: "ezphone-z-pro-256gb-blue",
  },
  {
    id: 3,
    name: "EZPhone Lite 128GB White",
    description: "Màn 6.1”, RAM 6GB, pin 4200 mAh",
    image_url: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    price: 7990000,
    quantity_in_stock: 30,
    category_id: 1,
    manufacturer_id: 1,
    slug: "ezphone-lite-128gb-white",
  },
  {
    id: 4,
    name: "iFruit 15 Pro 256GB Natural",
    description: "Titan, màn 6.7”, chip X3",
    image_url: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    price: 28990000,
    quantity_in_stock: 5,
    category_id: 1,
    manufacturer_id: 2,
    slug: "ifruit-15-pro-256gb-natural",
  },
  {
    id: 5,
    name: "iFruit 15 128GB Blue",
    description: "Màn 6.1”, camera kép",
    image_url: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    price: 21990000,
    quantity_in_stock: 10,
    category_id: 1,
    manufacturer_id: 2,
    slug: "ifruit-15-128gb-blue",
  },
  {
    id: 6,
    name: "Droid S24 Ultra 512GB Gray",
    description: "Màn 6.8”, bút S, zoom 100x",
    image_url: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    price: 32990000,
    quantity_in_stock: 6,
    category_id: 1,
    manufacturer_id: 3,
    slug: "droid-s24-ultra-512gb-gray",
  },
  {
    id: 7,
    name: "Droid S24 256GB Yellow",
    description: "Màn 6.2”, viền phẳng",
    image_url: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    price: 19990000,
    quantity_in_stock: 14,
    category_id: 1,
    manufacturer_id: 3,
    slug: "droid-s24-256gb-yellow",
  },
  {
    id: 8,
    name: "Pixel 8 Pro 256GB Porcelain",
    description: "Tensor G3, camera AI",
    image_url: "/images/promotions/xiaomi_14t_pro_5g.jpg",
    price: 24990000,
    quantity_in_stock: 7,
    category_id: 1,
    manufacturer_id: 4,
    slug: "pixel-8-pro-256gb-porcelain",
  },
];
