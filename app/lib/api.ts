// Sends form data to the Express API (through the /api proxy in next.config.ts).

export type FieldErrors = Record<string, string[] | undefined>;

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: FieldErrors };

export async function submitForm(path: string, form: HTMLFormElement): Promise<SubmitResult> {
  // Drop empty fields so optional ones (like phone on the contact form) are left out
  // instead of being sent as "" and failing validation.
  const data = Object.fromEntries(
    [...new FormData(form).entries()].filter(([, value]) => value !== ""),
  );

  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) return { ok: true };

    const body = await res.json().catch(() => null);
    if (res.status === 400 && body?.fields) {
      return { ok: false, message: "Please fix the highlighted fields.", fieldErrors: body.fields };
    }
    return { ok: false, message: "Something went wrong on our side. Please try again or call us." };
  } catch {
    return { ok: false, message: "We couldn't reach the bakery. Check your connection and try again." };
  }
}
