"use client";

import React, { useEffect, useState } from "react";
import { ClientPurchaseHistoryTable } from "@/components/profile/ClientPurchaseHistoryTable";
import { cancelMyOrder, fetchMyOrders } from "@/features/orders/services";
import { OrderSummary } from "@/features/orders/types";
import { Loader2 } from "lucide-react";

export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 📦 Gọi API lấy danh sách đơn hàng của user hiện tại
        const response = await fetchMyOrders(0, 20); // lấy 20 đơn hàng đầu tiên
        // const completedOrders = response.content.filter(
        //   (o) => o.status === "COMPLETED"
        // );

        setOrders(response.content);
      } catch (err) {
        console.error("Failed to fetch purchase history:", err);
        setError("Không thể tải lịch sử mua hàng. Vui lòng thử lại sau!");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleCancel = async (id: number) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel order #${id}?`
    );
    if (!confirmCancel) return;

    try {
      await cancelMyOrder(id);
      alert("Order cancelled successfully!");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o))
      );
    } catch (err: any) {
      alert(err.message || "Error cancelling order");
    }
  };


  return (
    <div className="max-w-4xl mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Purchase History
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-secondary-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-muted-foreground font-medium">
          Not Found.
        </div>
      ) : (
        <ClientPurchaseHistoryTable orders={orders} onCancel={handleCancel} />
      )}
    </div>
  );
}
