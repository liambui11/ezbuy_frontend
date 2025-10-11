// src/features/products/hooks.ts
import { useEffect, useState } from "react"
import { Product } from "./types"
import { getAllProducts, getProductById } from "./services"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return { products, loading }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data || null)
      setLoading(false)
    })
  }, [id])

  return { product, loading }
}
