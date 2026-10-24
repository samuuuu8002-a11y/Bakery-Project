import { useState } from "react";
import "./AssignedOrders.css";

function AssignedOrders({ onDashboard }) {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "Priya Sharma",
      cake: "Chocolate Truffle",
      quantity: 1,
      dueDate: "2026-10-26",
      priority: "High",
      status: "Pending",
    },
    {
      id: "ORD-002",
      customer: "Rahul Patil",
      cake: "Black Forest",
      quantity: 2,
      dueDate: "2026-10-27",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "ORD-003",
      customer: "Sneha Joshi",
      cake: "Red Velvet",
      quantity: 1,
      dueDate: "2026-10-28",
      priority: "Low",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = `${order.id} ${order.customer} ${order.cake}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const progressOrders = orders.filter(
    (order) => order.status === "In Progress"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  return (
    <div className="assigned-page">
      <header className="assigned-header">
        <div>
          <p className="assigned-breadcrumb">BAKERY / STAFF WORKSPACE</p>
          <h1>Assigned Orders</h1>
          <p className="assigned-subtitle">
            Manage and track cake orders assigned to your team.
          </p>
        </div>

        <button
          className="assigned-back-button"
          onClick={onDashboard}
          type="button"
        >
          ← Back to Dashboard
        </button>
      </header>

      <section className="assigned-summary">
        <div className="assigned-summary-card">
          <span className="assigned-summary-icon">📋</span>
          <p>Total Orders</p>
          <h2>{totalOrders}</h2>
          <small>All assigned orders</small>
        </div>

        <div className="assigned-summary-card">
          <span className="assigned-summary-icon">⏳</span>
          <p>Pending</p>
          <h2>{pendingOrders}</h2>
          <small>Waiting to start</small>
        </div>

        <div className="assigned-summary-card">
          <span className="assigned-summary-icon">🎂</span>
          <p>In Progress</p>
          <h2>{progressOrders}</h2>
          <small>Currently in production</small>
        </div>

        <div className="assigned-summary-card">
          <span className="assigned-summary-icon">✓</span>
          <p>Completed</p>
          <h2>{completedOrders}</h2>
          <small>Finished orders</small>
        </div>
      </section>

      <section className="assigned-orders-panel">
        <div className="assigned-panel-heading">
          <div>
            <h2>Order List</h2>
            <p>View order details and update order status.</p>
          </div>
          <span className="assigned-total-label">
            {filteredOrders.length} Orders
          </span>
        </div>

        <div className="assigned-toolbar">
          <input
            type="text"
            placeholder="Search order ID, customer or cake..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
            aria-label="Filter orders by status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="assigned-table-container">
          <table className="assigned-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Cake Name</th>
                <th>Qty</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="assigned-order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.cake}</td>
                  <td>{order.quantity}</td>
                  <td>{order.dueDate}</td>
                  <td>
                    <span
                      className={`assigned-priority ${order.priority.toLowerCase()}`}
                    >
                      {order.priority}
                    </span>
                  </td>
                  <td>
                    <select
                      className={`assigned-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      value={order.status}
                      onChange={(event) =>
                        updateStatus(order.id, event.target.value)
                      }
                      aria-label={`Update status for ${order.id}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="assigned-empty">
                    No assigned orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="assigned-footer">
        <span>♡ Baked with love</span>
        <span>Bakery Management System · 2026</span>
      </footer>
    </div>
  );
}

export default AssignedOrders;