import { useState } from "react";
import "./ReadyOrders.css";

const customerOrders = [
  ["ORD-001", "Priya Sharma", "Chocolate Truffle", 1, "Ready"],
  ["ORD-002", "Rahul Patil", "Black Forest", 2, "Pending"],
  ["ORD-003", "Sneha Joshi", "Red Velvet", 1, "Ready"],
  ["ORD-004", "Amit Deshmukh", "White Forest", 1, "Pending"],
  ["ORD-005", "Neha Kulkarni", "Vanilla Cake", 2, "Ready"],
  ["ORD-006", "Rohan Shah", "Butterscotch Cake", 1, "Pending"],
  ["ORD-007", "Pooja Patil", "Pineapple Cake", 1, "Ready"],
  ["ORD-008", "Akash Jadhav", "Mango Cake", 2, "Pending"],
  ["ORD-009", "Snehal More", "Strawberry Cake", 1, "Ready"],
  ["ORD-010", "Kunal Pawar", "Oreo Cake", 1, "Pending"],
  ["ORD-011", "Anjali Shinde", "KitKat Cake", 2, "Ready"],
  ["ORD-012", "Sahil More", "Ferrero Rocher Cake", 1, "Pending"],
  ["ORD-013", "Kavya Patil", "Coffee Cake", 1, "Ready"],
  ["ORD-014", "Omkar Joshi", "Caramel Cake", 2, "Pending"],
  ["ORD-015", "Riya Sharma", "Blueberry Cake", 1, "Ready"],
  ["ORD-016", "Aditya Kulkarni", "Chocolate Fudge Cake", 1, "Pending"],
  ["ORD-017", "Mansi Desai", "Black Currant Cake", 2, "Ready"],
  ["ORD-018", "Varun Patil", "Choco Chips Cake", 1, "Pending"],
  ["ORD-019", "Isha Mehta", "Almond Cake", 1, "Ready"],
  ["ORD-020", "Siddharth Pawar", "Rainbow Cake", 2, "Pending"],
];

const extraProducts = [
  ["EX-001", "Chocolate Cupcakes", 12],
  ["EX-002", "Vanilla Cupcakes", 10],
  ["EX-003", "Brownies", 15],
  ["EX-004", "Chocolate Muffins", 8],
  ["EX-005", "Donuts", 12],
  ["EX-006", "Pineapple Pastries", 10],
  ["EX-007", "Chocolate Pastries", 10],
  ["EX-008", "Cheese Cake Slices", 6],
  ["EX-009", "Cookies", 20],
  ["EX-010", "Chocolate Eclairs", 8],
];

function ReadyOrders({ onDashboard }) {
  const [orders, setOrders] = useState(
    customerOrders.map((item) => ({
      id: item[0],
      customer: item[1],
      cake: item[2],
      quantity: item[3],
      status: item[4],
      type: "Customer Order",
      readyDate: "2026-10-24",
    }))
  );

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Orders");

  const readyOrders = orders.filter(
    (order) => order.status === "Ready"
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  );

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      `${order.id} ${order.customer} ${order.cake}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesTab =
      activeTab === "All Orders" ||
      order.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const markReady = (id) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id
          ? { ...order, status: "Ready" }
          : order
      )
    );
  };

  const markCompleted = (id) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id
          ? { ...order, status: "Completed" }
          : order
      )
    );
  };

  return (
    <div className="ready-orders-page">
      <header className="ready-orders-header">
        <div>
          <p className="ready-eyebrow">BAKERY / PRODUCTION</p>
          <h1>Ready & Pending Products</h1>
          <p className="ready-subtitle">
            Manage customer orders and extra bakery production.
          </p>
        </div>

        {onDashboard && (
          <button
            className="ready-back-btn"
            onClick={onDashboard}
            type="button"
          >
            ← Back to Dashboard
          </button>
        )}
      </header>

      <div className="ready-stats">
        <div className="ready-stat-card">
          <span>📋</span>
          <p>Total Customer Orders</p>
          <h2>{orders.length}</h2>
        </div>

        <div className="ready-stat-card">
          <span>⏳</span>
          <p>Pending Orders</p>
          <h2>{pendingOrders.length}</h2>
        </div>

        <div className="ready-stat-card">
          <span>🎂</span>
          <p>Ready Orders</p>
          <h2>{readyOrders.length}</h2>
        </div>

        <div className="ready-stat-card">
          <span>✓</span>
          <p>Completed</p>
          <h2>{completedOrders.length}</h2>
        </div>
      </div>

      <section className="ready-orders-panel">
        <div className="ready-panel-heading">
          <div>
            <h2>Customer Orders</h2>
            <p>20 customers and their cake orders</p>
          </div>

          <input
            className="ready-search"
            type="search"
            placeholder="Search customer or product..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="ready-tabs">
          {["All Orders", "Pending", "Ready", "Completed"].map(
            (tab) => (
              <button
                key={tab}
                type="button"
                className={`ready-tab ${
                  activeTab === tab ? "active-tab" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="ready-table-wrapper">
          <table className="ready-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.cake}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span
                      className={`ready-status status-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === "Pending" && (
                      <button
                        className="ready-complete-btn"
                        onClick={() => markReady(order.id)}
                        type="button"
                      >
                        Mark Ready
                      </button>
                    )}

                    {order.status === "Ready" && (
                      <button
                        className="ready-complete-btn"
                        onClick={() => markCompleted(order.id)}
                        type="button"
                      >
                        Complete
                      </button>
                    )}

                    {order.status === "Completed" && (
                      <span className="ready-done-text">
                        ✓ Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="ready-empty">
                    No matching orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ready-orders-panel extra-products-panel">
        <div className="ready-panel-heading">
          <div>
            <p className="ready-eyebrow">EXTRA PRODUCTION</p>
            <h2>Ready Products — No Customer Order</h2>
            <p>
              Products prepared in advance for walk-in customers.
            </p>
          </div>
          <span className="extra-count">
            {extraProducts.length} Products
          </span>
        </div>

        <div className="extra-products-grid">
          {extraProducts.map((product) => (
            <div className="extra-product-card" key={product[0]}>
              <div className="extra-product-icon">🎂</div>
              <div>
                <h3>{product[1]}</h3>
                <p>Stock: {product[2]} pieces</p>
                <span className="extra-ready-label">
                  Ready for Sale
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="ready-footer-note">
        ♡ Freshly baked and prepared with love.
      </p>
    </div>
  );
}

export default ReadyOrders;