import CategoryCarousel from "@/components/categorycarousel/CategoryCarousel";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <CategoryCarousel />
    </div>
  );
}
