"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// The baker's home. Step 4 turns this into the orders & messages dashboard.
// The real protection is on the API (every /api/admin route checks the login cookie);
// this page just sends anyone who isn't logged in to the login form.
export default function AdminPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((body: { username: string }) => setUsername(body.username))
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (!username) {
    return <p className="text-center text-latte">Checking your login…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="font-display text-5xl font-semibold text-cocoa">
        Hello, <span className="font-script text-6xl font-normal text-rose-deep">{username}</span>
      </h1>
      <p className="mt-4 text-latte">You&apos;re logged in. Your orders and messages will appear here.</p>
      <button
        type="button"
        onClick={logout}
        className="mt-8 rounded-full border-2 border-cocoa/20 px-7 py-3 text-sm font-medium text-cocoa transition hover:border-cocoa"
      >
        Log out
      </button>
    </div>
  );
}
