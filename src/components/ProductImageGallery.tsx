"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({
  images,
  name,
  category,
}: {
  images: string[];
  name: string;
  category: string;
}) {
  const [selected, setSelected] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const mainFailed = failedImages.has(selected);

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-lg bg-brand-cream-100 overflow-hidden sm:aspect-square">
        {!mainFailed ? (
          <Image
            key={selected}
            src={images[selected]}
            alt={`${name} - ${selected + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={() =>
              setFailedImages((prev) => new Set(prev).add(selected))
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-5xl text-brand-cream-300 md:text-6xl">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails — only show if more than one image */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                i === selected
                  ? "border-brand-gold-500"
                  : "border-transparent hover:border-brand-cream-300"
              }`}
            >
              {!failedImages.has(i) ? (
                <Image
                  src={src}
                  alt={`${name} - ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={() =>
                    setFailedImages((prev) => new Set(prev).add(i))
                  }
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-brand-cream-100">
                  <span className="text-xs text-brand-cream-300">
                    {category}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
