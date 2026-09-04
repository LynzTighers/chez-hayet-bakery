import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
});

const categories = [
  {
    title: "Celebration Cakes",
    description:
      "Beautiful cakes made for birthdays, gatherings, and special moments.",
    image: "/images/cake.jpg",
    background: "bg-[#efc8c6]",
  },
  {
    title: "Algerian Sweets",
    description:
      "Traditional handmade sweets inspired by Algerian flavors and recipes.",
    image: "/images/algerian-sweets.jpg",
    background: "bg-[#ead8c6]",
  },
  {
    title: "Custom Creations",
    description:
      "Have something special in mind? Tell us what you're imagining.",
    image: "/images/custom-cake.jpg",
    background: "bg-[#d9c3ce]",
  },
];

export default function Home() {
  return (
    <main
      className={`${bodyFont.className} min-h-screen bg-[#fff8f1] text-[#3f2a26]`}
    >
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#bd908a]">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10">
          <div className="relative z-10 max-w-xl text-[#fff9f4]">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#f6ddd5]">
              Freshly baked • Made to order
            </p>

            <h1
              className={`${headingFont.className} text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl`}
            >
              Life is better
              <br />
              with something
              <br />
              sweet.
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-[#fff1ec] sm:text-base">
              Homemade cakes, traditional Algerian sweets, cookies, and custom
              creations made carefully for every celebration.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-[#5c352f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#462722]"
              >
                Explore Our Menu
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-[#f6ddd5] px-6 py-3 text-sm font-medium transition hover:bg-[#fff8f1] hover:text-[#5c352f]"
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute h-[420px] w-[420px] rounded-full bg-[#d8aaa2]/60 blur-3xl" />

            <div className="relative h-[420px] w-full max-w-[520px] overflow-hidden rounded-[3rem] sm:h-[500px]">
              <Image
                src="/images/hero-pic.jpg"
                alt="Freshly baked cake"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-10">
        <Value
          number="01"
          title="Freshly Baked"
          text="Made fresh with care for every order."
        />

        <Value
          number="02"
          title="Quality Ingredients"
          text="Simple ingredients chosen for flavor and quality."
        />

        <Value
          number="03"
          title="Made for You"
          text="Personalized creations for your special moments."
        />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#a3776c]">
            Something for everyone
          </p>

          <h2
            className={`${headingFont.className} text-4xl font-semibold sm:text-5xl`}
          >
            Find Your Favorite
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className={`${category.background} group overflow-hidden rounded-[2rem] p-5`}
            >
              <div className="relative h-[280px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-2 pb-2 pt-6">
                <h3
                  className={`${headingFont.className} text-3xl font-semibold`}
                >
                  {category.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#654943]">
                  {category.description}
                </p>

                <Link
                  href="/order"
                  className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff8f1] text-xl transition group-hover:translate-x-1"
                  aria-label={`Order ${category.title}`}
                >
                  →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#f2dfd5]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div className="relative min-h-[420px] overflow-hidden rounded-[3rem]">
            <Image
              src="/images/bakery-about.jpg"
              alt="Handmade bakery desserts"
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#9b645d]">
              Made with care
            </p>

            <h2
              className={`${headingFont.className} text-5xl font-semibold leading-none sm:text-6xl`}
            >
              A little sweetness
              <br />
              for every occasion.
            </h2>

            <p className="mt-6 leading-7 text-[#654943]">
              From familiar favorites to traditional Algerian desserts, every
              order is prepared with attention to flavor, presentation, and the
              people it is being made for.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-block rounded-full bg-[#9b645d] px-6 py-3 text-sm text-white transition hover:bg-[#814f49]"
            >
              Meet the Baker
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[3rem] bg-[#5e3934] px-8 py-16 text-center text-[#fff8f1] sm:px-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#deb9b0]">
            Have something in mind?
          </p>

          <h2
            className={`${headingFont.className} mx-auto max-w-2xl text-5xl font-semibold leading-none sm:text-6xl`}
          >
            Let's make something special.
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-[#eddad5]">
            Tell us what you're looking for, when you need it, and a little
            about your celebration.
          </p>

          <Link
            href="/order"
            className="mt-8 inline-block rounded-full bg-[#fff8f1] px-7 py-3 text-sm font-medium text-[#5e3934] transition hover:bg-white"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </main>
  );
}

function Value({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0d1ca] text-xs font-semibold text-[#8c5c54]">
        {number}
      </div>

      <div>
        <h3 className={`${headingFont.className} text-xl font-semibold`}>
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[#70514b]">{text}</p>
      </div>
    </div>
  );
}
