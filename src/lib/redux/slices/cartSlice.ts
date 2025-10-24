import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Product } from "@/features/products/types";
/** ===== Types khớp với bảng products ===== */
export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
  price: number; // DECIMAL(10,2) -> nhớ Number(...) khi cần
  quantity_in_stock: number; // tồn kho
};

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  imageUrl?: string | null;
  price: number; // đơn giá chốt tại thời điểm add
  qty: number; // số lượng trong giỏ
  stock: number; // snapshot tồn kho để clamp
};

export type CartState = {
  items: Record<string, CartItem>; // productId -> CartItem
  updatedAt?: number;
};

const initialState: CartState = {
  items: {},
};

/** Clamp số lượng theo tồn kho (nếu có) */
// const clampQty = (q: number, stock?: number) => {
//   if (typeof stock === "number" && Number.isFinite(stock)) {
//     return Math.max(0, Math.min(q, Math.max(0, stock)));
//   }
//   return Math.max(0, q);
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Payload nhận đúng ProductRow + qty (tùy chọn). Không kiểm tra điều kiện gì cả.
    addItem: (state, action: PayloadAction<Product & { qty?: number }>) => {
      const {
        id,
        name,
        slug,
        imageUrl,
        price,
        quantity_in_stock,
        qty = 1,
      } = action.payload;

      const existing = state.items[id];
      const nextQty = (existing?.qty ?? 0) + qty;

      state.items[id] = {
        productId: id,
        slug,
        name,
        imageUrl: imageUrl ?? null,
        price: Number(price),
        qty: nextQty,
        stock: quantity_in_stock,
      };

      state.updatedAt = Date.now();
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; step?: number }>
    ) => {
      const { productId, step = 1 } = action.payload;
      const item = state.items[productId];
      if (!item) {
        return;
      }
      item.qty += step;
      state.updatedAt = Date.now();
    },

    reduceQuantity: (
      state,
      action: PayloadAction<{ productId: string; step?: number }>
    ) => {
      const { productId, step = 1 } = action.payload;
      const item = state.items[productId];
      if (!item) {
        return;
      }
      item.qty -= step;
      state.updatedAt = Date.now();
    },

    setQuantity: (
      state,
      action: PayloadAction<{ productId: string; qty: number }>
    ) => {
      const { productId, qty } = action.payload;
      const item = state.items[productId];
      if (!item) {
        return;
      }
      item.qty = qty;
      state.updatedAt = Date.now();
    },

    clearCart: (state) => {
      state.items = {};
      state.updatedAt = Date.now();
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  reduceQuantity,
  setQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

/** ===== Selectors cơ bản ===== */
export type RootLike = { cart: CartState };

const selectCartState = (root: RootLike) => root.cart;

export const selectItemsArray = createSelector(selectCartState, (c) =>
  Object.values(c.items)
);

export const selectCount = createSelector(selectItemsArray, (arr) =>
  arr.reduce((n, it) => n + it.qty, 0)
);

// export const selectItemsMap = createSelector(selectCartState, (c) => c.items);

// export const makeSelectItemById = () =>
//   createSelector(
//     [selectItemsMap, (_: RootLike, productId: string) => productId],
//     (items, productId) => items[productId]
//   );

// export const makeIncreaseQuantity = () => createSelector(makeSelectItemById(), (it) => it.qty );
