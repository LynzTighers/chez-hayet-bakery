import { Cormorant_Garamond } from "next/font/google";
import ContactForm from "../components/ContactForm";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function ContactPage() {
  return (
    <main className="min-h-[70vh] px-6 py-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className={`${headingFont.className} text-4xl font-semibold text-[#5e3934]`}>
          Contact Us
        </h1>
        <p className="mt-3 text-[#5e3934]">
          Questions about an order, allergies, or a custom idea? Send us a
          message and we&apos;ll get back to you by email.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
