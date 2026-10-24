import { useState } from "react";
import "./Payments.css";

function Payments({ onDashboard }) {
  const [payments, setPayments] = useState([
    {
      id: "PAY-001",
      customer: "Priya Sharma",
      order: "ORD-001",
      total: 2500,
      paid: 1500,
      method: "UPI",
      status: "Partial",
    },
    {
      id: "PAY-002",
      customer: "Rahul Patil",
      order: "ORD-002",
      total: 1800,
      paid: 1800,
      method: "Cash",
      status: "Paid",
    },
    {
      id: "PAY-003",
      customer: "Sneha Joshi",
      order: "ORD-003",
      total: 3200,
      paid: 1000,
      method: "Card",
      status: "Partial",
    },
    {
      id: "PAY-004",
      customer: "Amit Deshmukh",
      order: "ORD-004",
      total: 4500,
      paid: 0,
      method: "UPI",
      status: "Pending",
    },
    {
      id: "PAY-005",
      customer: "Neha Patil",
      order: "ORD-005",
      total: 2200,
      paid: 2200,
      method: "Cash",
      status: "Paid",
    },
    {
      id: "PAY-006",
      customer: "Rohan Kulkarni",
      order: "ORD-006",
      total: 3500,
      paid: 2000,
      method: "Card",
      status: "Partial",
    },
    {
      id: "PAY-007",
      customer: "Pooja Shah",
      order: "ORD-007",
      total: 1500,
      paid: 0,
      method: "UPI",
      status: "Pending",
    },
    {
      id: "PAY-008",
      customer: "Karan More",
      order: "ORD-008",
      total: 2800,
      paid: 2800,
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: "PAY-009",
      customer: "Snehal Pawar",
      order: "ORD-009",
      total: 4000,
      paid: 2500,
      method: "UPI",
      status: "Partial",
    },
    {
      id: "PAY-010",
      customer: "Aditya Joshi",
      order: "ORD-010",
      total: 1200,
      paid: 1200,
      method: "Cash",
      status: "Paid",
    },
    {
      id: "PAY-011",
      customer: "Mrunal Jadhav",
      order: "ORD-011",
      total: 5000,
      paid: 0,
      method: "Card",
      status: "Pending",
    },
    {
      id: "PAY-012",
      customer: "Sahil Patil",
      order: "ORD-012",
      total: 2600,
      paid: 1600,
      method: "UPI",
      status: "Partial",
    },
  ]);

  const [form, setForm] = useState({
    customer: "",
    order: "",
    total: "",
    paid: "",
    method: "UPI",
  });

  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.total,
    0
  );

  const collected = payments.reduce(
    (sum, payment) => sum + payment.paid,
    0
  );

  const balance = totalAmount - collected;

  const filteredPayments = payments.filter((payment) =>
    `${payment.id} ${payment.customer} ${payment.order} ${payment.method} ${payment.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const total = Number(form.total);
    const paid = Number(form.paid);

    if (
      !form.customer.trim() ||
      !form.order.trim() ||
      !Number.isFinite(total) ||
      !Number.isFinite(paid) ||
      total <= 0 ||
      paid < 0 ||
      paid > total
    ) {
      alert(
        "Please enter valid details. Paid amount cannot exceed total amount."
      );
      return;
    }

    const newPayment = {
      id: `PAY-${String(Date.now()).slice(-6)}`,
      customer: form.customer.trim(),
      order: form.order.trim(),
      total,
      paid,
      method: form.method,
      status:
        paid === total
          ? "Paid"
          : paid > 0
          ? "Partial"
          : "Pending",
    };

    setPayments((previous) => [newPayment, ...previous]);

    setForm({
      customer: "",
      order: "",
      total: "",
      paid: "",
      method: "UPI",
    });

    alert("Payment record added successfully!");
  }

  function updatePaymentStatus(status) {
    if (!selectedPayment) return;

    const updatedPayment = {
      ...selectedPayment,
      status,
      paid:
        status === "Paid"
          ? selectedPayment.total
          : status === "Pending"
          ? 0
          : selectedPayment.paid >= selectedPayment.total
          ? Math.max(1, Math.floor(selectedPayment.total / 2))
          : selectedPayment.paid,
    };

    setPayments((previous) =>
      previous.map((payment) =>
        payment.id === selectedPayment.id
          ? updatedPayment
          : payment
      )
    );

    setSelectedPayment(updatedPayment);
  }

  return (
    <div className="payments-page">
      <aside className="payments-sidebar">
        <h2>🎂 Bakery</h2>
        <p>Management System</p>

        <button onClick={onDashboard}>🏠 Dashboard</button>
        <button onClick={onDashboard}>🎂 Products</button>
        <button onClick={onDashboard}>📦 Orders</button>
        <button onClick={onDashboard}>👥 Customers</button>

        <button className="payment-active">
          💳 Payments
        </button>

        <button onClick={onDashboard}>📊 Reports</button>

        <button
          className="payment-back"
          onClick={onDashboard}
        >
          ↩ Back to Dashboard
        </button>
      </aside>

      <main className="payments-main">
        <header className="payments-header">
          <div>
            <p className="payments-eyebrow">
              FINANCE MANAGEMENT
            </p>
            <h1>Payments</h1>
            <p>
              Track customer payments, advances and outstanding balances.
            </p>
          </div>

          <button
            className="payments-back-btn"
            onClick={onDashboard}
          >
            ← Back to Dashboard
          </button>
        </header>

        {/* PAYMENT SUMMARY */}
        <section className="payments-stats">
          <div className="payment-stat">
            <span>💰</span>
            <p>Total Order Value</p>
            <h2>₹{totalAmount.toLocaleString("en-IN")}</h2>
          </div>

          <div className="payment-stat">
            <span>✅</span>
            <p>Amount Collected</p>
            <h2>₹{collected.toLocaleString("en-IN")}</h2>
          </div>

          <div className="payment-stat">
            <span>⏳</span>
            <p>Outstanding Balance</p>
            <h2>₹{balance.toLocaleString("en-IN")}</h2>
          </div>
        </section>

        {/* ADD PAYMENT FORM */}
        <section className="payments-card">
          <h2>＋ Record a Payment</h2>

          <p className="payments-description">
            Enter the customer, order and payment details.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="payment-form-grid">
              <div className="payment-field">
                <label>Customer Name *</label>
                <input
                  name="customer"
                  value={form.customer}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="payment-field">
                <label>Order ID *</label>
                <input
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  placeholder="e.g. ORD-013"
                  required
                />
              </div>

              <div className="payment-field">
                <label>Total Amount (₹) *</label>
                <input
                  name="total"
                  type="number"
                  min="1"
                  value={form.total}
                  onChange={handleChange}
                  placeholder="Enter total amount"
                  required
                />
              </div>

              <div className="payment-field">
                <label>Advance / Amount Paid (₹) *</label>
                <input
                  name="paid"
                  type="number"
                  min="0"
                  value={form.paid}
                  onChange={handleChange}
                  placeholder="Enter amount received"
                  required
                />
              </div>

              <div className="payment-field">
                <label>Payment Method *</label>
                <select
                  name="method"
                  value={form.method}
                  onChange={handleChange}
                >
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div className="payment-field">
                <label>Remaining Balance</label>
                <input
                  value={
                    form.total !== "" && form.paid !== ""
                      ? `₹${Math.max(
                          0,
                          Number(form.total) - Number(form.paid)
                        ).toLocaleString("en-IN")}`
                      : "Enter amounts above"
                  }
                  readOnly
                />
              </div>
            </div>

            <button
              className="payment-submit"
              type="submit"
            >
              ✓ Save Payment
            </button>
          </form>
        </section>

        {/* PAYMENT TRANSACTIONS */}
        <section className="payments-card">
          <div className="payments-table-heading">
            <div>
              <h2>Payment Transactions</h2>
              <p className="payments-description">
                View payments, advances and remaining balances.
              </p>
            </div>

            <span className="payment-count">
              {filteredPayments.length} records
            </span>
          </div>

          <input
            className="payment-search"
            type="search"
            placeholder="🔍 Search customer, order, payment ID or status..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="payments-table-wrap">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Customer / Order</th>
                  <th>Total</th>
                  <th>Advance Paid</th>
                  <th>Balance</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>

                    <td>
                      <strong>{payment.customer}</strong>
                      <small>{payment.order}</small>
                    </td>

                    <td>
                      ₹{payment.total.toLocaleString("en-IN")}
                    </td>

                    <td>
                      ₹{payment.paid.toLocaleString("en-IN")}
                    </td>

                    <td>
                      ₹{(
                        payment.total - payment.paid
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>{payment.method}</td>

                    <td>
                      <span
                        className={`payment-status ${payment.status.toLowerCase()}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="payment-view-btn"
                        onClick={() =>
                          setSelectedPayment(payment)
                        }
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="payment-empty">
                      No payment records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="payments-note">
            Sample records are for demonstration. This page does not process
            real payments or store records permanently in the database.
          </p>
        </section>

        {/* PAYMENT DETAILS POPUP */}
        {selectedPayment && (
          <div
            className="payment-modal-overlay"
            onClick={() => setSelectedPayment(null)}
          >
            <div
              className="payment-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="payment-modal-close"
                onClick={() => setSelectedPayment(null)}
                aria-label="Close payment details"
              >
                ×
              </button>

              <p className="payments-eyebrow">
                PAYMENT DETAILS
              </p>

              <h2>{selectedPayment.id}</h2>

              <div className="payment-detail-list">
                <p>
                  <strong>Customer:</strong>{" "}
                  {selectedPayment.customer}
                </p>

                <p>
                  <strong>Order ID:</strong>{" "}
                  {selectedPayment.order}
                </p>

                <p>
                  <strong>Total Amount:</strong>{" "}
                  ₹{selectedPayment.total.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Advance Paid:</strong>{" "}
                  ₹{selectedPayment.paid.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Remaining Balance:</strong>{" "}
                  ₹{(
                    selectedPayment.total - selectedPayment.paid
                  ).toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Payment Method:</strong>{" "}
                  {selectedPayment.method}
                </p>

                <p>
                  <strong>Current Status:</strong>{" "}
                  <span
                    className={`payment-status ${selectedPayment.status.toLowerCase()}`}
                  >
                    {selectedPayment.status}
                  </span>
                </p>
              </div>

              <div className="payment-field payment-status-field">
                <label>Update Payment Status</label>

                <select
                  value={selectedPayment.status}
                  onChange={(event) =>
                    updatePaymentStatus(event.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <button
                type="button"
                className="payment-submit"
                onClick={() => setSelectedPayment(null)}
              >
                ✓ Save & Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Payments;