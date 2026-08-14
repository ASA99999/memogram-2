"use client";

import { useEffect, useMemo, useState } from "react";

type Order = {
  orderId: string;
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  size?: string;
  qty?: string;
  ai?: string;
  description?: string;
  grandTotal?: string;
  status?: string;
  createdAt?: string;
  images: string[];
};

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        const data = (await response.json()) as Order[];
        setOrders(data);
        setSelectedOrderId((current) => current ?? data[0]?.orderId ?? null);
      } catch (err) {
        console.error(err);
        setError("Захиалгуудыг татаж чадсангүй.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.orderId === selectedOrderId) ?? orders[0] ?? null,
    [orders, selectedOrderId]
  );

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100">
      <aside className="w-full max-w-xs border-r border-slate-700 bg-slate-900 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Orders</h1>
          <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-200">
            {orders.length}
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-slate-300">Loading orders...</p>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-slate-400">No orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => {
              const isSelected = selectedOrder?.orderId === order.orderId;

              return (
                <li key={order.orderId}>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderId(order.orderId)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-100">{order.name || "Unnamed customer"}</span>
                      <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-200">
                        {order.status || "pending"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-300">{order.product || "No product"}</p>
                    <p className="mt-1 text-xs text-slate-400">{formatDate(order.createdAt)}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {!selectedOrder ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            Select an order to view details.
          </div>
        ) : (
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-lg shadow-slate-950/40">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Order</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">{selectedOrder.name || "Customer"}</h2>
                </div>
                <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                  {selectedOrder.status || "pending"}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <InfoRow label="Phone" value={selectedOrder.phone || "-"} />
                <InfoRow label="Email" value={selectedOrder.email || "-"} />
                <InfoRow label="Product" value={selectedOrder.product || "-"} />
                <InfoRow label="Size" value={selectedOrder.size || "-"} />
                <InfoRow label="Qty" value={selectedOrder.qty || "-"} />
                <InfoRow label="AI" value={selectedOrder.ai || "-"} />
                <InfoRow label="Total" value={selectedOrder.grandTotal || "-"} />
                <InfoRow label="Date" value={formatDate(selectedOrder.createdAt)} />
              </div>

              <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <h3 className="mb-2 text-sm uppercase tracking-[0.18em] text-slate-400">Description</h3>
                <p className="whitespace-pre-wrap text-slate-200">
                  {selectedOrder.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Images</h3>

              {selectedOrder.images && selectedOrder.images.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {selectedOrder.images.map((image, index) => (
                    <img
                      key={`${selectedOrder.orderId}-${index}`}
                      src={image}
                      alt={`${selectedOrder.name || "Order"} image ${index + 1}`}
                      className="h-64 w-full rounded-xl object-cover border border-slate-700"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">No images uploaded for this order.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-slate-700 bg-slate-800 p-3">
    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
    <p className="mt-2 break-words text-sm font-medium text-slate-100">{value}</p>
  </div>
);

export default AdminPage;