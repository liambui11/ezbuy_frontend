// src/features/products/types.ts
export interface Product {
    id: string
    name: string
    price: number
    brand: string
    image_url: string
    description?: string
    inStock: boolean
  }
  