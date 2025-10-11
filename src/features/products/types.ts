// src/features/products/types.ts
export interface Product {
    id: string
    name: string
    price: number
    brand: string
    imageUrl: string
    description?: string
    inStock: boolean
  }
  