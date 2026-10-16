"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.images[0] && !imgError;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-md bg-[#f7f3ec] border border-brand-cream-200 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-brand-cream-100 m-3 rounded-md overflow-hidden">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl text-brand-cream-300">
              {getCategoryIcon(product.category)}
            </span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="px-4 pt-2 pb-4">
        <h3 className="text-lg font-bold text-brand-green-900 group-hover:text-brand-green-600">
          {product.name}
        </h3>
        {!product.inStock && (
          <span className="mt-1 inline-block rounded bg-brand-red-100 px-2 py-0.5 text-xs text-brand-red-700">
            არ არის მარაგში
          </span>
        )}
        <p className="mt-1 text-sm text-gray-400">
          {product.material}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <p className="font-bold text-brand-green-900">
            {product.price.toLocaleString()} ₾{product.pricePerSqm && "/მ²"}
          </p>
          {/* Gold line */}
          <div className="flex-1 h-px bg-brand-gold-400" />
          {/* Arrow button */}
          <span className="flex items-center justify-center size-8 rounded-full border border-brand-gold-500 text-brand-gold-500 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "მაგიდები": "\u25A8",
    "სკამები": "\u2441",
    "შესანახი": "\u2750",
    "დივნები": "\u2338",
    "საძინებელი": "\u2339",
  };
  return icons[category] ?? "\u25A1";
}
