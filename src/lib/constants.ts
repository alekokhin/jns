export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://jns.ge");
export const SITE_NAME = "JNS ავეჯი";
export const SITE_DESCRIPTION = "ხელნაკეთი ავეჯი თანამედროვე ცხოვრებისთვის";
