"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 text-brand-cream-300"
        aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-brand-green-700 bg-brand-green-900 z-50">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-brand-cream-300">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-brand-gold-400 transition-colors">
              კატალოგი
            </Link>
            <Link href="/#" onClick={() => setOpen(false)} className="hover:text-brand-gold-400 transition-colors">
              ჩვენს შესახებ
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-left hover:text-brand-gold-400 transition-colors"
            >
              კონტაქტი
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
