import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import CopyrightYear from "@/components/CopyrightYear";
import MobileNav from "@/components/MobileNav";
import ScrollToContact from "@/components/ScrollToContact";
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-georgian",
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — ხელნაკეთი ავეჯი`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ავეჯი",
    "ქართული ავეჯი",
    "ხელნაკეთი ავეჯი",
    "მაგიდა",
    "სკამი",
    "დივანი",
    "საწოლი",
    "თარო",
    "ინტერიერი",
    "JNS",
  ],
  openGraph: {
    type: "website",
    locale: "ka_GE",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ხელნაკეთი ავეჯი`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ხელნაკეთი ავეჯი`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/jns-logo.png`,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ka"
      className={`${notoGeorgian.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-georgian)]">
        <header className="relative border-b border-brand-cream-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-brand-green-700 sm:text-xl"
            >
              <Image
                src="/jns-logo.png"
                alt="JNS ავეჯის ლოგო"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-brand-green-600">
              <Link href="/" className="hover:text-brand-gold-600">
                კატალოგი
              </Link>
              <Link href="/#" className="hover:text-brand-gold-600">
                ჩვენს შესახებ
              </Link>
              <ScrollToContact />
            </div>

            {/* Mobile nav */}
            <MobileNav />
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer id="contact" className="border-t border-brand-cream-200 bg-brand-green-900">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {/* Contact info */}
              <div className="text-brand-cream-200">
                <h2 className="text-lg font-bold text-white sm:text-xl">კონტაქტი</h2>
                <dl className="mt-4 space-y-3 text-sm sm:mt-6 sm:space-y-4">
                  <div>
                    <dt className="font-medium text-brand-gold-400">მისამართი</dt>
                    <dd className="mt-1 text-brand-cream-300">ბათუმი, საქართველო</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-gold-400">ტელეფონი</dt>
                    <dd className="mt-1">
                      <a href="tel:+995555000000" className="text-brand-cream-300 hover:text-white transition-colors">
                        +995 555 000 000
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-gold-400">ელ. ფოსტა</dt>
                    <dd className="mt-1">
                      <a href="mailto:info@jns.ge" className="text-brand-cream-300 hover:text-white transition-colors">
                        info@jns.ge
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] sm:aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1341.0329699482302!2d41.64364508947024!3d41.62984131060242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ska!2sge!4v1791881244520!5m2!1ska!2sge"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full"
                  title="JNS ავეჯი მდებარეობა"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-brand-green-700 pt-6 text-center text-sm text-brand-cream-300 sm:mt-10">
              &copy; <CopyrightYear /> JNS ავეჯი. ყველა უფლება დაცულია.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
