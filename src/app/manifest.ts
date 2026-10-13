import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JNS ავეჯი — ხელნაკეთი ავეჯი",
    short_name: "JNS ავეჯი",
    description: "ხელნაკეთი ავეჯი თანამედროვე ცხოვრებისთვის",
    lang: "ka",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ef",
    theme_color: "#1a5c38",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
