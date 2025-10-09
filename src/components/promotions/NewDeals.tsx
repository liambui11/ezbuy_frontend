"use client"

import React from "react"

interface Promotion {
  id: number
  code?: string
  description: string
  discount_value: number
  start_date?: string
  end_date?: string
  is_active: boolean
}

const promotions: Promotion[] = [
  {
    id: 1,
    code: "SALE10",
    description: "Giảm 10% cho tất cả đơn hàng trên 500.000đ",
    discount_value: 10,
    start_date: "2025-10-01",
    end_date: "2025-10-15",
    is_active: true,
  },
  {
    id: 2,
    code: "FREESHIP",
    description: "Miễn phí vận chuyển cho đơn hàng từ 300.000đ",
    discount_value: 0,
    start_date: "2025-10-05",
    end_date: "2025-10-20",
    is_active: true,
  },
  {
    id: 3,
    code: "BIGSALE50",
    description: "Giảm đến 50% cho một số sản phẩm chọn lọc",
    discount_value: 50,
    start_date: "2025-10-07",
    end_date: "2025-10-14",
    is_active: false,
  },
  {
    id: 4,
    code: "WEEKEND15",
    description: "Giảm 15% cho tất cả đơn hàng cuối tuần (T6–CN)",
    discount_value: 15,
    start_date: "2025-10-10",
    end_date: "2025-10-31",
    is_active: true,
  },
  {
    id: 5,
    code: "VIPCUSTOMER",
    description: "Thành viên hạng Vàng được giảm thêm 5%",
    discount_value: 5,
    start_date: "2025-09-01",
    end_date: "2025-12-31",
    is_active: true,
  },
  {
    id: 6,
    code: "NEWUSER",
    description: "Khách hàng mới nhận ngay 30.000đ giảm giá",
    discount_value: 30,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_active: true,
  },
  {
    id: 7,
    code: "EZCOMBO",
    description: "Mua combo điện thoại + phụ kiện giảm thêm 12%",
    discount_value: 12,
    start_date: "2025-10-02",
    end_date: "2025-10-31",
    is_active: true,
  },
  {
    id: 8,
    code: "CLEARANCE",
    description: "Xả kho cuối mùa – Giảm giá lên đến 70%",
    discount_value: 70,
    start_date: "2025-09-15",
    end_date: "2025-10-10",
    is_active: false,
  },
  {
    id: 9,
    code: "BIRTHDAY25",
    description: "Ưu đãi sinh nhật EZPhone – Giảm 25%",
    discount_value: 25,
    start_date: "2025-10-01",
    end_date: "2025-10-08",
    is_active: true,
  },
  {
    id: 10,
    code: "STUDENT",
    description: "Giảm 10% cho sinh viên có thẻ học sinh – sinh viên",
    discount_value: 10,
    start_date: "2025-09-20",
    end_date: "2025-11-30",
    is_active: true,
  },
]

export default function PromotionPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-[var(--color-primary)] mb-10">
        Chương trình khuyến mãi hấp dẫn
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`p-6 rounded-2xl border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
              promo.is_active
                ? "bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-card)] border-[var(--color-border)]"
                : "bg-[var(--color-muted)] border-[var(--color-border)] opacity-85"
            }`}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      promo.is_active
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-secondary)] text-white"
                    }`}
                  >
                    {promo.is_active ? "Đang diễn ra" : "Đã kết thúc"}
                  </span>

                  {promo.code && (
                    <span className="text-xs bg-[var(--color-warning)] text-white px-3 py-1 rounded-md font-medium">
                      Mã: {promo.code}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-semibold text-[var(--color-foreground)] mb-2 leading-snug">
                  {promo.description}
                </h2>

                {promo.discount_value > 0 && (
                  <p className="text-lg font-bold text-[var(--color-danger)]">
                    Giảm {promo.discount_value}
                    {promo.discount_value <= 100 ? "%" : "đ"}
                  </p>
                )}
              </div>

              <div className="mt-4 text-sm text-[var(--color-secondary-600)]">
                <p>
                  ⏰ Từ{" "}
                  <b>
                    {promo.start_date
                      ? new Date(promo.start_date).toLocaleDateString()
                      : "-"}
                  </b>{" "}
                  đến{" "}
                  <b>
                    {promo.end_date
                      ? new Date(promo.end_date).toLocaleDateString()
                      : "-"}
                  </b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
