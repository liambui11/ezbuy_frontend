"use client";
import { addItem, type ProductRow } from "@/lib/redux/slices/cartSlice";

import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "@/features/products/types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(addItem({ ...product, qty: 1 }));
          console.log("+1")
        }}
        className="rounded-2xl bg-primary px-6 py-3 text-primary-foreground shadow-sm transition hover:bg-primary-700 cursor-pointer"
        // disabled={!product.inStock}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCartButton;
