import CategoryCarousel from "@/components/categorycarousel/CategoryCarousel";
import Hero from "@/components/hero/Hero";
import { CATEGORIES } from "@/constants/navbar";

export default function Home() {
  return (
    <div>
      <Hero/>
      <CategoryCarousel title="Category" categories={CATEGORIES}/>
    </div>
  );
}
