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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-georgian)]">
        <header className="relative bg-brand-green-900">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/jns-logo.png"
                alt="JNS ავეჯის ლოგო"
                width={52}
                height={52}
                className="rounded-full"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-brand-cream-300">
              <Link
                href="/"
                className="hover:text-brand-gold-400 transition-colors"
              >
                კატალოგი
              </Link>
              <Link
                href="/about"
                className="hover:text-brand-gold-400 transition-colors"
              >
                ჩვენს შესახებ
              </Link>
              <ScrollToContact />
            </div>

            {/* Mobile nav */}
            <MobileNav />
          </nav>
          <div className="header-gold-line" />
        </header>

        <main className="flex-1 bg-brand-green-900">{children}</main>

        <footer id="contact" className="bg-brand-green-900">
          <div className="header-gold-line" />
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {/* Contact info */}
              <div className="text-brand-cream-200">
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  კონტაქტი
                </h2>
                <dl className="mt-4 space-y-3 text-sm sm:mt-6 sm:space-y-4">
                  <div>
                    <dt className="font-medium text-brand-gold-400">
                      მისამართი
                    </dt>
                    <dd className="mt-1 text-brand-cream-300">
                      ბათუმი, მამია ვარშანიძის 141
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-gold-400">
                      ტელეფონი
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="tel:+995595745745"
                        className="text-brand-cream-300 hover:text-white transition-colors"
                      >
                        +995 595 745 745
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-gold-400">
                      ელ. ფოსტა
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:groupjns24@gmail.com"
                        className="text-brand-cream-300 hover:text-white transition-colors"
                      >
                        groupjns24@gmail.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] sm:aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d921.2643809026732!2d41.642209954998926!3d41.62943514303251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406789a918fca9a1%3A0xecc367d4d0720540!2sJNS%20GROUP!5e1!3m2!1ska!2sge!4v1792146050377!5m2!1ska!2sge"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full"
                  title="JNS ავეჯი მდებარეობა"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-brand-green-700 pt-6 sm:mt-10">
              <div className="flex justify-center gap-4 mb-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61595375789935"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-brand-cream-300 hover:text-white transition-colors"
                >
                  <svg
                    className="size-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/groupjns/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-brand-cream-300 hover:text-white transition-colors"
                >
                  <svg
                    className="size-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.523.99 4.088 4.088 0 0 1 .99 1.524c.163.46.349 1.26.403 2.428.058 1.267.07 1.647.07 4.851s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 0 1-.99 1.523 4.088 4.088 0 0 1-1.524.99c-.46.163-1.26.349-2.428.403-1.267.058-1.647.07-4.851.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 0 1-1.523-.99 4.088 4.088 0 0 1-.99-1.524c-.163-.46-.349-1.26-.403-2.428C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 0 1 .99-1.523A4.088 4.088 0 0 1 5.15 2.636c.46-.163 1.26-.349 2.428-.403C8.846 2.175 9.226 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.13 4.903.333 4.14.63a6.21 6.21 0 0 0-2.245 1.462A6.21 6.21 0 0 0 .433 4.337C.136 5.1-.067 5.972.01 7.25.067 8.53.014 8.938 0 12.197c0 3.259.014 3.668.072 4.948.058 1.277.261 2.15.558 2.912a6.21 6.21 0 0 0 1.462 2.245 6.21 6.21 0 0 0 2.245 1.462c.763.297 1.636.5 2.913.558C8.53 23.986 8.938 24 12 24s3.47-.014 4.75-.072c1.277-.058 2.15-.261 2.912-.558a6.21 6.21 0 0 0 2.245-1.462 6.21 6.21 0 0 0 1.462-2.245c.297-.763.5-1.636.558-2.913.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.912a6.21 6.21 0 0 0-1.462-2.245A6.21 6.21 0 0 0 19.662.633C18.9.336 18.027.133 16.75.075 15.47.017 15.06 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-10.845a1.44 1.44 0 1 0 0-2.881 1.44 1.44 0 0 0 0 2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-brand-cream-300 hover:text-white transition-colors"
                >
                  <svg
                    className="size-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/995595745745"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-brand-cream-300 hover:text-white transition-colors"
                >
                  <svg
                    className="size-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </a>
              </div>
              <p className="text-center text-sm text-brand-cream-300">
                &copy; <CopyrightYear /> JNS ავეჯი. ყველა უფლება დაცულია.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
