// src/features/promotions/mockData.ts

import { Promotion } from './types';
import { ADMIN_USER_ID } from '../orders/mockData'; // Tái sử dụng ADMIN_USER_ID

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const twoWeeksAgo = new Date(); twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
const nextMonth = new Date(); nextMonth.setMonth(nextMonth.getMonth() + 1);

export const mockPromotions: Promotion[] = [
    {
        id: 1, 
        code: 'SALE30', 
        description: '30% off for new customers', // Giảm 30% cho khách hàng mới
        discount_value: 0.30, 
        start_date: new Date('2025-01-01T00:00:00Z'), 
        end_date: nextWeek,
        is_active: 1, 
        created_by: ADMIN_USER_ID,
    },
    {
        id: 2, 
        code: 'SUMMER2025', 
        description: 'Summer discount (200K)', // Giảm giá mùa hè (200K)
        discount_value: 200, 
        start_date: new Date('2024-06-01T00:00:00Z'), 
        end_date: yesterday,
        is_active: 0, 
        created_by: 102,
    },
    {
        id: 3, 
        code: 'VIP50', 
        description: '50% off voucher for VIP customers (Upcoming)', // Phiếu giảm 50% cho khách hàng VIP (Sắp diễn ra)
        discount_value: 0.50,
        start_date: nextWeek, 
        end_date: new Date('2026-01-01T00:00:00Z'),
        is_active: 1, 
        created_by: ADMIN_USER_ID,
    },
    {
        id: 4, 
        code: 'WELCOME10', 
        description: 'Fixed $10 discount on first purchase over $100', 
        discount_value: 10.00, 
        start_date: twoWeeksAgo, 
        end_date: nextMonth, // Active
        is_active: 1, 
        created_by: ADMIN_USER_ID,
    },
    // 5. Khuyến mãi cũ đã Hết hạn (Đã từng Active)
    {
        id: 5, 
        code: 'FLASHSALE', 
        description: '48-hour flash sale - 15% off all phones', 
        discount_value: 0.15,
        start_date: new Date('2025-09-20T10:00:00Z'), 
        end_date: new Date('2025-09-22T10:00:00Z'), // Disabled / Expired
        is_active: 1, // Was active, but time passed
        created_by: 102,
    },
    // 6. Khuyến mãi Sắp diễn ra (Fixed amount, dài hạn)
    {
        id: 6, 
        code: 'HOLIDAY20', 
        description: '$20 off on accessories', 
        discount_value: 20.00,
        start_date: nextMonth, 
        end_date: new Date('2026-02-15T00:00:00Z'), // Upcoming
        is_active: 1, 
        created_by: ADMIN_USER_ID,
    },
    // 7. Khuyến mãi Vô hiệu hóa thủ công (Chưa từng chạy)
    {
        id: 7, 
        code: 'BOGO', 
        description: 'Buy One Get One 50% Off (Manual Disable)', 
        discount_value: 0.50,
        start_date: new Date('2025-11-01T00:00:00Z'), 
        end_date: new Date('2025-12-31T00:00:00Z'), 
        is_active: 0, // Disabled
        created_by: ADMIN_USER_ID,
    },
];