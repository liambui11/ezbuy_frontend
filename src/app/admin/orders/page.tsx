'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Loader2, DollarSign, Truck, Clock, XCircle, CheckCircle, PackageCheck } from 'lucide-react';
import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { cancelMyOrder, fetchAllOrdersForAdmin, updateOrderStatusByAdmin } from '@/features/orders/services';
import { OrderSummary, OrderStatus } from '@/features/orders/types';
import { format } from 'date-fns';
import { axiosInstance } from '@/utils/axiosInstance';
import { FaSearch } from "react-icons/fa";
import { searchOrders } from "@/features/orders/services";
import { toast } from "react-hot-toast";


/* Định dạng tiền tệ */
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

/* Component thống kê */
const OrderStatCard: React.FC<{ icon: React.ElementType; title: string; value: string; color: string }> = ({
  icon: Icon,
  title,
  value,
  color,
}) => (
  <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20`, color }}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-sm font-semibold text-gray-600 tracking-wide">{title}</p>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function AdminOrderListPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search,setSearch] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dataOrder = await fetchAllOrdersForAdmin(0, 50, 'orderDate', 'desc');
        console.log("Orders fetched:", dataOrder);
        setOrders(dataOrder.content);
      } catch (err: any) {
        console.error('Failed to fetch orders:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  // async function handleSearch(e?: React.FormEvent) {
  //   if (e) e.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     const res = await searchOrders(search, 0, 10);
  //     setOrders(res.content);
  //   } catch (err: any) {
  //     console.error(err);
  //     toast.error("Search failed!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const handleUpdateStatus = async (id: number, newStatus: OrderStatus) => {
    if (!window.confirm(`Are you sure you want to mark order #${id} as "${newStatus}"?`)) return;

    try {
      await axiosInstance.put(`/orders/${id}/status`, { status: newStatus });
      alert(`Order #${id} updated to ${newStatus} successfully!`);
      setOrders(prev =>
        prev.map(o => (o.id === id ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert(err.message || 'Error updating order status');
    }
  };

  /* Tính thống kê */
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const completedCount = orders.filter(o => o.status === 'COMPLETED').length;
  const cancelledCount = orders.filter(o => o.status === 'CANCELLED').length;

  /* Header bảng */
  const tableHeaders = ['Order ID','Customer' ,'Total Amount', 'Order Date', 'Payment', 'Status', 'Actions'];

  /* Dữ liệu bảng */
  const tableData = orders.map(order => {
    const status = order.status as OrderStatus;

    /* Quy tắc nút theo trạng thái */
    const renderActionButtons = () => {
      switch (status) {
        case 'PENDING':
          return (
            <>
              <button
                onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition"
                title="Confirm Order"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                title="Cancel Order"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </>
          );
        case 'CONFIRMED':
          return (
            <>
              <button
                onClick={() => handleUpdateStatus(order.id, 'SHIPPING')}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition"
                title="Mark as Shipping"
              >
                <Truck className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                title="Cancel Order"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </>
          );
        case 'SHIPPING':
          return (
            <>
              <button
                onClick={() => handleUpdateStatus(order.id, 'COMPLETED')}
                className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition"
                title="Mark as Completed"
              >
                <PackageCheck className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                title="Cancel Order"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </>
          );
        default:
          return null; // COMPLETED hoặc CANCELLED => không cho làm gì
      }
    };
    
    return [
    <span key="id" className="font-mono font-semibold">{order.id}</span>,
    
    // <span key="amount" className="font-bold text-ring">{order.receiverName}</span>,
    <div className="flex flex-col">
      <span className="font-medium text-ring">{order.receiverName}</span>
      <span className="text-xs text-secondary">{order.userEmail}</span>
    </div>,
    <span key="amount" className="font-bold text-success">{formatCurrency(order.totalAmount)}</span>,
    <span key="date" className="text-gray-800">{format(new Date(order.orderDate), 'MM/dd/yyyy HH:mm')}</span>,
    <span key="payment" className="text-sm text-gray-700">Cash on Delivery</span>,
    <StatusBadge key="status" status={order.status as OrderStatus} />,
      <div key="actions" className="flex items-center gap-2">
        <Link
          key="actions"
          href={`/admin/orders/${order.id}`}
          className="text-primary-400 hover:text-primary-700 p-2 rounded-full hover:bg-primary-100 transition"
          title="View Details"
        >
          <Eye className="w-5 h-5" />
        </Link>
        {renderActionButtons()}
      </div>,
    
  ]
});

  /* UI hiển thị */
  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-l-4 border-blue-500 pl-3">
        Order Management
      </h2>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <OrderStatCard icon={DollarSign} title="Total Revenue" value={formatCurrency(totalRevenue)} color="#10b981" />
        <OrderStatCard icon={Truck} title="Completed Orders" value={completedCount.toString()} color="#0ea5e9" />
        <OrderStatCard icon={Clock} title="Pending Orders" value={pendingCount.toString()} color="#f59e0b" />
        <OrderStatCard icon={XCircle} title="Cancelled Orders" value={cancelledCount.toString()} color="#ef4444" />
      </div>

      {/* <form 
        onSubmit={handleSearch}
        className="flex items-center pb-4"
      >
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border border-r-0 border-primary-400 p-1 rounded-l-xl focus:outline-none px-3 w-80"
          placeholder="Search..."
        />
        <button
          type='submit'
          className="border border-l-0 border-primary-400 text-primary-400 p-2 rounded-r-xl hover:bg-primary-50"
        >
          <FaSearch />
        </button>
      </form> */}

      {/* Hiển thị bảng */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48 bg-white rounded-xl border border-gray-200 shadow-inner">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600 text-sm">Loading orders...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 bg-red-50 py-4 rounded-lg shadow-md">
          ⚠️ {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 bg-white py-6 rounded-lg shadow-md">
          No orders found.
        </div>
      ) : (
        <AdminTable headers={tableHeaders} data={tableData} />
      )}
    </>
  );
}
