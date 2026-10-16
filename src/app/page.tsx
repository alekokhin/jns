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
    <div className="relative min-h-screen">
      {/* Decorative stripe accent — triangular shape on left */}
      <div
        className="absolute left-0 top-0 w-16 sm:w-20 md:w-28 h-48 sm:h-64 md:h-80 z-10 decorative-stripe"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ჩვენი კოლექცია
          </h1>
          <p className="mt-2 text-base text-brand-cream-300 sm:mt-3 sm:text-lg">
            შერჩეული ავეჯი ყველა ოთახისთვის
          </p>
        </div>

        <Suspense fallback={<div className="mt-10 text-center text-brand-cream-300">იტვირთება...</div>}>
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
