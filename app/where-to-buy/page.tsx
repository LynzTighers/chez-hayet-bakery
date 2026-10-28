import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "Where to Buy" };

const steps = [
  { title: "Place your order", text: "Use the order form and tell me what you'd like and when." },
  { title: "I'll call you", text: "We'll go over the details together and confirm your order." },
  { title: "Pick it up", text: "Fresh on your chosen day, in the Columbus, Ohio area." },
];

export default function WhereToBuyPage() {
  return (
    <main className="min-h-[70vh]">
      <PageHeader eyebrow="Columbus, Ohio" title="Where to" accent="find me">
        There&apos;s no storefront yet. Every treat is made to order for local pickup.
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 120}>
              <div className="relative h-full rounded-[2rem] bg-white/60 p-7 text-center ring-1 ring-petal">
                <div className="mx-auto mb-5 flex h-14 w-14 animate-blob items-center justify-center bg-petal font-script text-3xl text-rose-deep">
                  {index + 1}
                </div>
                <h2 className="font-display text-2xl font-semibold text-cocoa">{step.title}</h2>
                <p className="mt-2 leading-7 text-latte">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/order"
            className="group inline-flex items-center gap-3 rounded-full bg-rose-deep px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-rose-deep/20 transition hover:-translate-y-0.5 hover:bg-cocoa"
          >
            Start an order
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
