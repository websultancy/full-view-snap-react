"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      className="app-back-button"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        height: "40px",
        padding: "8px 16px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "none",
        background: "#222",
        color: "#fff",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
      }}
    >
      ← More Examples
    </Link>
  );
}
