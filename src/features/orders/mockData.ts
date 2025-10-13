// src/features/orders/mockData.ts (Tái cấu trúc từ mockData trước đó)

import { Order, OrderItem } from './types';

// Dữ liệu chung
export const ADMIN_USER_ID = 101; 
export const ADMIN_NAME = 'Quản trị Viên';

export const mockUsers = [
    { id: ADMIN_USER_ID, first_name: 'Quản trị', last_name: 'Viên', phone: '0901111000' },
    { id: 102, first_name: 'Nhân viên', last_name: 'Sale', phone: '0902222000' },
    { id: 201, first_name: 'Lê Văn', last_name: 'A', phone: '0903333111' },
    { id: 202, first_name: 'Nguyễn Thị', last_name: 'Bình', phone: '0904444222' },
];

export const mockProducts = [
    { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 34000000.00 },
    { id: 2, name: 'Samsung Galaxy S24 Ultra 512GB', price: 32000000.00 },
    { id: 3, name: 'Xiaomi Redmi Note 13', price: 6500000.00 },
];

export const mockPayments = [
    { id: 1, method: 'Cash on delivery (COD)' },
    { id: 2, method: 'Bank tranfer' },
];


const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const promoId = 1; // Giả sử có 1 khuyến mãi tồn tại

// // DỮ LIỆU ORDER ITEMS
// export const mockOrderItems: OrderItem[] = [
//     { id: 1001, order_id: 1, product_id: 1, product_name: mockProducts[0].name, quantity: 1, price: mockProducts[0].price, subtotal: 34000000.00 },
//     { id: 1002, order_id: 2, product_id: 2, product_name: mockProducts[1].name, quantity: 1, price: mockProducts[1].price, subtotal: 32000000.00 },
//     { id: 1003, order_id: 3, product_id: 3, product_name: mockProducts[2].name, quantity: 2, price: 6000000.00, subtotal: 12000000.00 },
//     { id: 1004, order_id: 4, product_id: 1, product_name: mockProducts[0].name, quantity: 1, price: 34000000.00, subtotal: 34000000.00 },
//     { id: 1005, order_id: 4, product_id: 3, product_name: mockProducts[2].name, quantity: 1, price: 6500000.00, subtotal: 6500000.00 },
// ];

// // DỮ LIỆU ĐƠN HÀNG
// export const mockOrders: Order[] = [
//     {
//         id: 1, user_id: 201, promo_id: null, payment_id: 1,
//         receiver_name: 'Lê Văn A', shipping_address: '123 Đường Nguyễn Huệ, Q.1, TP.HCM', phone: mockUsers[2].phone!,
//         status: 'COMPLETED', order_date: new Date('2025-09-01T10:30:00Z'),
//         subtotal: 34000000.00, discount_total: 0.00, total_amount: 34000000.00, confirmed_by: 102,
//         items: mockOrderItems.filter(item => item.order_id === 1),
//     },
//     {
//         id: 2, user_id: 202, promo_id: promoId, payment_id: 2,
//         receiver_name: 'Nguyễn Thị Bình', shipping_address: '456 Đường CMT8, Q.3, TP.HCM', phone: mockUsers[3].phone!,
//         status: 'PENDING', order_date: today,
//         subtotal: 32000000.00, discount_total: 9600000.00, total_amount: 22400000.00, confirmed_by: null,
//         items: mockOrderItems.filter(item => item.order_id === 2),
//     },
//     {
//         id: 3, user_id: 201, promo_id: null, payment_id: 1,
//         receiver_name: 'Lê Văn A', shipping_address: '123 Đường Nguyễn Huệ, Q.1, TP.HCM', phone: mockUsers[2].phone!,
//         status: 'CANCELLED', order_date: yesterday,
//         subtotal: 12000000.00, discount_total: 0.00, total_amount: 12000000.00, confirmed_by: 102,
//         items: mockOrderItems.filter(item => item.order_id === 3),
//     },
// ];

// src/features/orders/mockData.ts (Phiên bản MỞ RỘNG - Thêm 6 đơn hàng)

// ... (các imports và hằng số cũ: ADMIN_USER_ID, mockUsers, mockProducts, mockPayments, v.v. giữ nguyên)

// --- Dữ liệu ngày tháng mới ---
const oneMonthAgo = new Date(); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
const threeMonthsAgo = new Date(); threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);


// --- DỮ LIỆU ORDER ITEMS MỞ RỘNG (Chỉ cần thêm các mục mới) ---
export const mockOrderItems: OrderItem[] = [
    // (1001-1005: Các mục cũ)
    { id: 1001, order_id: 1, product_id: 1, product_name: 'iPhone 15 Pro Max', quantity: 1, price: 34000000.00, subtotal: 34000000.00 },
    { id: 1002, order_id: 2, product_id: 2, product_name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 32000000.00, subtotal: 32000000.00 },
    { id: 1003, order_id: 3, product_id: 3, product_name: 'Xiaomi Redmi Note 13', quantity: 2, price: 6000000.00, subtotal: 12000000.00 },
    { id: 1004, order_id: 4, product_id: 1, product_name: 'iPhone 15 Pro Max', quantity: 1, price: 34000000.00, subtotal: 34000000.00 },
    { id: 1005, order_id: 4, product_id: 3, product_name: 'Xiaomi Redmi Note 13', quantity: 1, price: 6500000.00, subtotal: 6500000.00 },
    
    // (1006 - 1012: Các mục mới)
    { id: 1006, order_id: 5, product_id: 2, product_name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 32000000.00, subtotal: 32000000.00 },
    { id: 1007, order_id: 6, product_id: 3, product_name: 'Xiaomi Redmi Note 13', quantity: 1, price: 6500000.00, subtotal: 6500000.00 },
    { id: 1008, order_id: 7, product_id: 1, product_name: 'iPhone 15 Pro Max', quantity: 2, price: 34000000.00, subtotal: 68000000.00 },
    { id: 1009, order_id: 8, product_id: 3, product_name: 'Xiaomi Redmi Note 13', quantity: 1, price: 6500000.00, subtotal: 6500000.00 },
    { id: 1010, order_id: 9, product_id: 1, product_name: 'iPhone 15 Pro Max', quantity: 1, price: 34000000.00, subtotal: 34000000.00 },
    { id: 1011, order_id: 10, product_id: 2, product_name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 32000000.00, subtotal: 32000000.00 },
    { id: 1012, order_id: 10, product_id: 3, product_name: 'Xiaomi Redmi Note 13', quantity: 1, price: 6500000.00, subtotal: 6500000.00 },
];

// --- DỮ LIỆU ĐƠN HÀNG MỞ RỘNG ---
export const mockOrders: Order[] = [
    // (ID 1-4: Các đơn hàng cũ - PENDING, COMPLETED, CANCELLED, SHIPPING)
    { id: 1, user_id: 201, promo_id: null, payment_id: 1, receiver_name: 'Lê Văn A', shipping_address: '123 Nguyễn Huệ', phone: mockUsers[2].phone!, status: 'COMPLETED', order_date: threeMonthsAgo, subtotal: 34000000.00, discount_total: 0.00, total_amount: 34000000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 1) },
    { id: 2, user_id: 202, promo_id: 1, payment_id: 2, receiver_name: 'Nguyễn Thị Bình', shipping_address: '456 CMT8', phone: mockUsers[3].phone!, status: 'PENDING', order_date: new Date(), subtotal: 32000000.00, discount_total: 9600000.00, total_amount: 22400000.00, confirmed_by: null, items: mockOrderItems.filter(item => item.order_id === 2) },
    { id: 3, user_id: 201, promo_id: null, payment_id: 1, receiver_name: 'Lê Văn A', shipping_address: '123 Nguyễn Huệ', phone: mockUsers[2].phone!, status: 'CANCELLED', order_date: yesterday, subtotal: 12000000.00, discount_total: 0.00, total_amount: 12000000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 3) },
    { id: 4, user_id: null, promo_id: null, payment_id: 1, receiver_name: 'Khách Vãng Lai', shipping_address: '789 Lê Lợi', phone: '0987654321', status: 'SHIPPING', order_date: oneMonthAgo, subtotal: 40500000.00, discount_total: 0.00, total_amount: 40500000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 4) },

    // --- 6 Đơn hàng MỚI (COMPLETED/CANCELLED để làm phong phú lịch sử) ---
    { id: 5, user_id: 202, promo_id: null, payment_id: 1, receiver_name: 'Nguyễn Thị Bình', shipping_address: '456 CMT8', phone: mockUsers[3].phone!, status: 'COMPLETED', order_date: new Date('2025-08-01'), subtotal: 32000000.00, discount_total: 0.00, total_amount: 32000000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 5) },
    { id: 6, user_id: 201, promo_id: null, payment_id: 2, receiver_name: 'Lê Văn A', shipping_address: '123 Nguyễn Huệ', phone: mockUsers[2].phone!, status: 'COMPLETED', order_date: new Date('2025-07-15'), subtotal: 6500000.00, discount_total: 0.00, total_amount: 6500000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 6) },
    { id: 7, user_id: 202, promo_id: 1, payment_id: 1, receiver_name: 'Nguyễn Thị Bình', shipping_address: '456 CMT8', phone: mockUsers[3].phone!, status: 'COMPLETED', order_date: new Date('2025-06-20'), subtotal: 68000000.00, discount_total: 6800000.00, total_amount: 61200000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 7) },
    { id: 8, user_id: 201, promo_id: null, payment_id: 1, receiver_name: 'Lê Văn A', shipping_address: '123 Nguyễn Huệ', phone: mockUsers[2].phone!, status: 'COMPLETED', order_date: new Date('2025-05-10'), subtotal: 6500000.00, discount_total: 0.00, total_amount: 6500000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 8) },
    { id: 9, user_id: 202, promo_id: null, payment_id: 2, receiver_name: 'Nguyễn Thị Bình', shipping_address: '456 CMT8', phone: mockUsers[3].phone!, status: 'COMPLETED', order_date: new Date('2025-04-25'), subtotal: 34000000.00, discount_total: 0.00, total_amount: 34000000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 9) },
    { id: 10, user_id: 201, promo_id: null, payment_id: 1, receiver_name: 'Lê Văn A', shipping_address: '123 Nguyễn Huệ', phone: mockUsers[2].phone!, status: 'COMPLETED', order_date: new Date('2025-03-01'), subtotal: 38500000.00, discount_total: 0.00, total_amount: 38500000.00, confirmed_by: 102, items: mockOrderItems.filter(item => item.order_id === 10) },
];