"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField, FormStatus, SubmitButton, borderClass, inputClass } from "../../components/FormField";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(undefined);

    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
      });
      if (res.ok) {
        router.replace("/admin");
        return;
      }
      const body = await res.json().catch(() => null);
      setMessage(body?.error ?? "Something went wrong. Please try again.");
    } catch {
      setMessage("Couldn't reach the server. Check your connection and try again.");
    }
    setSubmitting(false);
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-rose-deep">Baker only</p>
        <h1 className="font-display text-5xl font-semibold text-cocoa">
          Welcome <span className="font-script text-6xl font-normal text-rose-deep">back</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-[#fffaf6] p-8 shadow-sm ring-1 ring-petal"
      >
        <FormField id="username" label="Username">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            required
            className={`${inputClass} ${borderClass()}`}
          />
        </FormField>

        <FormField id="password" label="Password">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`${inputClass} ${borderClass()}`}
          />
        </FormField>

        <FormStatus message={message} />
        <SubmitButton submitting={submitting} label="Log in" />
      </form>
    </div>
  );
}
