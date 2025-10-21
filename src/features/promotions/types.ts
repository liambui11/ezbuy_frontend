// src/features/promotions/types.ts

export interface Promotion {
    id: number;
    code: string;
    description: string;
    discountValue: number;
    startDate: string | null;
    endDate: string | null;
    is_active: number;
    created_at: string;
    updated_at: string;
  }
  
