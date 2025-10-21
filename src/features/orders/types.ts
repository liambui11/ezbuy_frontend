// src/features/orders/types.ts

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface Order {
    id: number;
    user_id: number | null;
    promo_id: number | null;
    payment_id: number;
    receiver_name: string;
    shipping_address: string;
    phone: string;
    status: OrderStatus;
    order_date: Date;
    subtotal: number;
    discount_total: number;
    total_amount: number;
    confirmed_by: number | null;
    items: OrderItem[];
}