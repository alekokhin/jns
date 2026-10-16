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
      <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-10">
        <Link
          href="/"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm border ${
            !category
              ? "bg-brand-green-900 text-white border-brand-green-900"
              : "bg-transparent text-brand-green-900 border-brand-green-700 hover:bg-brand-green-900 hover:text-white hover:border-brand-green-900"
          }`}
        >
          ყველა
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm border ${
              category === cat
                ? "bg-brand-green-900 text-white border-brand-green-900"
                : "bg-transparent text-brand-green-900 border-brand-green-700 hover:bg-brand-green-900 hover:text-white hover:border-brand-green-900"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Product grid */}
      <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-brand-green-500">
          ამ კატეგორიაში პროდუქტი ვერ მოიძებნა.
        </p>
      )}
    </>
  );
}
