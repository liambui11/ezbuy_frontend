// src/features/orders/types.ts

// 💡 Trạng thái đơn hàng
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPING"
  | "COMPLETED"
  | "CANCELLED";

// 📋 Danh sách đơn hàng (rút gọn)
export interface OrderSummary {
  id: number;
  receiverName:string;
  userEmail:string;
  orderDate: string;       // ví dụ: "2025-10-26T13:38:18
  totalAmount: number;
  status: OrderStatus;
}

// 🧾 Sản phẩm trong chi tiết đơn hàng
export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  productImageUrl?: string;
}

// 📦 Chi tiết đơn hàng
export interface OrderDetail {
  id: number;
  orderDate: string;
  status: OrderStatus;
  receiverName: string;
  shippingAddress: string;
  phone: string;
  note?: string;
  paymentMethod?: string | null;
  subtotal: number;
  discountTotal: number;
  totalAmount: number;
  items: OrderItem[];
}
