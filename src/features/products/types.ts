export interface Product {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  slug?: string;
  price: number;
  quantityInStock?: number;
  category_id?: number;
  manufacturer_id?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  manufacturerName?: string;
}

export type ProductClient = {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  slug?: string;
  price: number;
  quantityInStock?: number;
  categoryName?: string;
  manufacturerId?: number;
  is_active?: boolean;
  manufacturerName?: string;
  categoryId?: number;
};
