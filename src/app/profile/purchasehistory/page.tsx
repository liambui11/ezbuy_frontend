// "use client";

// import React, { useEffect, useState } from "react";
// import { ClientPurchaseHistoryTable } from "@/components/profile/ClientPurchaseHistoryTable";
// import { cancelMyOrder, fetchMyOrders } from "@/features/orders/services";
// import { OrderSummary } from "@/features/orders/types";
// import { Loader2 } from "lucide-react";

// export default function PurchaseHistoryPage() {
//   const [orders, setOrders] = useState<OrderSummary[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadOrders = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // 📦 Gọi API lấy danh sách đơn hàng của user hiện tại
//         const response = await fetchMyOrders(0, 20); // lấy 20 đơn hàng đầu tiên
//         // const completedOrders = response.content.filter(
//         //   (o) => o.status === "COMPLETED"
//         // );

//         setOrders(response.content);
//       } catch (err) {
//         console.error("Failed to fetch purchase history:", err);
//         setError("Không thể tải lịch sử mua hàng. Vui lòng thử lại sau!");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadOrders();
//   }, []);

//   const handleCancel = async (id: number) => {
//     const confirmCancel = window.confirm(
//       `Are you sure you want to cancel order #${id}?`
//     );
//     if (!confirmCancel) return;

//     try {
//       await cancelMyOrder(id);
//       alert("Order cancelled successfully!");
//       setOrders((prev) =>
//         prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o))
//       );
//     } catch (err: any) {
//       alert(err.message || "Error cancelling order");
//     }
//   };


//   return (
//     <div className="max-w-4xl mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
//       <h1 className="text-2xl font-bold text-primary mb-6">
//         Purchase History
//       </h1>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-48">
//           <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
//           <span className="text-secondary-600">Loading...</span>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500 font-medium">{error}</div>
//       ) : orders.length === 0 ? (
//         <div className="text-center text-muted-foreground font-medium">
//           Not Found.
//         </div>
//       ) : (
//         <ClientPurchaseHistoryTable orders={orders} onCancel={handleCancel} />
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { ClientPurchaseHistoryTable } from "@/components/profile/ClientPurchaseHistoryTable";
import { cancelMyOrder, fetchMyOrders } from "@/features/orders/services";
import { OrderSummary } from "@/features/orders/types";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchMyOrders(0, 50); // lấy 50 đơn hàng đầu
      let filtered = response.content;

      // 🔍 Áp dụng lọc theo status
      if (statusFilter !== "ALL") {
        filtered = filtered.filter((o) => o.status === statusFilter);
      }

      if (searchTerm.trim() !== "") {
        const lower = searchTerm.toLowerCase();
        filtered = filtered.filter((o) =>
          o.id.toString().includes(lower)
        );
      }

      setOrders(filtered);
    } catch (err) {
      console.error("Failed to fetch purchase history:", err);
      setError("Unable to load purchase history. Please try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, searchTerm]);

  const handleCancel = async (id: number) => {
    const confirmCancel = await Swal.fire({
      title: `Cancel #${id}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirmCancel.isConfirmed) return;

    try {
      await cancelMyOrder(id);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o))
      );

      Swal.fire({
        icon: "success",
        title: "Cancel Success!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error Cancel",
        text: err.message || "An error has occurred, please try again later!",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-card border border-border shadow-lg rounded-2xl p-8 mt-8">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Purchase History
      </h1>

      {/* 🔍 Bộ lọc & Tìm kiếm */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            State:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="SHIPPING">Shipping</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Canceled</option>
          </select>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* 📦 Nội dung */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
          <span className="text-secondary-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-muted-foreground font-medium">
          Not found my order request 
        </div>
      ) : (
        <ClientPurchaseHistoryTable orders={orders} onCancel={handleCancel} />
      )}
    </div>
  );
}
