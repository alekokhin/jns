import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "პროდუქტი ვერ მოიძებნა" };
  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      type: "website",
      title: `${product.name} | ${SITE_NAME}`,
      description: product.description,
      url: `/products/${product.id}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME}`,
      description: product.description,
      images: ["/og-image.png"],
    },
  };
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    material: product.material,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "GEL",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "სიგანე",
        value: `${product.dimensions.width} სმ`,
      },
      {
        "@type": "PropertyValue",
        name: "სიღრმე",
        value: `${product.dimensions.depth} სმ`,
      },
      {
        "@type": "PropertyValue",
        name: "სიმაღლე",
        value: `${product.dimensions.height} სმ`,
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "მთავარი",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `${BASE_URL}/?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/products/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-brand-green-600 hover:text-brand-gold-600"
        >
          &larr; კატალოგში დაბრუნება
        </Link>

        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-2 md:gap-10">
          {/* Image placeholder */}
          <div className="aspect-[4/3] rounded-lg bg-brand-cream-100 flex items-center justify-center sm:aspect-square">
            <span className="text-4xl text-brand-cream-300 sm:text-5xl md:text-6xl">
              {product.category}
            </span>
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-medium text-brand-gold-600">
              {product.category}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-brand-green-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-brand-gold-700 sm:mt-4 sm:text-2xl">
              {product.price.toLocaleString()} ₾
            </p>

            {!product.inStock && (
              <p className="mt-2 text-sm font-medium text-brand-red-700">
                ამჟამად არ არის მარაგში
              </p>
            )}

            <p className="mt-4 text-sm leading-relaxed text-brand-green-600 sm:mt-6 sm:text-base">
              {product.description}
            </p>

            <dl className="mt-6 space-y-3 text-sm sm:mt-8">
              <div className="flex gap-2">
                <dt className="font-medium text-brand-green-500 w-20 shrink-0 sm:w-28">მასალა</dt>
                <dd className="text-brand-green-900">{product.material}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-brand-green-500 w-20 shrink-0 sm:w-28">ზომები</dt>
                <dd className="text-brand-green-900">
                  {product.dimensions.width} x {product.dimensions.depth} x{" "}
                  {product.dimensions.height} სმ (ს x ღ x მ)
                </dd>
              </div>
            </dl>

            <button
              className="mt-6 w-full rounded-lg bg-brand-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-green-600 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-8"
              disabled={!product.inStock}
            >
              {product.inStock ? "დაინტერესება ამ ნაწარმით" : "არ არის მარაგში"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductPage({ params }: PageProps<"/products/[id]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-8 text-center text-brand-cream-300 sm:px-6 sm:py-12">იტვირთება...</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
}
