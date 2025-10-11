// src/features/products/mockData.ts
import { Product } from "./types"

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 1199,
    brand: "Apple",
    imageUrl: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
    description: "The latest iPhone with A17 Pro chip and titanium design.",
    inStock: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    brand: "Samsung",
    imageUrl: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
    description: "Flagship phone with powerful camera and S Pen support.",
    inStock: true,
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    price: 999,
    brand: "Google",
    imageUrl: "/images/promotions/oppo.jpg",
    description: "Google's best smartphone with Tensor G3 and AI features.",
    inStock: false,
  },
]
