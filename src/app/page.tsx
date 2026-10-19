import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/products";
import { SITE_DESCRIPTION } from "@/lib/constants";
import WaveDivider from "@/components/WaveDivider";

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
    <div className="relative min-h-screen">
      {/* Decorative wave ribbons — background, centered vertically */}

      <WaveDivider text="ჩვენი კოლექცია" />

      {/* Content — above the wave background */}
      <div className="relative z-40 mx-auto max-w-6xl px-4 pt-0 pb-12 sm:px-6 sm:pt-0 sm:pb-16">
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
