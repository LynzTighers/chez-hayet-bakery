import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="min-h-[70vh]">
      <PageHeader eyebrow="Get in touch" title="Say" accent="hello">
        Questions about an order, allergies, or a custom idea? Send a message and I&apos;ll get
        back to you by email.
      </PageHeader>
      <div className="px-6 pb-12">
        <ContactForm />
      </div>
    </main>
  );
}
