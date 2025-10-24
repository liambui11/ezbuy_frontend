export interface Product {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  slug?: string;
  price: number;
  quantity_in_stock?: number;
  category_id?: number;
  manufacturer_id?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  manufacturerName?: string;
}
