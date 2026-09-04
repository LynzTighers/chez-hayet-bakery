"use client";

import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* NAVBAR */}
      <nav>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex flex-col leading-none">
            <span
              className={`${headingFont.className} text-2xl font-bold tracking-wide`}
            >
              Chez Hayet Bakery
            </span>

            <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-[#986c62]">
              Handmade with love
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <Link
              href="/"
              className={`transition hover:text-[#9b645d] ${
                pathname === "/" ? "border-b border-[#9b645d] pb-1" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`transition hover:text-[#9b645d] ${
                pathname === "/menu" ? "border-b border-[#9b645d] pb-1" : ""
              }`}
            >
              Menu
            </Link>

            <Link
              href="/about"
              className={`transition hover:text-[#9b645d] ${
                pathname === "/about" ? "border-b border-[#9b645d] pb-1" : ""
              }`}
            >
              About
            </Link>

            <Link
              href="/where-to-buy"
              className={`transition hover:text-[#9b645d] ${
                pathname === "/where-to-buy"
                  ? "border-b border-[#9b645d] pb-1"
                  : ""
              }`}
            >
              Where to Buy
            </Link>

            <Link
              href="/contact"
              className={`transition hover:text-[#9b645d] ${
                pathname === "/contact" ? "border-b border-[#9b645d] pb-1" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/order"
            className="rounded-full bg-[#9b645d] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#814f49]"
          >
            Order Now
          </Link>
        </div>
      </nav>
    </>
  );
}
