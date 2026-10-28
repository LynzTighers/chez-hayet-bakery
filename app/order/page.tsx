import OrderForm from "../components/Form";

// <html> and <body> come from app/layout.tsx; pages only render their own content.
export default function OrderPage() {
  return (
    <main className="min-h-[70vh] px-6 py-12">
      <OrderForm />
    </main>
  );
}
