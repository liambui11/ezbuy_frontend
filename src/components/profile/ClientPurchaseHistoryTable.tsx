// src/components/profile/ClientPurchaseHistoryTable.tsx (Đã làm đẹp giao diện)

import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Order } from '@/features/orders/types';
import { StatusBadge } from '@/components/admin/StatusBadge';

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

interface PurchaseHistoryTableProps {
  orders: Order[];
}

const tableHeaders = ['Order ID', 'Date', 'Total Amount', 'Status', 'Details'];

export const ClientPurchaseHistoryTable: React.FC<PurchaseHistoryTableProps> = ({ orders }) => {
  const tableData = orders.map(order => [
    // Order ID: Màu Primary và đậm
    <span className="font-mono text-[--color-primary] font-bold">#{order.id}</span>,
    
    // Date: Màu Secondary/xám để dịu mắt
    <span className="text-[--color-secondary-600] font-medium">
      {format(order.order_date, 'MM/dd/yyyy HH:mm')}
    </span>,
    
    // Total Amount: Màu Success và rất đậm
    <span className="font-extrabold text-[--color-success]">{formatCurrency(order.total_amount)}</span>,
    
    // Status: Dùng StatusBadge
    <StatusBadge status={order.status} />,
    
    // Details (Actions): Nút chi tiết
    <Link 
      href={`/profile/orders/${order.id}`} 
      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[--color-primary] hover:bg-[--color-primary-200] hover:text-[--color-primary-700] transition-all duration-200"
      title="View Details"
    >
      <Eye className="w-4 h-4" />
    </Link>
  ]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-[--color-border] shadow-lg">
      <table className="min-w-full divide-y divide-[--color-border]">
        
        {/* TABLE HEADER: Nền Primary nhạt, chữ Primary đậm (tạo hiệu ứng thương hiệu mạnh) */}
        <thead className="bg-primary-200]"> 
          <tr>
            {tableHeaders.map((header, index) => (
              <th 
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-extrabold uppercase tracking-wide text-[--color-primary-700]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-[--color-border]">
          {tableData.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              // MÀU XEN KẼ: Background/Card và Muted
              className={`
                ${rowIndex % 2 === 0 ? 'bg-[--color-card]' : 'bg-[--color-muted]'}
                hover:bg-[--color-primary-200]/50 transition-all duration-300
              `}
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex}
                  // Áp dụng màu foreground mặc định
                  className="px-6 py-4 whitespace-nowrap text-sm text-[--color-foreground]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="p-6 text-center text-[--color-secondary] bg-[--color-card] rounded-b-2xl">
          No purchase history found.
        </div>
      )}
    </div>
  );
};