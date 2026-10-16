import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-lg border border-brand-cream-200 bg-white overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] bg-brand-cream-100 flex items-center justify-center">
        <span className="text-4xl text-brand-cream-300">
          {getCategoryIcon(product.category)}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-brand-green-900 group-hover:text-brand-green-600">
            {product.name}
          </h3>
          {!product.inStock && (
            <span className="shrink-0 rounded bg-brand-red-100 px-2 py-0.5 text-xs text-brand-red-700">
              არ არის მარაგში
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-brand-green-500">
          {product.material}
        </p>
        <p className="mt-2 font-medium text-brand-gold-700">
          {product.price.toLocaleString()} ₾{product.pricePerSqm && "/მ²"}
        </p>
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
