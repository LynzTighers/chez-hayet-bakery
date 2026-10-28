import type { Metadata } from "next";
import { Fraunces, Inter, Parisienne } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { Wave } from "./components/Decor";

// Fonts are loaded once here and used everywhere through font-sans / font-display /
// font-script (see globals.css).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  title: {
    default: "Chez Hayet Bakery | Homemade cakes & sweets in Columbus, OH",
    template: "%s | Chez Hayet Bakery",
  },
  description:
    "Homemade celebration cakes, Algerian and French sweets, and custom creations, made to order in the Columbus, Ohio area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${parisienne.variable}`}>
      <body className="bg-cream text-cocoa-deep antialiased">
        <Navbar />
        {children}
        {/* FOOTER */}
        <footer className="mt-10 text-cream">
          <Wave className="text-rose-deep" />
          <div className="bg-rose-deep">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
              <div>
                <p className="font-display text-2xl font-semibold">
                  Chez <span className="font-script text-4xl font-normal">Hayet</span>
                </p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#f6e4df]">
                  Cakes, sweets, and custom treats made for life&apos;s sweetest moments.
                </p>
              </div>

              <FooterColumn
                title="Quick Links"
                links={[
                  ["Home", "/"],
                  ["Menu", "/menu"],
                  ["About", "/about"],
                  ["Order", "/order"],
                ]}
              />

              <FooterColumn
                title="Visit"
                links={[
                  ["Where to Buy", "/where-to-buy"],
                  ["Follow Us", "/follow-us"],
                  ["Contact", "/contact"],
                ]}
              />
              <FooterColumn
                title="Questions about an order?"
                links={[["Send us a message anytime", "/contact"]]}
              />
            </div>

            <div className="border-t border-white/20 py-5 text-center text-xs text-[#f6e4df]">
              © {new Date().getFullYear()} Chez Hayet Bakery · Developed by LynzTighers · All
              rights reserved.
            </div>
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

      <div className="mt-4 flex flex-col gap-3 text-sm text-[#f6e4df]">
        {links.map(([label, href]) => (
          <Link
            key={href + label}
            href={href}
            className="w-fit transition hover:translate-x-1 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
