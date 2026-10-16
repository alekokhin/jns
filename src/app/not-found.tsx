import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-brand-green-900 flex items-center justify-center min-h-[60vh]">
      <div className="px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 className="text-5xl font-bold text-brand-gold-500 sm:text-6xl">404</h1>
        <p className="mt-4 text-lg text-white sm:text-xl">
          გვერდი ვერ მოიძებნა
        </p>
        <p className="mt-2 text-brand-cream-300">
          სამწუხაროდ, თქვენს მიერ მოთხოვნილი გვერდი არ არსებობს.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-brand-gold-500 px-6 py-3 text-sm font-medium text-brand-green-900 transition-colors hover:bg-brand-gold-600"
        >
          კატალოგში დაბრუნება
        </Link>
      </div>
    </div>
  );
}
