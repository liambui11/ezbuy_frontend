// app/promotions/page.tsx
// import Banner from "@/components/promotions/Banner";
import HotDeals from "@/components/promotions/HotDeals";
import SmemberDeals from "@/components/promotions/SmemberDeals";
import FlashSale from "@/components/promotions/FlashSale";
// import ComboDeals from "@/components/promotions/ComboDeals";
import BrandPromotions from "@/components/promotions/BrandPromotion";

export default function PromotionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* <Banner /> */}
      <HotDeals />
      <SmemberDeals />
      <FlashSale />
      {/* <ComboDeals /> */}
      <BrandPromotions />
    </div>
  );
}
