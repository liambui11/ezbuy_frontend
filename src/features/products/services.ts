// src/features/products/services.ts
import { Product } from "./types"
import { mockProducts } from "./mockData"

// 🧠 This file simulates API calls
// Later you can replace with real fetch like: fetch("/api/products")

export async function getAllProducts(): Promise<Product[]> {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 200))
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((res) => setTimeout(res, 200))
  return mockProducts.find((p) => p.id === id)
}
