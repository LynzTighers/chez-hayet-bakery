import type { Metadata } from "next";
import OrderForm from "../components/Form";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = { title: "Order" };

// <html> and <body> come from app/layout.tsx; pages only render their own content.
export default function OrderPage() {
  return (
    <main className="min-h-[70vh]">
      <PageHeader eyebrow="Made to order" title="Place an" accent="order">
        Tell me what you&apos;d like and when you need it. I&apos;ll call you to confirm the
        details.
      </PageHeader>
      <div className="px-6 pb-12">
        <OrderForm />
      </div>
    </main>
  );
}
