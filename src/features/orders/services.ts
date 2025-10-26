// src/features/orders/services.ts
import axios from "axios";
import { OrderSummary, OrderDetail, OrderStatus } from "./types";

const API_BASE = "http://localhost:8081/api/orders";

/* ----------------------------------------------------------
   🧩 Hàm xử lý phản hồi API (dùng chung cho axios)
---------------------------------------------------------- */
async function handleResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const res = await promise;
    return res.data.data as T; // backend trả về ApiResponse<T> có field "data"
  } catch (err: any) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Unknown API error occurred";
    throw new Error(message);
  }
}

/* ----------------------------------------------------------
   🧾 1️⃣ Lấy danh sách đơn hàng của người dùng hiện tại
---------------------------------------------------------- */
export async function fetchMyOrders(
  page: number = 0,
  size: number = 10,
  status?: OrderStatus
): Promise<{
  content: OrderSummary[];
  pageNumber: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}> {
  const params: any = { page, size };
  if (status) params.status = status;

  const token = localStorage.getItem("accessToken");

  return handleResponse(
    axios.get(`${API_BASE}/my-orders`, {
      params,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      withCredentials: true,
    })
  );
}

/* ----------------------------------------------------------
   📦 2️⃣ Lấy chi tiết một đơn hàng
---------------------------------------------------------- */
export async function fetchOrderDetail(orderId: number) {
  return handleResponse(
    axios.get(`${API_BASE}/${orderId}`, { withCredentials: true })
  );
}

/* ----------------------------------------------------------
   🛒 3️⃣ Tạo đơn hàng mới
---------------------------------------------------------- */
export async function createOrder(data: any) {
  return handleResponse(
    axios.post(API_BASE, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
  );
}

/* ----------------------------------------------------------
   ❌ 4️⃣ Người dùng hủy đơn hàng của người dùng
---------------------------------------------------------- */
export async function cancelMyOrder(orderId: number) {
  const token = localStorage.getItem("accessToken");
  return handleResponse(
    axios.post(`${API_BASE}/${orderId}/cancel`, null, {
      headers:{
        "Content-Type": "application/json",
        ...(token? {Authorization: `Bearer ${token}`} : {}),
      },
      withCredentials: true,
    })
  );
}

/* ----------------------------------------------------------
   🧑‍💼 5️⃣ (Admin) Cập nhật trạng thái đơn hàng
---------------------------------------------------------- */
export async function updateOrderStatusByAdmin(
  orderId: number,
  status: OrderStatus
) {
  return handleResponse(
    axios.put(
      `${API_BASE}/${orderId}/status`,
      { status },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
  );
}

/* ----------------------------------------------------------
   📋 6️⃣ (Admin) Lấy tất cả đơn hàng
---------------------------------------------------------- */
export async function fetchAllOrdersForAdmin(
  page: number = 0,
  size: number = 10,
  sortBy: string = "orderDate",
  sortDir: string = "desc",
  status?: OrderStatus
): Promise<{
  content: OrderSummary[];
  pageNumber: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    sortDir,
  });
  if (status) params.append("status", status);

  const token = localStorage.getItem("accessToken");

  const res = await axios.get(`${API_BASE}/admin?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });

  return res.data.data;
}
