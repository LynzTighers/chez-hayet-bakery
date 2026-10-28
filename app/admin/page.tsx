"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LoggedOutError, adminApi, todayString, type Contact, type Order, type OrderStatus } from "../lib/admin";
import MessagesPanel from "./MessagesPanel";
import OrdersPanel from "./OrdersPanel";

// The baker's dashboard. The real protection is on the API (every /api/admin route
// checks the login cookie); this page just sends anyone who isn't logged in to the
// login form.
export default function AdminPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<"orders" | "messages">("orders");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string>();

  const handleError = useCallback(
    (err: unknown) => {
      if (err instanceof LoggedOutError) router.replace("/admin/login");
      else setError("Couldn't load your data. Check your connection and try again.");
    },
    [router],
  );

  const apply = useCallback((data: DashboardData) => {
    setUsername(data.username);
    setOrders(data.orders);
    setContacts(data.contacts);
    setError(undefined);
  }, []);

  const load = useCallback(
    () => fetchDashboard().then(apply).catch(handleError),
    [apply, handleError],
  );

  useEffect(() => {
    fetchDashboard().then(apply).catch(handleError);
  }, [apply, handleError]);

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  // Update the card straight away, and put it back if the server says no.
  async function changeStatus(id: number, status: OrderStatus) {
    const previous = orders;
    setOrders((rows) => rows.map((row) => (row.id === id ? { ...row, status } : row)));
    try {
      const updated = await adminApi.setOrderStatus(id, status);
      setOrders((rows) => rows.map((row) => (row.id === id ? updated : row)));
    } catch (err) {
      setOrders(previous);
      handleError(err);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (!username) {
    return error ? (
      <p className="text-center text-red-700">{error}</p>
    ) : (
      <p className="text-center text-latte">Checking your login…</p>
    );
  }

  const today = todayString();
  const newOrders = orders.filter((o) => o.status === "new").length;
  const dueSoon = orders.filter(
    (o) => (o.status === "new" || o.status === "confirmed") && o.pickupDate <= addDays(today, 2),
  ).length;
  const newMessages = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-rose-deep">Baker dashboard</p>
          <h1 className="font-display text-4xl font-semibold text-cocoa sm:text-5xl">
            Hello, <span className="font-script text-5xl font-normal text-rose-deep sm:text-6xl">{username}</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={refresh}
            disabled={refreshing}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-cocoa ring-1 ring-petal transition hover:bg-blush disabled:opacity-50"
          >
            {refreshing ? "Refreshing…" : "↻ Refresh"}
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-cocoa ring-1 ring-cocoa/20 transition hover:ring-cocoa"
          >
            Log out
          </button>
        </div>
      </div>

      {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {/* At a glance */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
        <Stat value={newOrders} label="New orders" />
        <Stat value={dueSoon} label="Pickups in the next 3 days" highlight={dueSoon > 0} />
        <Stat value={newMessages} label="Unread messages" />
      </div>

      <div className="mt-10 flex gap-6 border-b border-petal" role="tablist">
        <TabButton active={tab === "orders"} onClick={() => setTab("orders")}>
          Orders
        </TabButton>
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")}>
          Messages {newMessages > 0 && <span className="ml-1 rounded-full bg-rose-deep px-2 text-xs text-white">{newMessages}</span>}
        </TabButton>
      </div>

      <div className="mt-6">
        {tab === "orders" ? (
          <OrdersPanel orders={orders} onStatusChange={changeStatus} />
        ) : (
          <MessagesPanel contacts={contacts} />
        )}
      </div>
    </div>
  );
}

type DashboardData = { username: string; orders: Order[]; contacts: Contact[] };

// Loads everything the dashboard shows in one go.
async function fetchDashboard(): Promise<DashboardData> {
  const [me, orders, contacts] = await Promise.all([
    fetch("/api/auth/me").then((res) => {
      if (res.status === 401) throw new LoggedOutError();
      return res.json() as Promise<{ username: string }>;
    }),
    adminApi.orders(),
    adminApi.contacts(),
  ]);
  return { username: me.username, orders, contacts };
}

function addDays(day: string, days: number) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d + days).toLocaleDateString("en-CA");
}

function Stat({ value, label, highlight = false }: { value: number; label: string; highlight?: boolean }) {
  return (
    <div className={`rounded-3xl p-4 sm:p-6 ${highlight ? "bg-peach/50" : "bg-blush"}`}>
      <p className="font-display text-4xl font-semibold text-cocoa sm:text-5xl">{value}</p>
      <p className="mt-1 text-xs leading-5 text-latte sm:text-sm">{label}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`-mb-px border-b-2 px-1 pb-3 font-display text-xl transition ${
        active ? "border-rose-deep text-cocoa" : "border-transparent text-latte hover:text-cocoa"
      }`}
    >
      {children}
    </button>
  );
}
