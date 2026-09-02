"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/banner.png"
            alt="Chez Hayet"
            width={140}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className=" hidden md:block items-center gap-8 font-brand text-lg-blue">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/where-to-buy">Where to Buy</Link>
          <Link href="/contact">Contact</Link>

          <Link
            href="/order"
            className="bg-[#b33730] text-white px-5 py-2 rounded-full"
          >
            Order
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className=" md:hidden "></div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg
            className="w-8 h-8 text-[#b33730]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-6 flex flex-col gap-6 font-brand text-lg border-t">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/where-to-buy" onClick={() => setOpen(false)}>
            Where to Buy
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <Link
            href="/order"
            className="bg-[#b33730] text-white px-6 py-3 rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Order
          </Link>
        </div>
      )}
    </nav>
  );
}
