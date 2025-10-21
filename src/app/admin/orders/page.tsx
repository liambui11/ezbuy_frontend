// src/app/admin/orders/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Loader2, DollarSign, Truck, Clock, XCircle } from 'lucide-react';
import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { fetchOrders, getPaymentMethodName } from '@/features/orders/services';
import { Order } from '@/features/orders/types';
import { format } from 'date-fns';

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const OrderStatCard: React.FC<{ icon: React.ElementType, title: string, value: string, color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-primary-200 p-5 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className={`p-3 inline-flex rounded-xl bg-[${color}]/10 text-[${color}] mb-3`}>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-sm font-semibold text-[--color-secondary-600] tracking-wide">{title}</p>
    <p className="mt-1 text-3xl font-bold text-[--color-foreground]">{value}</p>
  </div>
);

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      const data = await fetchOrders();
      setOrders(data);
      setIsLoading(false);
    };
    loadOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const completedCount = orders.filter(o => o.status === 'COMPLETED').length;
  const cancelledCount = orders.filter(o => o.status === 'CANCELLED').length;

  const tableHeaders = ['Order ID', 'Customer', 'Total Amount', 'Order Date', 'Payment Method', 'Status', 'Actions'];

  const tableData = orders.map(order => [
    <span className="font-mono font-semibold">{order.id}</span>,
    <div className="flex flex-col">
      <span className="font-medium">{order.receiver_name}</span>
      <span className="text-xs">{order.phone}</span>
    </div>,
    <span className="font-bold text-primary">{formatCurrency(order.total_amount)}</span>,
    <span className="text-[--color-foreground]">{format(order.order_date, 'MM/dd/yyyy HH:mm')}</span>,
    <span className="text-sm">{getPaymentMethodName(order.payment_id)}</span>,
    <StatusBadge status={order.status} />,
    <Link
      href={`/admin/orders/${order.id}`}
      className="text-[--color-primary] hover:text-[--color-primary-700] p-2 rounded-full hover:bg-[--color-primary-200]/60 transition"
      title="View Details"
    >
      <Eye className="w-5 h-5" />
    </Link>
  ]);

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-[--color-foreground] border-l-4 border-[--color-primary] pl-3">
        Order Management
      </h2>

      {/* Statistic cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <OrderStatCard icon={DollarSign} title="Total Revenue" value={formatCurrency(totalRevenue)} color="#10b981" />
        <OrderStatCard icon={Truck} title="Completed Orders" value={completedCount.toString()} color="#0e7cc9" />
        <OrderStatCard icon={Clock} title="Pending Confirmation" value={pendingCount.toString()} color="#f59e0b" />
        <OrderStatCard icon={XCircle} title="Cancelled Orders" value={cancelledCount.toString()} color="#ef4444" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48 bg-[--color-card] rounded-xl border border-[--color-border] shadow-inner">
          <Loader2 className="w-6 h-6 animate-spin text-[--color-primary] mr-2" />
          <span className="text-[--color-secondary-600] text-sm">Loading orders...</span>
        </div>
      ) : (
        <AdminTable headers={tableHeaders} data={tableData} />
      )}
    </>
  );
}
