import { useState } from "react";
import "./Deliveries.css";

const initialDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customer: "Priya Sharma",
    phone: "9876543210",
    product: "Chocolate Truffle Cake",
    address: "Kothrud, Pune",
    date: "2026-10-25",
    payment: "Paid",
    status: "Pending",
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customer: "Rahul Patil",
    phone: "9876543211",
    product: "Black Forest Cake",
    address: "Karve Nagar, Pune",
    date: "2026-10-25",
    payment: "Partial",
    status: "Out for Delivery",
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customer: "Sneha Joshi",
    phone: "9876543212",
    product: "Red Velvet Cake",
    address: "Baner, Pune",
    date: "2026-10-26",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "DEL-004",
    orderId: "ORD-004",
    customer: "Amit Deshmukh",
    phone: "9876543213",
    product: "White Forest Cake",
    address: "Wakad, Pune",
    date: "2026-10-26",
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "DEL-005",
    orderId: "ORD-005",
    customer: "Neha Kulkarni",
    phone: "9876543214",
    product: "Vanilla Cake",
    address: "Pimple Saudagar, Pune",
    date: "2026-10-27",
    payment: "Paid",
    status: "Delivered",
  },
];

function Deliveries({ onDashboard }) {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    orderId: "",
    customer: "",
    phone: "",
    product: "",
    address: "",
    date: "",
    payment: "Pending",
    status: "Pending",
  });

  const pendingCount = deliveries.filter(
    (item) => item.status === "Pending"
  ).length;

  const outCount = deliveries.filter(
    (item) => item.status === "Out for Delivery"
  ).length;

  const deliveredCount = deliveries.filter(
    (item) => item.status === "Delivered"
  ).length;

  const filteredDeliveries = deliveries.filter((item) => {
    const matchesSearch =
      `${item.id} ${item.orderId} ${item.customer} ${item.product} ${item.address}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || item.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddDelivery = (event) => {
    event.preventDefault();

    const nextNumber =
      Math.max(
        0,
        ...deliveries.map(
          (item) => Number(item.id.split("-")[1]) || 0
        )
      ) + 1;

    const newDelivery = {
      ...form,
      id: `DEL-${String(nextNumber).padStart(3, "0")}`,
    };

    setDeliveries((previous) => [...previous, newDelivery]);

    setForm({
      orderId: "",
      customer: "",
      phone: "",
      product: "",
      address: "",
      date: "",
      payment: "Pending",
      status: "Pending",
    });

    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setDeliveries((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <div className="delivery-page">
      <header className="delivery-header">
        <div>
          <p className="delivery-eyebrow">BAKERY / LOGISTICS</p>
          <h1>Delivery Management</h1>
          <p>Track customer orders from dispatch to delivery.</p>
        </div>

        <div className="delivery-header-actions">
          <button
            className="delivery-back-btn"
            type="button"
            onClick={onDashboard}
          >
            ← Dashboard
          </button>

          <button
            className="delivery-primary-btn"
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add Delivery"}
          </button>
        </div>
      </header>

      <div className="delivery-stats">
        <div className="delivery-stat-card">
          <span>📦</span>
          <p>Total Deliveries</p>
          <h2>{deliveries.length}</h2>
        </div>

        <div className="delivery-stat-card">
          <span>⏳</span>
          <p>Pending</p>
          <h2>{pendingCount}</h2>
        </div>

        <div className="delivery-stat-card">
          <span>🚚</span>
          <p>Out for Delivery</p>
          <h2>{outCount}</h2>
        </div>

        <div className="delivery-stat-card">
          <span>✓</span>
          <p>Delivered</p>
          <h2>{deliveredCount}</h2>
        </div>
      </div>

      {showForm && (
        <section className="delivery-panel">
          <h2>Add New Delivery</h2>
          <p>Enter the customer and delivery information.</p>

          <form
            className="delivery-form"
            onSubmit={handleAddDelivery}
          >
            <label>
              Order ID *
              <input
                name="orderId"
                value={form.orderId}
                onChange={handleInput}
                placeholder="ORD-006"
                required
              />
            </label>

            <label>
              Customer Name *
              <input
                name="customer"
                value={form.customer}
                onChange={handleInput}
                placeholder="Customer name"
                required
              />
            </label>

            <label>
              Phone Number *
              <input
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                maxLength="10"
                value={form.phone}
                onChange={handleInput}
                placeholder="10-digit mobile number"
                required
              />
            </label>

            <label>
              Product *
              <input
                name="product"
                value={form.product}
                onChange={handleInput}
                placeholder="Cake name"
                required
              />
            </label>

            <label className="delivery-full-width">
              Delivery Address *
              <textarea
                name="address"
                value={form.address}
                onChange={handleInput}
                placeholder="Full delivery address"
                required
              />
            </label>

            <label>
              Delivery Date *
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleInput}
                required
              />
            </label>

            <label>
              Payment Status
              <select
                name="payment"
                value={form.payment}
                onChange={handleInput}
              >
                <option>Pending</option>
                <option>Partial</option>
                <option>Paid</option>
              </select>
            </label>

            <label>
              Delivery Status
              <select
                name="status"
                value={form.status}
                onChange={handleInput}
              >
                <option>Pending</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </label>

            <div className="delivery-full-width">
              <button
                className="delivery-primary-btn"
                type="submit"
              >
                Save Delivery
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="delivery-panel">
        <div className="delivery-panel-heading">
          <div>
            <h2>Delivery Orders</h2>
            <p>Manage scheduled and completed deliveries.</p>
          </div>

          <input
            className="delivery-search"
            type="search"
            placeholder="Search customer, order or product..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="delivery-filters">
          {[
            "All",
            "Pending",
            "Out for Delivery",
            "Delivered",
          ].map((filter) => (
            <button
              type="button"
              key={filter}
              className={`delivery-filter ${
                activeFilter === filter ? "selected" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="delivery-table-wrapper">
          <table className="delivery-table">
            <thead>
              <tr>
                <th>Delivery ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Address</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredDeliveries.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.id}</strong>
                    <small className="delivery-order-id">
                      {item.orderId}
                    </small>
                  </td>

                  <td>
                    <strong>{item.customer}</strong>
                    <small className="delivery-order-id">
                      {item.phone}
                    </small>
                  </td>

                  <td>{item.product}</td>
                  <td>{item.address}</td>
                  <td>{item.date}</td>

                  <td>
                    <span
                      className={`delivery-payment payment-${item.payment.toLowerCase()}`}
                    >
                      {item.payment}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`delivery-status status-${item.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.status !== "Delivered" ? (
                      <select
                        className="delivery-status-select"
                        value={item.status}
                        onChange={(event) =>
                          updateStatus(item.id, event.target.value)
                        }
                        aria-label={`Update delivery status for ${item.id}`}
                      >
                        <option>Pending</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                      </select>
                    ) : (
                      <span className="delivery-done">✓ Completed</span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredDeliveries.length === 0 && (
                <tr>
                  <td colSpan="8" className="delivery-empty">
                    No delivery records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="delivery-footer-note">
        ♡ Delivering freshly baked happiness.
      </p>
    </div>
  );
}

export default Deliveries;