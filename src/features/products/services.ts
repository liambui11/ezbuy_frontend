import { Product } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/products"

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch products")

  const data = await res.json()
  // Nếu backend trả về { data: { content: [...] } } thì map lại
  return data.data?.content ?? data.data ?? []
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch product")
  const data = await res.json()
  return data.data
}
