"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <>
      {/* Category filter */}
      <div className="sticky top-[60px] sm:top-[84px] md:top-[100px] z-50 bg-brand-green-900 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
        <Link
          href="/"
          className={`rounded-full px-3 py-1 text-xs font-bold transition-colors sm:px-4 sm:py-1.5 sm:text-sm border ${
            !category
              ? "bg-brand-gold-500 text-brand-green-900 border-brand-gold-500"
              : "bg-transparent text-brand-cream-300 border-brand-cream-300 hover:border-brand-gold-500 hover:text-brand-gold-400"
          }`}
        >
          ყველა
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-colors sm:px-4 sm:py-1.5 sm:text-sm border   ${
              category === cat
                ? "bg-brand-gold-500 text-brand-green-900 border-brand-gold-500"
                : "bg-transparent text-brand-cream-300 border-brand-cream-300 hover:border-brand-gold-500 hover:text-brand-gold-400"
            }`}
          >
            {cat}
          </Link>
        ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-brand-cream-300">
          ამ კატეგორიაში პროდუქტი ვერ მოიძებნა.
        </p>
      )}
    </>
  );
}
