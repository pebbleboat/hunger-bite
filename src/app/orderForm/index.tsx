"use client";

import { useHook } from "./useHook";


export function OrderForm() {
  const {
    outletId,
    setOutletId,
    item,
    setItem,
    quantity,
    setQuantity,
    busy,
    message,
    lastCreated,
    orders,
    listError,
    loadOrders,
    handleSubmit,
    orderApiBaseUrl,
  } = useHook();

  return (
    <div style={{ padding: "1rem", maxWidth: 560 }}>
      <h1 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 12 }}>
        Place order
      </h1>
      <p style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: 16 }}>
        POSTs to order-service at <code>{orderApiBaseUrl}</code> → emits{" "}
        <code>order_created</code> to Kafka → POS consumes and shows the order.
      </p>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        style={{ display: "grid", gap: 12, marginBottom: 20 }}
      >
        <label style={{ display: "grid", gap: 4, fontSize: "0.85rem" }}>
          Outlet ID
          <input
            value={outletId}
            onChange={(e) => setOutletId(e.target.value)}
            required
            style={{ padding: "6px 10px" }}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: "0.85rem" }}>
          Item
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            style={{ padding: "6px 10px" }}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: "0.85rem" }}>
          Quantity
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            style={{ padding: "6px 10px" }}
          />
        </label>
        <button type="submit" disabled={busy} style={{ padding: "8px 12px" }}>
          {busy ? "Sending…" : "Place order"}
        </button>
      </form>

      {message ? (
        <pre
          style={{
            fontSize: "0.8rem",
            marginBottom: 16,
            whiteSpace: "pre-wrap",
            color: message.startsWith("Created") ? "inherit" : "crimson",
          }}
        >
          {message}
        </pre>
      ) : null}

      {lastCreated ? (
        <p style={{ fontSize: "0.8rem", marginBottom: 16 }}>
          Last: <code>{lastCreated._id}</code> — {lastCreated.item} ×{" "}
          {lastCreated.quantity}
        </p>
      ) : null}

      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <h2 style={{ fontSize: "0.95rem" }}>Orders (order-service DB)</h2>
          <button type="button" onClick={() => void loadOrders()}>
            Refresh
          </button>
        </div>
        {listError ? (
          <p style={{ color: "crimson", fontSize: "0.85rem" }}>{listError}</p>
        ) : null}
        <ul style={{ fontSize: "0.85rem", listStyle: "none" }}>
          {orders.map((o) => (
            <li
              key={o._id}
              style={{
                padding: "6px 0",
                borderBottom: "1px solid rgba(128,128,128,0.25)",
              }}
            >
              <code>{o._id}</code> — {o.item} × {o.quantity}
              {o.status ? ` — ${o.status}` : ""}
            </li>
          ))}
        </ul>
        {orders.length === 0 && !listError ? (
          <p style={{ opacity: 0.6, fontSize: "0.85rem" }}>No orders yet.</p>
        ) : null}
      </section>
    </div>
  );
}
