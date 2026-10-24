import { useState } from "react";
import "./Orders.css";

function Orders({ onDashboard }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "Priya Sharma",
      cake: "Chocolate Truffle Cake",
      date: "2026-10-19",
      amount: 1200,
      status: "Pending",
    },
    {
      id: "ORD-002",
      customer: "Rahul Patil",
      cake: "Black Forest Cake",
      date: "2026-10-19",
      amount: 850,
      status: "In Production",
    },
    {
      id: "ORD-003",
      customer: "Sneha Deshmukh",
      cake: "Red Velvet Cake",
      date: "2026-10-20",
      amount: 1500,
      status: "Ready",
    },
    {
      id: "ORD-004",
      customer: "Amit Joshi",
      cake: "Vanilla Birthday Cake",
      date: "2026-10-20",
      amount: 950,
      status: "Completed",
    },
    {
      id: "ORD-005",
      customer: "Neha Kulkarni",
      cake: "Butterscotch Cake",
      date: "2026-10-20",
      amount: 1100,
      status: "Pending",
    },
    {
      id: "ORD-006",
      customer: "Akash Shinde",
      cake: "Pineapple Cake",
      date: "2026-10-20",
      amount: 750,
      status: "In Production",
    },
    {
      id: "ORD-007",
      customer: "Pooja Patil",
      cake: "Strawberry Cake",
      date: "2026-10-20",
      amount: 999,
      status: "Ready",
    },
    {
      id: "ORD-008",
      customer: "Rohan More",
      cake: "White Forest Cake",
      date: "2026-10-19",
      amount: 1200,
      status: "Completed",
    },
    {
      id: "ORD-009",
      customer: "Snehal Jadhav",
      cake: "Oreo Chocolate Cake",
      date: "2026-10-18",
      amount: 1350,
      status: "Pending",
    },
    {
      id: "ORD-010",
      customer: "Om Desai",
      cake: "KitKat Cake",
      date: "2026-10-18",
      amount: 1450,
      status: "In Production",
    },
    {
      id: "ORD-011",
      customer: "Sakshi Pawar",
      cake: "Blueberry Cake",
      date: "2026-10-17",
      amount: 1600,
      status: "Ready",
    },
    {
      id: "ORD-012",
      customer: "Aditya Joshi",
      cake: "Vanilla Cream Cake",
      date: "2026-10-17",
      amount: 850,
      status: "Completed",
    },
  ]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.cake.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" || order.status === filter;

    return matchesSearch && matchesStatus;
  });

  function updateStatus(id, status) {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    setSelectedOrder((previous) =>
      previous && previous.id === id
        ? { ...previous, status }
        : previous
    );
  }

  function deleteOrder(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmed) {
      setOrders((previousOrders) =>
        previousOrders.filter((order) => order.id !== id)
      );

      if (selectedOrder?.id === id) {
        setSelectedOrder(null);
      }
    }
  }

  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const production = orders.filter(
    (order) => order.status === "In Production"
  ).length;

  const ready = orders.filter(
    (order) => order.status === "Ready"
  ).length;

  return (
    <div className="orders-page">
      <header className="orders-header">
        <div>
          <p className="orders-eyebrow">CAKE BAKERY MANAGEMENT</p>
          <h1>Orders Management</h1>
          <p className="orders-subtitle">
            Manage cake orders and track their progress.
          </p>
        </div>

        <button
          className="orders-back-btn"
          onClick={onDashboard}
          type="button"
        >
          ← Dashboard
        </button>
      </header>

      <div className="orders-stats">
        <div className="order-stat-card">
          <span>Total Orders</span>
          <h2>{orders.length}</h2>
          <small>All cake orders</small>
        </div>

        <div className="order-stat-card">
          <span>Pending</span>
          <h2>{pending}</h2>
          <small>Awaiting production</small>
        </div>

        <div className="order-stat-card">
          <span>In Production</span>
          <h2>{production}</h2>
          <small>Currently preparing</small>
        </div>

        <div className="order-stat-card">
          <span>Ready</span>
          <h2>{ready}</h2>
          <small>Ready for pickup</small>
        </div>
      </div>

      <section className="orders-content">
        <div className="orders-section-heading">
          <div>
            <h2>All Orders</h2>
            <p>Search and manage your bakery orders.</p>
          </div>
        </div>

        <div className="orders-toolbar">
          <input
            type="text"
            placeholder="Search order, customer or cake..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Production">In Production</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Cake Design</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.cake}</td>
                  <td>{order.date}</td>
                  <td>₹{order.amount.toLocaleString("en-IN")}</td>

                  <td>
                    <span
                      className={`order-status ${order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <div className="order-actions">
                      <button
                        className="order-view-btn"
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>

                      <button
                        className="order-delete-btn"
                        type="button"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="orders-empty">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedOrder && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <button
              className="order-modal-close"
              type="button"
              onClick={() => setSelectedOrder(null)}
            >
              ×
            </button>

            <p className="orders-eyebrow">ORDER DETAILS</p>
            <h2>{selectedOrder.id}</h2>

            <div className="order-detail-list">
              <p>
                <strong>Customer:</strong> {selectedOrder.customer}
              </p>
              <p>
                <strong>Cake:</strong> {selectedOrder.cake}
              </p>
              <p>
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Amount:</strong> ₹
                {selectedOrder.amount.toLocaleString("en-IN")}
              </p>
            </div>

            <label className="order-status-label">
              Update Order Status
            </label>

            <select
              value={selectedOrder.status}
              onChange={(event) =>
                updateStatus(selectedOrder.id, event.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Production">In Production</option>
              <option value="Ready">Ready</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              className="order-save-btn"
              type="button"
              onClick={() => setSelectedOrder(null)}
            >
              Save & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;