import type { Metadata } from "next";
import Link from "next/link";
import { BlobPhoto } from "../components/Decor";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "About" };

// Hayet's own words, split into readable pieces. Edit the text here.
const highlights = [
  {
    title: "Birthdays",
    text: "Homemade cakes and desserts to make the day feel special.",
  },
  {
    title: "Celebrations",
    text: "Treats for special occasions, gatherings, or simply when you're craving something sweet.",
  },
  {
    title: "Custom creations",
    text: "Bring me your idea and I'll bring it to life.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Meet the baker" title="Hi, I'm" accent="Hayet" />

      {/* STORY */}
      <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-12 lg:grid-cols-[1fr_1.15fr] lg:px-10">
        <Reveal className="mx-auto w-full max-w-[420px]">
          <BlobPhoto src="/images/bakery-about.jpg" alt="Homemade desserts by Hayet" backdrop="bg-peach" />
        </Reveal>

        <Reveal delay={150} className="space-y-6 text-lg leading-8 text-latte">
          <p className="font-display text-3xl font-semibold leading-snug text-cocoa">
            Welcome to Chez Hayet Bakery!
          </p>
          <p>
            What started as a love for baking at home has grown into a small business created
            around something I truly enjoy:{" "}
            <span className="font-medium text-cocoa">making beautiful and delicious treats for others.</span>
          </p>
          <p>
            I love creating homemade cakes and desserts for birthdays, celebrations, special
            occasions, or simply when you&apos;re craving something sweet.
          </p>
        </Reveal>
      </section>

      {/* PULL QUOTE */}
      <section className="px-6 py-10">
        <Reveal>
          <blockquote className="relative mx-auto max-w-3xl rounded-[2.5rem] bg-blush px-8 py-12 text-center sm:px-14">
            <span
              aria-hidden
              className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 animate-blob items-center justify-center bg-rose pt-5 font-display text-6xl leading-none text-cream"
            >
              &ldquo;
            </span>
            <p className="font-display text-2xl leading-snug text-cocoa sm:text-3xl">
              Each order is prepared with care and attention to detail, and I enjoy bringing my
              customers&apos; ideas to life through custom creations.
            </p>
          </blockquote>
        </Reveal>
      </section>

      {/* WHAT I MAKE */}
      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-4xl font-semibold text-cocoa">
            What I <span className="font-script text-5xl font-normal text-rose-deep">love</span> to make
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 120}>
              <div className="h-full rounded-[2rem] border border-petal bg-white/60 p-7 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-cocoa/10">
                <div className="mb-5 flex h-12 w-12 animate-blob items-center justify-center bg-petal font-script text-2xl text-rose-deep">
                  {index + 1}
                </div>
                <h3 className="font-display text-2xl font-semibold text-cocoa">{item.title}</h3>
                <p className="mt-2 leading-7 text-latte">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MISSION + SIGN-OFF */}
      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <Reveal className="space-y-6 text-lg leading-8 text-latte">
          <p>
            As a local small business serving the{" "}
            <span className="font-medium text-cocoa">Columbus, Ohio</span> area, my goal is simple:
            to provide fresh, delicious desserts made with love and to make every order feel a
            little extra special.
          </p>
          <p>
            Thank you for supporting Chez Hayet Bakery and allowing me to be a sweet part of your
            special moments.
          </p>
          <p className="font-script text-6xl text-rose-deep">Hayet</p>
        </Reveal>

        <Reveal delay={150} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/order"
            className="group inline-flex items-center gap-3 rounded-full bg-rose-deep px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-rose-deep/20 transition hover:-translate-y-0.5 hover:bg-cocoa"
          >
            Place an order
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/contact"
            className="rounded-full border-2 border-cocoa/20 px-7 py-3.5 text-sm font-medium text-cocoa transition hover:-translate-y-0.5 hover:border-cocoa"
          >
            Say hello
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
