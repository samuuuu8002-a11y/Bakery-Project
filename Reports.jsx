import { useState } from "react";
import "./Reports.css";

function Reports({ onDashboard }) {
  const [reportType, setReportType] = useState("Sales");
  const [period, setPeriod] = useState("This Month");

  const reports = {
    Sales: [
      ["Total Sales", "₹48,500", "↗ Revenue"],
      ["Orders Sold", "24", "📦 Orders"],
      ["Average Order", "₹2,021", "🧾 Average"],
      ["Growth", "+12%", "📈 Growth"]
    ],
    Orders: [
      ["Total Orders", "24", "📦 Orders"],
      ["Pending", "8", "⏳ Pending"],
      ["In Production", "4", "🎂 Production"],
      ["Completed", "10", "✅ Completed"]
    ],
    Payments: [
      ["Total Amount", "₹48,500", "💰 Total"],
      ["Collected", "₹35,000", "✅ Received"],
      ["Outstanding", "₹13,500", "⏳ Balance"],
      ["Transactions", "24", "💳 Payments"]
    ],
    Production: [
      ["Total Items", "24", "🎂 Items"],
      ["Pending", "8", "⏳ Waiting"],
      ["In Production", "6", "👨‍🍳 Working"],
      ["Ready", "10", "✅ Ready"]
    ]
  };

  const salesData = [
    { day: "Mon", amount: 4500 },
    { day: "Tue", amount: 7000 },
    { day: "Wed", amount: 5200 },
    { day: "Thu", amount: 8500 },
    { day: "Fri", amount: 6200 },
    { day: "Sat", amount: 9800 },
    { day: "Sun", amount: 7300 }
  ];

  function downloadReport() {
    const headers = ["Report Type", "Period", "Metric", "Value"];

    const rows = reports[reportType].map((item) => [
      reportType,
      period,
      item[0],
      item[1]
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) =>
          `"${String(cell).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${reportType.toLowerCase()}-report.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="reports-page">
      <aside className="reports-sidebar">
        <h2>🥐 Bakery</h2>
        <p>Management System</p>

        <button onClick={onDashboard}>🏠 Dashboard</button>
        <button onClick={onDashboard}>🎂 Products</button>
        <button onClick={onDashboard}>📦 Orders</button>
        <button onClick={onDashboard}>👥 Customers</button>
        <button onClick={onDashboard}>💳 Payments</button>
        <button className="report-active">📊 Reports</button>

        <button
          className="report-back"
          onClick={onDashboard}
        >
          ↩ Back to Dashboard
        </button>
      </aside>

      <main className="reports-main">
        <header className="reports-header">
          <div>
            <span className="report-eyebrow">
              BUSINESS ANALYTICS
            </span>
            <h1>Reports & Analytics</h1>
            <p>
              Track your bakery sales, orders and payments.
            </p>
          </div>

          <button
            className="report-dashboard-btn"
            onClick={onDashboard}
          >
            ← Dashboard
          </button>
        </header>

        <section className="report-filters">
          <div>
            <label>Report Category</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option>Sales</option>
              <option>Orders</option>
              <option>Payments</option>
              <option>Production</option>
            </select>
          </div>

          <div>
            <label>Report Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <button
            className="report-download"
            onClick={downloadReport}
          >
            ⬇ Download CSV
          </button>
        </section>

        <section className="report-stats">
          {reports[reportType].map((item) => (
            <div className="report-stat-card" key={item[0]}>
              <span>{item[2].split(" ")[0]}</span>
              <p>{item[0]}</p>
              <h2>{item[1]}</h2>
              <small>{item[2].substring(item[2].indexOf(" ") + 1)}</small>
            </div>
          ))}
        </section>

        <section className="report-chart-card">
          <div className="report-section-heading">
            <div>
              <h2>
                {reportType === "Sales"
                  ? "Weekly Sales Overview"
                  : `${reportType} Overview`}
              </h2>
              <p>Sample data for demonstration</p>
            </div>
            <span className="report-period-label">{period}</span>
          </div>

          {reportType === "Sales" ? (
            <div className="sales-chart">
              {salesData.map((item) => (
                <div className="sales-column" key={item.day}>
                  <span className="sales-tooltip">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                  <div
                    className="sales-bar"
                    style={{
                      height: `${(item.amount / 10000) * 180}px`
                    }}
                  />
                  <span className="sales-day">{item.day}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="report-summary">
              <span>📊</span>
              <h3>{reportType} Summary</h3>
              <p>
                Select a report category to review its summary
                and download the displayed metrics.
              </p>
            </div>
          )}
        </section>

        <section className="report-table-card">
          <h2>{reportType} Details</h2>

          <div className="report-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Report Type</th>
                  <th>Period</th>
                </tr>
              </thead>

              <tbody>
                {reports[reportType].map((item) => (
                  <tr key={item[0]}>
                    <td>{item[0]}</td>
                    <td><strong>{item[1]}</strong></td>
                    <td>{reportType}</td>
                    <td>{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="report-note">
            Note: All figures shown are sample values and are not
            connected to live database records yet.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Reports;