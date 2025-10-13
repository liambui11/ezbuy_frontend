// src/app/profile/purchase-history/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ClientPurchaseHistoryTable } from "@/components/profile/ClientPurchaseHistoryTable";
import { fetchOrders } from '@/features/orders/services';
import { Order } from '@/features/orders/types';
import { Loader2 } from "lucide-react";

export default function PurchaseHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            setIsLoading(true);
            // Sử dụng mock service đã có
            const allOrders = await fetchOrders(); 
            
            // Lọc ra các đơn hàng đã HOÀN THÀNH để hiển thị trong lịch sử mua hàng
            const completedOrders = allOrders.filter(o => o.status === 'COMPLETED');
            
            setOrders(completedOrders);
            setIsLoading(false);
        };
        loadOrders();
    }, []);

    return (
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
            <h1 className="text-2xl font-bold text-primary mb-6">
                Purchase History
            </h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
                    <span className="text-secondary-600">Loading history...</span>
                </div>
            ) : (
                <ClientPurchaseHistoryTable orders={orders} />
            )}
        </div>
    );
}