import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { categories } from "../lib/categories";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <main className="min-h-[70vh] overflow-x-hidden">
      <PageHeader eyebrow="Everything made to order" title="The" accent="Menu">
        A full menu with prices is coming soon. In the meantime, here&apos;s what I make. Every
        order is baked fresh just for you.
      </PageHeader>

      <section className="mx-auto max-w-6xl space-y-16 px-6 py-12 lg:px-10">
        {categories.map((category, index) => (
          <Reveal key={category.value}>
            {/* Rows alternate sides so the page has a gentle zig-zag rhythm. */}
            <div
              className={`flex flex-col items-center gap-10 md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`${category.background} group relative h-[320px] w-full shrink-0 overflow-hidden rounded-t-full rounded-b-[2rem] p-3 md:w-[340px]`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-[1.5rem]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 768px) 340px, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="max-w-md text-center md:text-left">
                <p className="font-script text-4xl text-rose-deep">0{index + 1}</p>
                <h2 className="font-display text-4xl font-semibold text-cocoa">{category.title}</h2>
                <p className="mt-4 text-lg leading-8 text-latte">{category.description}</p>
                <Link
                  href="/order"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-cocoa px-7 py-3.5 text-sm font-medium text-cream transition hover:-translate-y-0.5 hover:bg-rose-deep"
                >
                  Order {category.title.toLowerCase()}
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
