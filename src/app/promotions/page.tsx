// app/promotions/page.tsx
import Campaign from "@/components/promotions/Campaign";
import HotDeals from "@/components/promotions/HotDeals";
import NewDeals from "@/components/promotions/NewDeals";
import StudentFlashSale from "@/components/promotions/StudentFlashSale";
import CampaignHero from "@/components/promotions/Campaign";

export default function PromotionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Campaign />
      <StudentFlashSale />
      {/* <HotDeals /> */}
      <NewDeals />
    </div>
  );
}
