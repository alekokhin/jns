"use client";

import { useState, useEffect } from "react";

export default function CopyrightYear() {
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return <>{year}</>;
}
