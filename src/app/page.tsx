import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/products";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "კატალოგი",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative wave ribbons — background, centered vertically */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="absolute top-0 md:top-[-30px] block w-full h-[120px] sm:h-[180px] md:h-[240px] pointer-events-none"
      >
        <defs>
          {/* Metallic gold */}
          <linearGradient id="wave-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6F4B12" />
            <stop offset="0.25" stopColor="#C99A33" />
            <stop offset="0.5" stopColor="#F6E2A0" />
            <stop offset="0.75" stopColor="#E3BE5E" />
            <stop offset="1" stopColor="#9A6F1F" />
          </linearGradient>

          {/* Ruby red */}
          <linearGradient id="wave-red" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7A0B12" />
            <stop offset="0.35" stopColor="#B3141C" />
            <stop offset="0.7" stopColor="#E5473F" />
            <stop offset="1" stopColor="#7A0B12" />
          </linearGradient>

          {/* Emerald green */}
          <linearGradient id="wave-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#04211A" />
            <stop offset="0.4" stopColor="#14513A" />
            <stop offset="0.7" stopColor="#2E7A55" />
            <stop offset="1" stopColor="#0A3A28" />
          </linearGradient>
        </defs>

        {/* Gold ribbon */}
        <path
          d="M0 85 C280 0 430 20 720 85
       S1160 165 1440 35
       L1440 55 C1160 185 1000 120 720 105
       S280 20 0 105 Z"
          fill="url(#wave-gold)"
        />

        {/* Burgundy ribbon (thinner) */}
        <path
          d="M0 94 C280 9 430 29 720 94
       S1160 174 1440 44
       L1440 54 C1160 184 1010 169 720 104
       C430 39 280 19 0 104 Z"
          fill="url(#wave-red)"
        />

        {/* Green ribbon (thinner) */}
        <path
          d="M0 103 C280 18 430 38 720 103
       S1160 183 1440 53
       L1440 61 C1160 191 1010 176 720 111
       C430 46 280 26 0 111 Z"
          fill="url(#wave-green)"
        />
      </svg>

      {/* Content — above the wave background */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ჩვენი კოლექცია
          </h1>
          <p className="mt-2 text-base text-brand-cream-300 sm:mt-3 sm:text-lg">
            შერჩეული ავეჯი ყველა ოთახისთვის
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mt-10 text-center text-brand-cream-300">
              იტვირთება...
            </div>
          }
        >
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
