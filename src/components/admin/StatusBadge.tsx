// src/components/admin/StatusBadge.tsx

import React from 'react';
// Định nghĩa Status type ở đây hoặc import từ features/orders/types
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';

const statusMap: Record<OrderStatus, { text: string; class: string }> = {
    PENDING: { text: 'pending', class: 'bg-[--color-warning]/10 text-[--color-warning] border-[--color-warning]' },
    CONFIRMED: { text: 'confirmed', class: 'bg-[--color-primary-200] text-[--color-primary] border-[--color-primary]' },
    SHIPPING: { text: 'shipping', class: 'bg-[--color-primary-200] text-[--color-primary] border-[--color-primary]' },
    COMPLETED: { text: 'completed', class: 'bg-[--color-success]/10 text-[--color-success] border-[--color-success]' },
    CANCELLED: { text: 'cancelled', class: 'bg-[--color-danger]/10 text-[--color-danger] border-[--color-danger]' },
};

export const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const badge = statusMap[status] || { text: 'Không rõ', class: 'bg-[--color-muted] text-[--color-secondary-600] border-[--color-secondary]' };
  
    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${badge.class}`}
      >
        {badge.text}
      </span>
    );
  };
  