// Shared pieces for the order and contact forms so both look and behave the same.

export const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-[#3f2a26] outline-none transition focus:border-[#9b645d]";

// Red border when the field has an error, the normal beige one otherwise.
export function borderClass(error?: string[]) {
  return error ? "border-red-400" : "border-[#e8d5cc]";
}

export function FormField({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#5e3934]">
        {label}
        {optional && <span className="font-normal text-[#9b7a74]"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error[0]}
        </p>
      )}
    </div>
  );
}

export function FormStatus({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}

export function SubmitButton({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="w-full rounded-full bg-[#9b645d] px-6 py-3 font-medium text-white transition hover:bg-[#814f49] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? "Sending..." : label}
    </button>
  );
}

export function ThankYou({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-[#fffaf6] p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-[#5e3934]">{title}</h2>
      <p className="mt-3 text-[#5e3934]">{children}</p>
    </div>
  );
}
