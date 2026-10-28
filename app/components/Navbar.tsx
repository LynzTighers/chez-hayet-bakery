"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["About", "/about"],
  ["Where to Buy", "/where-to-buy"],
  ["Contact", "/contact"],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    // Sticks to the top and lets the page show softly through it.
    <nav className="sticky top-0 z-50 border-b border-petal/60 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold text-cocoa">
            Chez{" "}
            <span className="inline-block font-script text-4xl font-normal text-rose-deep transition-transform duration-300 group-hover:-rotate-6">
              Hayet
            </span>
          </span>
          <span className="-mt-1 hidden text-[9px] uppercase tracking-[0.35em] text-latte sm:block">
            Bakery · Handmade with love
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm md:flex">
          {links.map(([label, href]) => (
            <NavLink key={href} href={href} active={pathname === href}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="whitespace-nowrap rounded-full bg-rose-deep px-4 py-2.5 text-sm font-medium text-white shadow-md sm:px-5 shadow-rose-deep/20 transition hover:-translate-y-0.5 hover:bg-cocoa hover:shadow-lg"
          >
            Order Now
          </Link>

          {/* Phone menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-blush md:hidden"
          >
            <span
              className={`h-0.5 w-5 rounded bg-cocoa transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-5 rounded bg-cocoa transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 rounded bg-cocoa transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Phone menu panel */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-all duration-300 md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-6 pb-5 pt-1">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`rounded-2xl px-4 py-3 font-display text-xl transition ${
                  pathname === href ? "bg-blush text-rose-deep" : "text-cocoa hover:bg-blush/60"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// A link whose underline grows in on hover and stays under the current page.
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative py-1 transition hover:text-rose-deep ${
        active ? "text-rose-deep" : "text-cocoa"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-rose-deep transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}
