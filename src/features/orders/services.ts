// src/features/orders/services.ts

import { mockOrders, mockPayments } from './mockData';
import { Order, OrderStatus } from './types';

// Giả lập độ trễ khi gọi API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm Mock: Lấy tất cả đơn hàng
export const fetchOrders = async (): Promise<Order[]> => {
    await delay(300); // Giả lập network delay
    // Tạo bản sao để tránh thay đổi dữ liệu mock gốc
    return JSON.parse(JSON.stringify(mockOrders)); 
};

// Hàm Mock: Lấy chi tiết một đơn hàng
export const fetchOrderById = async (id: number): Promise<Order | undefined> => {
    await delay(300);
    return mockOrders.find(order => order.id === id);
};

// Hàm Mock: Lấy tên phương thức thanh toán
export const getPaymentMethodName = (id: number): string => {
    return mockPayments.find(p => p.id === id)?.method || 'N/A';
};

// Hàm Mock: Cập nhật trạng thái (chỉ log ra)
export const updateOrderStatusMock = async (id: number, status: OrderStatus) => {
    await delay(500);
    console.log(`[MOCK API] Đã cập nhật Đơn hàng ID:${id} sang trạng thái: ${status}`);
    // Trong thực tế, bạn sẽ gọi fetch() hoặc axios.put() ở đây
    return { success: true, newStatus: status };
};