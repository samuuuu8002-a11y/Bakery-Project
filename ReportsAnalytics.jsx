
import { useState } from "react";
import "./ReportsAnalytics.css";

const monthlyData = [
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 35000 },
  { month: "Jul", revenue: 32000 },
  { month: "Aug", revenue: 42000 },
  { month: "Sep", revenue: 38500 },
  { month: "Oct", revenue: 48500 },
];

const initialTransactions = [
  {
    id: "PAY-001",
    customer: "Priya Sharma",
    order: "ORD-001",
    amount: 1500,
    method: "UPI",
    status: "Paid",
  },
  {
    id: "PAY-002",
    customer: "Rahul Patil",
    order: "ORD-002",
    amount: 800,
    method: "Cash",
    status: "Paid",
  },
  {
    id: "PAY-003",
    customer: "Sneha Joshi",
    order: "ORD-003",
    amount: 500,
    method: "Card",
    status: "Pending",
  },
  {
    id: "PAY-004",
    customer: "Amit Deshmukh",
    order: "ORD-004",
    amount: 2200,
    method: "UPI",
    status: "Paid",
  },
];

function ReportsAnalytics({ onDashboard }) {
  const [period, setPeriod] = useState("6 Months");

  const transactions = initialTransactions;

  const stats = [
    {
      title: "Total Revenue",
      value: "₹48,500",
      note: "Revenue overview",
      icon: "₹",
    },
    {
      title: "Total Orders",
      value: "24",
      note: "Orders received",
      icon: "▤",
    },
    {
      title: "Completed Orders",
      value: "10",
      note: "Successfully completed",
      icon: "✓",
    },
    {
      title: "Pending Orders",
      value: "08",
      note: "Awaiting completion",
      icon: "◷",
    },
  ];

  const visibleData =
    period === "3 Months" ? monthlyData.slice(-3) : monthlyData;

  const maxRevenue = Math.max(
    ...visibleData.map((item) => item.revenue)
  );

  const orderStatuses = [
    { label: "Pending", count: 8, color: "#d9a441" },
    { label: "Production", count: 4, color: "#a16b53" },
    { label: "Ready", count: 2, color: "#718f78" },
    { label: "Completed", count: 10, color: "#542d35" },
  ];

  const totalStatusOrders = orderStatuses.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="reports-page">
      <header className="reports-header">
        <div>
          <span className="reports-eyebrow">
            BAKERY ADMINISTRATION
          </span>
          <h1>Reports & Analytics</h1>
          <p>
            Track bakery performance, revenue and order activity.
          </p>
        </div>

        <button
          type="button"
          className="reports-back-btn"
          onClick={onDashboard}
        >
          ← Back to Dashboard
        </button>
      </header>

      <section className="reports-stats">
        {stats.map((stat) => (
          <article className="reports-stat-card" key={stat.title}>
            <div className="reports-stat-top">
              <span>{stat.title}</span>
              <div className="reports-stat-icon">{stat.icon}</div>
            </div>

            <h2>{stat.value}</h2>
            <p>{stat.note}</p>
          </article>
        ))}
      </section>

      <section className="reports-chart-grid">
        <article className="reports-panel reports-revenue-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Revenue Overview</h2>
              <p>Monthly bakery revenue</p>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Revenue chart period"
            >
              <option>6 Months</option>
              <option>3 Months</option>
            </select>
          </div>

          <div className="reports-chart">
            {visibleData.map((item) => (
              <div className="reports-bar-column" key={item.month}>
                <span className="reports-bar-value">
                  ₹{(item.revenue / 1000).toFixed(1)}k
                </span>

                <div className="reports-bar-track">
                  <div
                    className="reports-bar"
                    style={{
                      height: `${(item.revenue / maxRevenue) * 100}%`,
                    }}
                    title={`₹${item.revenue.toLocaleString("en-IN")}`}
                  />
                </div>

                <span className="reports-bar-month">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="reports-chart-footer">
            <span>Highest displayed revenue</span>
            <strong>
              ₹{maxRevenue.toLocaleString("en-IN")}
            </strong>
          </div>
        </article>

        <article className="reports-panel">
          <div className="reports-panel-header">
            <div>
              <h2>Order Status Report</h2>
              <p>Current order distribution</p>
            </div>
          </div>

          <div className="reports-status-list">
            {orderStatuses.map((item) => (
              <div className="reports-status-item" key={item.label}>
                <div className="reports-status-info">
                  <span
                    className="reports-status-dot"
                    style={{ background: item.color }}
                  />
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </div>

                <div className="reports-progress-track">
                  <div
                    className="reports-progress-fill"
                    style={{
                      width: `${(item.count / totalStatusOrders) * 100}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="reports-total-orders">
            <span>Total orders shown</span>
            <strong>{totalStatusOrders}</strong>
          </div>
        </article>
      </section>

      <section className="reports-panel reports-transactions-panel">
        <div className="reports-panel-header">
          <div>
            <h2>Recent Transactions</h2>
            <p>Overview of recent customer payments</p>
          </div>

          <span className="reports-demo-label">DEMO DATA</span>
        </div>

        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((payment) => (
                <tr key={payment.id}>
                  <td className="reports-payment-id">{payment.id}</td>
                  <td><strong>{payment.customer}</strong></td>
                  <td>{payment.order}</td>
                  <td>₹{payment.amount.toLocaleString("en-IN")}</td>
                  <td>{payment.method}</td>
                  <td>
                    <span
                      className={
                        payment.status === "Paid"
                          ? "reports-payment-status paid"
                          : "reports-payment-status pending"
                      }
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="reports-note">
        These are sample report figures for the UI demonstration. They
        are not yet connected to your database or live orders.
      </p>
    </div>
  );
}

export default ReportsAnalytics;
