"use client";

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} bg-[#fff8f1] text-[#3f2a26] antialiased`}
      >
        <Navbar />
        {children}
        {/* FOOTER */}
        <footer className="bg-[#ad7b76] text-[#fff8f1]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            <div>
              <h3 className={`${headingFont.className} text-3xl font-semibold`}>
                Chez Hayet Bakery
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-[#f2dfda]">
                Cakes, sweets, and custom treats made for life's sweetest
                moments.
              </p>
            </div>

            <FooterColumn
              title="Quick Links"
              links={[
                ["Home", "/"],
                ["About", "/about"],
                ["Order", "/order"],
              ]}
            />

            <FooterColumn
              title="Visit"
              links={[
                ["Where to Buy", "/where-to-buy"],
                ["Contact", "/contact"],
              ]}
            />
            <FooterColumn
              title="Questions about an order?"
              links={[["Send us a message anytime", "/contact"]]}
            />
          </div>

          <div className="border-t border-white/20 py-5 text-center text-xs text-[#f2dfda]">
            © {new Date().getFullYear()} Chez Hayet Bakery - Developped by
            LynzTighers . All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="font-medium">{title}</h4>

      <div className="mt-4 flex flex-col gap-3 text-sm text-[#f2dfda]">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
