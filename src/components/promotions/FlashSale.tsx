"use client";

import { useEffect, useState } from "react";
import FlashSaleBanner from "@/components/product/FlashSaleBanner";

// Danh sách các đợt Flash Sale
const flashSaleRounds = [
  [
    {
      id: 1,
      name: "Xiaomi 13T Pro",
      image: "/images/promotions/xiaomi_13t_pro.jpg",
      oldPrice: 15990000,
      newPrice: 11990000,
      discountPercent: 25,
      smemberDiscount: "300.000đ",
      description: "Flash Sale sốc trong 24h!",
      rating: 4.7,
    },
    {
      id: 2,
      name: "iPhone 15",
      image: "/images/promotions/Apple_iPhone_15_Pro_Max.jpg",
      oldPrice: 22990000,
      newPrice: 18990000,
      discountPercent: 18,
      smemberDiscount: "400.000đ",
      description: "Giảm cực sốc chỉ hôm nay!",
      rating: 4.9,
    },
  ],
  [
    {
      id: 3,
      name: "Samsung Galaxy S23 Ultra",
      image: "/images/promotions/Samsung_Galaxy_S24_ULTRA_BLACK.jpg",
      oldPrice: 29990000,
      newPrice: 24990000,
      discountPercent: 17,
      smemberDiscount: "500.000đ",
      description: "Siêu phẩm flagship, bút S Pen cực tiện lợi.",
      rating: 5,
    },
    {
      id: 4,
      name: "OPPO Reno 10 Pro",
      image: "/images/promotions/oppo_find_x6_pro.jpg",
      oldPrice: 13990000,
      newPrice: 10990000,
      discountPercent: 21,
      smemberDiscount: "200.000đ",
      description: "Thiết kế sang trọng, camera chụp chân dung đẹp.",
      rating: 4.6,
    },
  ],
  [
    {
      id: 5,
      name: "Vivo X100 Pro 5G",
      image: "/images/promotions/vivo_x100_pro.jpg",
      oldPrice: 22990000,
      newPrice: 19990000,
      discountPercent: 13,
      smemberDiscount: "100.000đ",
      description: "Camera ZEISS chuyên nghiệp, màn hình sắc nét.",
      rating: 4.7,
    },
  ],
];

// Hàm format giờ phút giây
function formatTime(time: number) {
  return time < 10 ? `0${time}` : time;
}

export default function FlashSale() {
  const [round, setRound] = useState(0); // Đợt hiện tại
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Mỗi đợt kéo dài 6 tiếng
    const duration = 6 * 60 * 60 * 1000;
    const endTime = new Date().getTime() + duration;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        // Hết giờ -> chuyển sang đợt mới
        clearInterval(timer);
        setRound((prev) => (prev + 1) % flashSaleRounds.length);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [round]); // chạy lại khi đổi round

  return (
    <section className="mb-12 rounded-xl bg-muted">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-primary-700 py-2">Flash Sale Học Sinh-Sinh Viên</h2>
      </div>

      {/* Timer */}
      <div className="mb-6 p-4 rounded-xl shadow-lg 
        bg-gradient-to-r from-primary-700 to-primary-400 
        text-white flex items-center justify-between">
          <span className="font-semibold">Kết thúc trong:</span>
          <div className="flex space-x-2 items-baseline">
          {/* Đồng hồ đếm ngược với màu danger (màu đỏ) */}
          <span className="font-mono text-2xl font-bold text-danger bg-white px-3 py-1 rounded-lg shadow-inner">
            {formatTime(timeLeft.hours)}
          </span>
          <span className="text-2xl font-bold">:</span>
          <span className="font-mono text-2xl font-bold text-danger bg-white px-3 py-1 rounded-lg shadow-inner">
            {formatTime(timeLeft.minutes)}
          </span>
          <span className="text-2xl font-bold">:</span>
          <span className="font-mono text-2xl font-bold text-danger bg-white px-3 py-1 rounded-lg shadow-inner">
            {formatTime(timeLeft.seconds)}
          </span>
        </div>
        </div>

      {/* Sản phẩm theo đợt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {flashSaleRounds[round].map((p) => (
          <FlashSaleBanner key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
