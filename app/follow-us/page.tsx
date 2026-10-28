import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "Follow Us" };

export default function FollowUsPage() {
  return (
    <main className="min-h-[70vh]">
      <PageHeader eyebrow="Coming soon" title="Follow the" accent="sweetness">
        Social pages are on the way. Until then, the best way to reach me is a message.
      </PageHeader>

      <Reveal className="px-6 py-12 text-center">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 rounded-full bg-rose-deep px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-rose-deep/20 transition hover:-translate-y-0.5 hover:bg-cocoa"
        >
          Send a message
          <span className="transition group-hover:translate-x-1">→</span>
        </Link>
      </Reveal>
    </main>
  );
}
