"use client";

export default function ScrollToContact() {
  return (
    <button
      onClick={() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="hover:text-brand-gold-600"
    >
      კონტაქტი
    </button>
  );
}
