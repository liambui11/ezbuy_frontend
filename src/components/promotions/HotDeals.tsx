"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/features/products/services"; // đường dẫn tới file bạn vừa viết
import { Product } from "@/features/products/types";

export default function PromotionPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await getAllProducts();
        // Lấy 5 sản phẩm đầu tiên (hoặc sắp xếp theo nhu cầu)
        setProducts(allProducts.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className=" py-7 rounded-xl shadow mb-7">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center py-3">
          Hot Phone Promotion
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          
          {products.map((product) => (
            <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.imageUrl ?? "/images/logo/ezbuy_logo_favicon.png"}
            price={product.price}
            slug={product.slug}
            quantity_in_stock={product.quantity_in_stock}
            category_id={product.category_id}
            manufacturer_id={product.manufacturer_id}
            is_active={product.is_active}  
            created_at={product.created_at} 
            updated_at={product.updated_at}
          />
          
          ))}
        </div>
      </div>
    </div>
  );
}
