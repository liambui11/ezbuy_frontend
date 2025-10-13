// src/features/promotions/types.ts

export interface Promotion {
    id: number;
    code: string | null;
    description: string;
    discount_value: number; // Decimal (0.30 cho 30%) hoặc VND (200000)
    start_date: Date | null;
    end_date: Date | null;
    is_active: 0 | 1;
    created_by: number;
}