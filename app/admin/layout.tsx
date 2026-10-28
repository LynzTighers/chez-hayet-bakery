import type { Metadata } from "next";

// Keep the baker's pages out of Google.
export const metadata: Metadata = {
  title: "Baker",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[70vh] px-6 py-14">{children}</main>;
}
