"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  imageUrl: string;
  parentId: number;
  slug: string;
};


export default function CategoryCarousel() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState<Category[]>([])
 const [loading, setLoading] = useState(true) 

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`) 
      .then((res) => {
        setCategories(res.data.data.content);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch API:", err);
      })
      .finally(() => setLoading(false));
  }, [API_URL]);



  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12">
      <div className=" mb-3 flex items-end justify-between">
        <h2 className="text-lg lg:text-xl font-semibold text-foreground">CATEGORIES</h2>

        {/* Nút điều hướng (custom) */}
        <div className="flex items-center gap-2">
          <button
            className="cat-prev px-2 py-1 rounded-md border border-border text-foreground/70 hover:text-foreground hover:border-foreground/40 transition cursor-pointer"
            aria-label="Previous categories"
          >
            ←
          </button>
          <button
            className="cat-next px-2 py-1 rounded-md border border-border text-foreground/70 hover:text-foreground hover:border-foreground/40 transition cursor-pointer"
            aria-label="Next categories"
          >
            →
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        navigation={{ prevEl: ".cat-prev", nextEl: ".cat-next" }}
        pagination={{ clickable: true, bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active" }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        a11y={{ enabled: true }}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2.2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="!pb-8" 
      >
        { !loading && categories.map((cat) => (
          <SwiperSlide key={cat.id} aria-label={cat.name}>
            <Link
              href={`/categories/${cat.slug}`}
              className="group block rounded-2xl border border-border overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
            onClick={(e) => e.stopPropagation()} 
            >
              {/* Khung ảnh: sử dụng tỉ lệ 4/5 để hợp với ảnh danh mục */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.04]"
                  priority={false}
                />

                {/* Overlay gradient rất nhẹ để chữ luôn rõ nếu cần */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              </div>

              {/* Tên danh mục */}
              <div className="p-3 flex items-center justify-center">
                <span
                  className="text-sm font-medium text-foreground/90 
                             bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-400 group-hover:text-transparent"
                >
                  {cat.name}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
