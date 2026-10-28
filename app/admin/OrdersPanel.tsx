"use client";
import { useState } from "react";
import {
  ORDER_STATUSES,
  categoryLabel,
  formatDay,
  formatReceived,
  relativeDay,
  todayString,
  type Order,
  type OrderStatus,
} from "../lib/admin";

const FILTERS = [
  { id: "active", label: "To do", statuses: ["new", "confirmed"] },
  { id: "completed", label: "Completed", statuses: ["completed"] },
  { id: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
  { id: "all", label: "All", statuses: ORDER_STATUSES },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-peach/60 text-cocoa",
  confirmed: "bg-[#dcebd9] text-[#2f5a35]",
  completed: "bg-mauve text-cocoa",
  cancelled: "bg-stone-200 text-stone-600",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function OrdersPanel({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange: (id: number, status: OrderStatus) => Promise<void>;
}) {
  const [filter, setFilter] = useState<FilterId>("active");
  const current = FILTERS.find((f) => f.id === filter)!;

  const shown = orders
    .filter((order) => (current.statuses as readonly OrderStatus[]).includes(order.status))
    // To-do orders are sorted by pickup day (soonest first); the rest newest first.
    .sort((a, b) =>
      filter === "active"
        ? a.pickupDate.localeCompare(b.pickupDate)
        : b.createdAt.localeCompare(a.createdAt),
    );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter orders">
        {FILTERS.map((f) => {
          const count = orders.filter((o) => (f.statuses as readonly OrderStatus[]).includes(o.status)).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f.id ? "bg-cocoa text-cream" : "bg-white text-cocoa ring-1 ring-petal hover:bg-blush"
              }`}
            >
              {f.label} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="rounded-3xl bg-white/60 p-10 text-center text-latte ring-1 ring-petal">
          {filter === "active" ? "Nothing to do right now. 🎉" : "No orders here yet."}
        </p>
      ) : (
        <ul className="space-y-4">
          {shown.map((order) => (
            <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
          ))}
        </ul>
      )}
    </div>
  );
}

function OrderCard({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: number, status: OrderStatus) => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);
  const active = order.status === "new" || order.status === "confirmed";
  const overdue = active && order.pickupDate < todayString();
  const soon = active && !overdue && ["Today", "Tomorrow"].includes(relativeDay(order.pickupDate));

  async function change(status: OrderStatus) {
    setSaving(true);
    await onStatusChange(order.id, status);
    setSaving(false);
  }

  return (
    <li className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-petal sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-rose-deep">
            #{order.id} · {categoryLabel(order.category)}
            {order.product && <> · {order.product}</>}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-cocoa">
            {order.firstName} {order.lastName}
          </h3>
        </div>

        {/* Pickup day, highlighted when it's close or late */}
        <div
          className={`rounded-2xl px-4 py-2 text-right ${
            overdue ? "bg-red-100 text-red-800" : soon ? "bg-peach/50 text-cocoa" : "bg-blush text-cocoa"
          }`}
        >
          <p className="text-xs uppercase tracking-wider opacity-70">Pickup</p>
          <p className="font-semibold">{formatDay(order.pickupDate)}</p>
          <p className="text-xs">{overdue ? `Overdue · ${relativeDay(order.pickupDate)}` : relativeDay(order.pickupDate)}</p>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-line leading-7 text-cocoa-deep">{order.details}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-petal/70 pt-4 text-sm">
        <a
          href={`tel:${order.phone}`}
          className="rounded-full bg-cocoa px-4 py-2 font-medium text-cream transition hover:bg-rose-deep"
        >
          📞 {order.phone}
        </a>
        <a
          href={`mailto:${order.email}`}
          className="rounded-full px-4 py-2 text-cocoa ring-1 ring-petal transition hover:bg-blush"
        >
          ✉️ {order.email}
        </a>
        <span className="text-xs text-latte">Received {formatReceived(order.createdAt)}</span>

        <label className="ml-auto flex items-center gap-2">
          <span className="sr-only">Status for order {order.id}</span>
          <select
            value={order.status}
            disabled={saving}
            onChange={(event) => change(event.target.value as OrderStatus)}
            className={`cursor-pointer rounded-full border-0 px-4 py-2 font-medium outline-none ring-1 ring-petal transition disabled:opacity-50 ${
              STATUS_STYLE[order.status]
            }`}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABEL[status]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </li>
  );
}
