import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <h1 className="text-5xl font-bold text-brand-green-900 sm:text-6xl">404</h1>
      <p className="mt-4 text-lg text-brand-green-600 sm:text-xl">
        გვერდი ვერ მოიძებნა
      </p>
      <p className="mt-2 text-brand-green-500">
        სამწუხაროდ, თქვენს მიერ მოთხოვნილი გვერდი არ არსებობს.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-brand-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-green-600"
      >
        კატალოგში დაბრუნება
      </Link>
    </div>
  );
}
