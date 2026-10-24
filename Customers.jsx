import { useState } from "react";
import "./Customers.css";
import CustomerProfile from "./CustomerProfile.jsx";
import CakeCollection from "./Cake.jsx";
import MyOrders from "./MyOrders.jsx";

function Customer({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("Overview");

  const [profile, setProfile] = useState({
    name: user?.name || "Samiksha",
    email: user?.email || "customer@bakery.com",
    phone: "",
    address: "",
  });

  const [customerOrders, setCustomerOrders] = useState([
    {
      id: "ORD-101",
      cake: "Chocolate Truffle",
      date: "24 Oct 2026",
      amount: 899,
      quantity: 1,
      status: "In Production",
    },
    {
      id: "ORD-102",
      cake: "Red Velvet Cake",
      date: "26 Oct 2026",
      amount: 1199,
      quantity: 1,
      status: "Pending",
    },
  ]);

  const menuItems = [
    { name: "Overview", icon: "▦" },
    { name: "My Profile", icon: "♙" },
    { name: "Cake Collection", icon: "🎂" },
    { name: "My Orders", icon: "▤" },
    { name: "Payments", icon: "₹" },
    { name: "Order History", icon: "◷" },
  ];

  const customerName = profile.name || "Samiksha";
  const customerEmail = profile.email || "customer@bakery.com";

  // Add a cake from Cake Collection to My Orders
  const handleCakeOrder = (cake) => {
    const newOrder = {
      id: cake.orderId || `ORD-${Date.now()}`,
      orderId: cake.orderId || `ORD-${Date.now()}`,
      cake: cake.name,
      name: cake.name,
      date: cake.orderDate || new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      orderDate: cake.orderDate || new Date().toLocaleDateString("en-GB"),
      amount: Number(cake.price) * (cake.quantity || 1),
      price: Number(cake.price) * (cake.quantity || 1),
      quantity: cake.quantity || 1,
      status: "Pending",
    };

    setCustomerOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    setActiveMenu("My Orders");
  };

  const totalOrders = customerOrders.length;

  const inProgressOrders = customerOrders.filter(
    (order) =>
      order.status === "In Production" ||
      order.status === "In Progress"
  ).length;

  const completedOrders = customerOrders.filter(
    (order) =>
      order.status === "Completed" ||
      order.status === "Delivered"
  ).length;

  const getStatusClass = (status) => {
    if (status === "Pending") return "pending";

    if (status === "Completed" || status === "Delivered") {
      return "completed";
    }

    return "progress";
  };

  return (
    <div className="customer-layout">
      {/* SIDEBAR */}
      <aside className="customer-sidebar">
        <div className="customer-brand">
          <span className="customer-brand-icon">🎂</span>

          <div>
            <h2>Bakery.</h2>
            <p>Customer Portal</p>
          </div>
        </div>

        <p className="customer-menu-label">MY WORKSPACE</p>

        <nav className="customer-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              className={
                activeMenu === item.name
                  ? "customer-nav-item active"
                  : "customer-nav-item"
              }
              onClick={() => setActiveMenu(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="customer-sidebar-bottom">
          <p>♡ Baked with love</p>

          <button
            type="button"
            className="customer-logout"
            onClick={onLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="customer-main">
        <header className="customer-topbar">
          <div>
            <p className="customer-breadcrumb">
              Customer Portal / {activeMenu}
            </p>

            <h1>{activeMenu}</h1>
          </div>

          <div className="customer-user">
            <div className="customer-avatar">
              {customerName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{customerName}</strong>
              <p>{customerEmail}</p>
            </div>
          </div>
        </header>

        {/* OVERVIEW */}
        {activeMenu === "Overview" && (
          <>
            <section className="customer-welcome">
              <div>
                <span className="customer-eyebrow">
                  WELCOME TO YOUR BAKERY
                </span>

                <h2>Hello, {customerName}! ♡</h2>

                <p>
                  Your favourite cakes and fresh bakery happiness,
                  all in one place.
                </p>

                <button
                  type="button"
                  className="customer-primary-btn"
                  onClick={() => setActiveMenu("Cake Collection")}
                >
                  Explore Cakes →
                </button>
              </div>

              <div className="customer-welcome-cake">🎂</div>
            </section>

            {/* CUSTOMER STATISTICS */}
            <section className="customer-stats">
              <div className="customer-stat-card">
                <span className="customer-stat-icon">▤</span>
                <p>Total Orders</p>
                <h2>{totalOrders}</h2>
                <small>Orders placed</small>
              </div>

              <div className="customer-stat-card">
                <span className="customer-stat-icon">◷</span>
                <p>In Progress</p>
                <h2>{String(inProgressOrders).padStart(2, "0")}</h2>
                <small>Being prepared</small>
              </div>

              <div className="customer-stat-card">
                <span className="customer-stat-icon">✓</span>
                <p>Completed</p>
                <h2>{String(completedOrders).padStart(2, "0")}</h2>
                <small>Successfully delivered</small>
              </div>

              <div className="customer-stat-card">
                <span className="customer-stat-icon">₹</span>
                <p>Pending Balance</p>
                <h2>₹500</h2>
                <small>Payment remaining</small>
              </div>
            </section>

            {/* RECENT ORDERS */}
            <section className="customer-content-card">
              <div className="customer-section-heading">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Track your latest cake orders</p>
                </div>

                <button
                  type="button"
                  className="customer-text-btn"
                  onClick={() => setActiveMenu("My Orders")}
                >
                  View All →
                </button>
              </div>

              <div className="customer-table-wrap">
                <table className="customer-table">
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>CAKE</th>
                      <th>ORDER DATE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {customerOrders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.cake}</td>
                        <td>{order.date}</td>
                        <td>₹{order.amount}</td>
                        <td>
                          <span
                            className={`customer-status ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="customer-bottom-card">
              <div>
                <h3>Have a celebration coming up? 🎉</h3>
                <p>
                  Find the perfect cake for your special occasion.
                </p>
              </div>

              <button
                type="button"
                className="customer-secondary-btn"
                onClick={() => setActiveMenu("Cake Collection")}
              >
                Browse Cake Collection
              </button>
            </section>
          </>
        )}

        {/* MY PROFILE */}
        {activeMenu === "My Profile" && (
          <section className="customer-content-card">
            <CustomerProfile
              profile={profile}
              onSave={(updatedProfile) => setProfile(updatedProfile)}
              onDashboard={() => setActiveMenu("Overview")}
            />
          </section>
        )}

        {/* CAKE COLLECTION */}
        {activeMenu === "Cake Collection" && (
          <CakeCollection onOrderNow={handleCakeOrder} />
        )}

        {/* MY ORDERS */}
        {activeMenu === "My Orders" && (
          <MyOrders
            orders={customerOrders}
            onDashboard={() => setActiveMenu("Overview")}
          />
        )}

        {/* PAYMENTS */}
        {activeMenu === "Payments" && (
          <section className="customer-content-card">
            <h2>Payments</h2>
            <p>Review your order amounts and payment details.</p>

            <div className="customer-table-wrap">
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CAKE</th>
                    <th>ORDER AMOUNT</th>
                    <th>PAYMENT STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {customerOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.cake}</td>
                      <td>₹{order.amount}</td>
                      <td>
                        {order.status === "Pending"
                          ? "Payment Pending"
                          : "Please confirm payment"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ORDER HISTORY */}
        {activeMenu === "Order History" && (
          <section className="customer-content-card">
            <h2>Order History</h2>
            <p>Your complete order record.</p>

            <div className="customer-table-wrap">
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>CAKE</th>
                    <th>DATE</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {customerOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.cake}</td>
                      <td>{order.date}</td>
                      <td>₹{order.amount}</td>
                      <td>
                        <span
                          className={`customer-status ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Customer;