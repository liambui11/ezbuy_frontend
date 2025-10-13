// src/features/promotions/services.ts

import { mockPromotions } from './mockData';
import { Promotion } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm Mock: Lấy tất cả khuyến mãi
export const fetchPromotions = async (): Promise<Promotion[]> => {
    await delay(300);
    return JSON.parse(JSON.stringify(mockPromotions));
};

// Hàm Mock: Lấy chi tiết một khuyến mãi
export const fetchPromotionById = async (id: number): Promise<Promotion | undefined> => {
    await delay(300);
    return mockPromotions.find(promo => promo.id === id);
};

// Hàm Mock: Tạo/Cập nhật khuyến mãi (chỉ log ra)
export const savePromotionMock = async (data: Promotion) => {
    await delay(500);
    console.log(`[MOCK API] Đã lưu khuyến mãi: ${data.code}`);
    // Trong thực tế, bạn sẽ gọi fetch() hoặc axios.post/put() ở đây
    return { success: true, data: { ...data, id: data.id || Date.now() } };
};