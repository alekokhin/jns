"use client";

export default function ScrollToContact() {
  return (
    <button
      onClick={() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="hover:text-brand-cream-300 transition-colors"
    >
      კონტაქტი
    </button>
  );
}
