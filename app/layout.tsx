import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Chez Hayet | Cakes & Patisseries | Columbus, OH",
  description:
    "Chez Hayet offers handmade cakes, Algerian sweets, pastries, and custom creations in Columbus, Ohio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} bg-[#fff8f1] text-[#3f2a26] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
