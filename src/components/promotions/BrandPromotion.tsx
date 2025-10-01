// components/promotions/BrandPromotions.tsx
export default function BrandPromotions() {
    return (
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🏷️ Khuyến mãi theo thương hiệu
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <img src="/images/promotions/Apple_iPhone_15_Pro_Max.jpg" alt="Apple" className="h-16" />
          <img src="/images/promotions/Apple_iPhone_15_Pro_Max.jpg" alt="Samsung" className="h-16" />
          <img src="/images/promotions/Apple_iPhone_15_Pro_Max.jpg" alt="Xiaomi" className="h-16" />
          <img src="/images/promotions/Apple_iPhone_15_Pro_Max.jpg" alt="Oppo" className="h-16" />
          <img src="/images/promotions/Apple_iPhone_15_Pro_Max.jpg" alt="Vivo" className="h-16" />
        </div>
      </section>
    );
  }
  