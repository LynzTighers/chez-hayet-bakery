// Types and helpers for the baker's dashboard. Shapes match the API's JSON.
import { categories } from "./categories";

export const ORDER_STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type Order = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  category: string;
  product: string | null;
  details: string;
  pickupDate: string; // YYYY-MM-DD
  status: OrderStatus;
  createdAt: string;
};

export type Contact = {
  id: number;
  name: string;
  phone: string | null;
  email: string;
  message: string;
  status: "new" | "replied";
  repliedAt: string | null;
  createdAt: string;
  replies: ContactReply[];
};

export type ContactReply = {
  id: number;
  contactId: number;
  message: string;
  sentAt: string;
};

// An API error with the server's own message (e.g. "Email sending isn't set up yet.").
export class ApiError extends Error {}

// Thrown when the API says the login has expired, so the page can send the baker
// back to the login form.
export class LoggedOutError extends Error {}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (res.status === 401) throw new LoggedOutError();
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.fields?.message?.[0] ?? body?.error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const adminApi = {
  orders: () => request<Order[]>("/api/admin/orders"),
  contacts: () => request<Contact[]>("/api/admin/contacts"),
  setOrderStatus: (id: number, status: OrderStatus) =>
    request<Order>(`/api/admin/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  replyToContact: (id: number, message: string) =>
    request<ContactReply>(`/api/admin/contacts/${id}/reply`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};

export function categoryLabel(value: string) {
  return categories.find((category) => category.value === value)?.title ?? value;
}

// --- Dates ---

// The browser's "today" as YYYY-MM-DD, comparable with pickupDate strings.
export function todayString() {
  return new Date().toLocaleDateString("en-CA");
}

function parseDay(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date);
}

// "Today", "Tomorrow", "In 5 days", "3 days ago"
export function relativeDay(day: string) {
  const diff = Math.round((parseDay(day).getTime() - parseDay(todayString()).getTime()) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  return diff > 0 ? `In ${diff} days` : `${-diff} days ago`;
}

export function formatDay(day: string) {
  return parseDay(day).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function formatReceived(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
