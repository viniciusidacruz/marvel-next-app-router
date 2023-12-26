"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ButtonBackPage() {
  const { back } = useRouter();

  return (
    <button
      type="button"
      onClick={back}
      aria-label="back to prev page"
      className="items-center gap-2 hidden md:flex"
    >
      <ArrowBigLeft />

      <span>Back</span>
    </button>
  );
}
