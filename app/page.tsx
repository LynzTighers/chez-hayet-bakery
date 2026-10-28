import Image from "next/image";
import Link from "next/link";
import { BlobPhoto, Sprinkles, Wave } from "./components/Decor";
import Reveal from "./components/Reveal";
import { categories } from "./lib/categories";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative bg-blush text-cocoa">
        <Sprinkles />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-10 pt-14 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:pt-20">
          <Reveal className="relative z-10 max-w-xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-cream/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-rose-deep">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-deep" />
              Freshly baked • Made to order
            </p>

            <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Life is better with something{" "}
              <span className="relative inline-block font-script text-7xl font-normal text-rose-deep sm:text-8xl lg:text-9xl">
                sweet.
              </span>
            </h1>

            <p className="mt-7 max-w-md leading-7 text-latte sm:text-lg">
              Homemade cakes, traditional Algerian sweets, cookies, and custom creations made
              carefully for every celebration.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-cocoa px-7 py-3.5 text-sm font-medium text-cream shadow-lg shadow-cocoa/20 transition hover:-translate-y-0.5 hover:bg-cocoa-deep"
              >
                Explore Our Menu
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/about"
                className="rounded-full border-2 border-cocoa/20 px-7 py-3.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-cocoa hover:bg-cream"
              >
                Our Story
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto w-full max-w-[480px]">
            <BlobPhoto src="/images/hero-pic.jpg" alt="Freshly baked cake" backdrop="bg-peach" priority />
            {/* Little label that floats over the photo */}
            <div className="absolute -bottom-2 left-0 animate-float-slow rounded-2xl bg-cream px-5 py-3 shadow-xl shadow-cocoa/10 sm:-left-6">
              <p className="font-script text-3xl leading-none text-rose-deep">Handmade</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-latte">in Columbus, OH</p>
            </div>
          </Reveal>
        </div>
        <Wave className="text-cream" />
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-10">
        <Value number="01" title="Freshly Baked" text="Made fresh with care for every order." delay={0} />
        <Value
          number="02"
          title="Quality Ingredients"
          text="Simple ingredients chosen for flavor and quality."
          delay={120}
        />
        <Value
          number="03"
          title="Made for You"
          text="Personalized creations for your special moments."
          delay={240}
        />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-10">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-rose-deep">
            Something for everyone
          </p>
          <h2 className="font-display text-4xl font-semibold text-cocoa sm:text-5xl">
            Find Your <span className="font-script text-5xl font-normal text-rose-deep sm:text-6xl">Favorite</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 120}>
              <Link
                href="/order"
                className={`${category.background} group block h-full rounded-[2rem] p-5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cocoa/15`}
              >
                {/* Arched photo, like a pâtisserie window */}
                <div className="relative h-[300px] overflow-hidden rounded-t-full rounded-b-[1.5rem]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="px-2 pb-2 pt-6">
                  <h3 className="font-display text-3xl font-semibold text-cocoa">{category.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-latte">{category.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-cocoa transition group-hover:bg-cocoa group-hover:text-cream">
                    Order this
                    <span className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative">
        <Wave className="text-mauve/60" flip />
        <div className="bg-mauve/60">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:px-10">
            <Reveal className="mx-auto w-full max-w-[460px]">
              <BlobPhoto src="/images/bakery-about.jpg" alt="Handmade bakery desserts" backdrop="bg-petal" />
            </Reveal>

            <Reveal delay={150} className="max-w-xl">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-rose-deep">Made with care</p>
              <h2 className="font-display text-5xl font-semibold leading-none text-cocoa sm:text-6xl">
                A little sweetness for every{" "}
                <span className="font-script font-normal text-rose-deep">occasion.</span>
              </h2>
              <p className="mt-6 leading-7 text-latte">
                From familiar favorites to traditional Algerian/French desserts, every order is
                prepared with attention to flavor, presentation, and the people it is being made
                for.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-rose-deep px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-rose-deep/20 transition hover:-translate-y-0.5 hover:bg-cocoa"
              >
                Meet the Baker
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
        <Wave className="text-cream" />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem] bg-cocoa px-8 py-16 text-center text-cream sm:px-16">
            <div aria-hidden className="absolute -left-20 -top-24 h-72 w-72 animate-blob bg-rose-deep/40" />
            <div
              aria-hidden
              className="absolute -bottom-28 -right-16 h-80 w-80 animate-blob bg-peach/20"
              style={{ animationDelay: "-8s" }}
            />
            <div className="relative">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-peach">Have something in mind?</p>
              <h2 className="mx-auto max-w-2xl font-display text-5xl font-semibold leading-none sm:text-6xl">
                Let&apos;s make something{" "}
                <span className="font-script font-normal text-peach">special.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl leading-7 text-[#eddad5]">
                Tell us what you&apos;re looking for, when you need it, and a little about your
                celebration.
              </p>
              <Link
                href="/order"
                className="mt-9 inline-block rounded-full bg-cream px-8 py-3.5 text-sm font-medium text-cocoa transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                Start Your Order
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Value({
  number,
  title,
  text,
  delay,
}: {
  number: string;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="group flex gap-4">
      <div className="flex h-14 w-14 shrink-0 animate-blob items-center justify-center bg-petal text-sm font-semibold text-rose-deep transition group-hover:bg-rose group-hover:text-white">
        {number}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-cocoa">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-latte">{text}</p>
      </div>
    </Reveal>
  );
}
