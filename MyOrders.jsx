import { useState } from "react";

function MyOrders({ orders = [], onDashboard }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const sampleOrders = [
    {
      orderId: "ORD-101",
      name: "Chocolate Truffle",
      price: 899,
      quantity: 1,
      orderDate: "24/10/2026",
      status: "In Production"
    },
    {
      orderId: "ORD-102",
      name: "Red Velvet Cake",
      price: 1199,
      quantity: 1,
      orderDate: "24/10/2026",
      status: "Pending"
    },
    {
      orderId: "ORD-103",
      name: "Black Forest",
      price: 649,
      quantity: 1,
      orderDate: "23/10/2026",
      status: "Ready"
    }
  ];

  const orderList = orders.length > 0 ? orders : sampleOrders;

  const filteredOrders = orderList.filter((order) => {
    const cakeName = order.name || order.cake || "";
    const orderId = order.orderId || order.id || "";

    const matchesSearch =
      cakeName.toLowerCase().includes(search.toLowerCase()) ||
      orderId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    if (status === "Completed" || status === "Delivered") {
      return { background: "#e1f4e8", color: "#237447" };
    }

    if (status === "Ready") {
      return { background: "#e2edff", color: "#2856a5" };
    }

    if (status === "Pending") {
      return { background: "#fff0d5", color: "#936114" };
    }

    return { background: "#f3e4e8", color: "#813d4b" };
  };

  const totalAmount = orderList.reduce(
    (total, order) =>
      total + Number(order.price ?? order.amount ?? 0),
    0
  );

  const pendingCount = orderList.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedCount = orderList.filter(
    (order) =>
      order.status === "Completed" || order.status === "Delivered"
  ).length;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>CUSTOMER PORTAL / ORDERS</p>
          <h1 style={styles.title}>My Orders</h1>
          <p style={styles.subtitle}>
            Track your cake orders and check their current status.
          </p>
        </div>

        {onDashboard && (
          <button style={styles.backButton} onClick={onDashboard}>
            ← Back to Dashboard
          </button>
        )}
      </header>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Orders</span>
          <strong style={styles.statNumber}>{orderList.length}</strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>Pending Orders</span>
          <strong style={styles.statNumber}>{pendingCount}</strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>Completed Orders</span>
          <strong style={styles.statNumber}>{completedCount}</strong>
        </div>

        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Amount</span>
          <strong style={styles.statNumber}>₹{totalAmount}</strong>
        </div>
      </div>

      <section style={styles.panel}>
        <div style={styles.panelHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Order History</h2>
            <p style={styles.sectionSubtitle}>
              View and track your cake orders.
            </p>
          </div>
        </div>

        <div style={styles.filters}>
          <input
            style={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by cake name or order ID..."
          />

          <select
            style={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Production">In Production</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Cake Name</th>
                <th style={styles.th}>Order Date</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order.orderId || order.id || index}>
                  <td style={styles.td}>
                    <strong>
                      {order.orderId || order.id || "ORD-NEW"}
                    </strong>
                  </td>

                  <td style={styles.td}>
                    {order.name || order.cake || "Cake Order"}
                  </td>

                  <td style={styles.td}>
                    {order.orderDate || order.date || "—"}
                  </td>

                  <td style={styles.td}>{order.quantity || 1}</td>

                  <td style={styles.td}>
                    ₹{Number(order.price ?? order.amount ?? 0)}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        ...getStatusStyle(order.status)
                      }}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.empty}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px",
    background: "#faf6f0",
    color: "#432b27",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "25px"
  },
  eyebrow: {
    color: "#9a6b50",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px"
  },
  title: {
    color: "#542d35",
    fontSize: "32px",
    margin: "8px 0"
  },
  subtitle: { color: "#806b61", margin: 0 },
  backButton: {
    background: "#542d35",
    color: "white",
    border: 0,
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "25px"
  },
  statCard: {
    background: "#fff",
    padding: "22px",
    border: "1px solid #eee1d6",
    borderRadius: "12px"
  },
  statLabel: {
    display: "block",
    color: "#806b61",
    fontSize: "13px",
    marginBottom: "12px"
  },
  statNumber: {
    color: "#542d35",
    fontSize: "25px"
  },
  panel: {
    background: "#fff",
    border: "1px solid #eee1d6",
    borderRadius: "12px",
    padding: "22px"
  },
  panelHeader: { marginBottom: "18px" },
  sectionTitle: { color: "#542d35", margin: "0 0 7px" },
  sectionSubtitle: { color: "#806b61", fontSize: "13px", margin: 0 },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px"
  },
  search: {
    flex: "1",
    minWidth: "200px",
    padding: "12px",
    border: "1px solid #dfcec0",
    borderRadius: "8px"
  },
  select: {
    minWidth: "160px",
    padding: "12px",
    border: "1px solid #dfcec0",
    borderRadius: "8px",
    background: "#fff"
  },
  tableWrap: { width: "100%", overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "13px"
  },
  th: {
    background: "#f7eee5",
    color: "#542d35",
    padding: "14px 12px",
    whiteSpace: "nowrap"
  },
  td: {
    padding: "16px 12px",
    borderBottom: "1px solid #eee7df",
    whiteSpace: "nowrap"
  },
  status: {
    display: "inline-block",
    padding: "7px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold"
  },
  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#806b61"
  }
};

export default MyOrders;