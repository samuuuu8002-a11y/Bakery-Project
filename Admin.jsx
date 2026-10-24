import { useState } from "react";
import "./Admin.css";
import AdminProfile from "./AdminProfile.jsx";
import UserManagement from "./UserManagement.jsx";
import InventoryManagement from "./InventoryManagement.jsx";
import ReportsAnalytics from "./ReportsAnalytics.jsx";
import SystemSettings from "./SystemSettings.jsx";
import ActivityLogs from "./ActivityLogs.jsx";

function Admin({ onLogout, onDashboard }) {
  const [activeMenu, setActiveMenu] = useState("Overview");

  const menuItems = [
    "Overview",
    "Admin Profile",
    "User Management",
    "Inventory Management",
    "Reports & Analytics",
    "System Settings",
    "Activity Logs",
  ];

  const stats = [
    { title: "Total Revenue", value: "₹48,500", icon: "₹" },
    { title: "Total Orders", value: "24", icon: "▤" },
    { title: "Pending Orders", value: "08", icon: "◷" },
    { title: "Total Products", value: "24", icon: "🎂" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>🎂 Bakery.</h2>
          <p>ADMINISTRATION PANEL</p>
        </div>

        <div className="admin-menu-heading">
          ADMIN WORKSPACE
        </div>

        <nav className="admin-menu">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              className={
                activeMenu === item
                  ? "admin-menu-item active"
                  : "admin-menu-item"
              }
              onClick={() => setActiveMenu(item)}
            >
              <span>{getMenuIcon(item)}</span>
              {item}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <p>♡ Baked with love</p>

          <button type="button" onClick={onDashboard}>
            ← Back to Dashboard
          </button>

          <button type="button" onClick={onLogout}>
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">
              BAKERY / ADMIN
            </p>
            <h2>{activeMenu}</h2>
          </div>

          <div className="admin-user">
            <div className="admin-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <p>admin@bakery.com</p>
            </div>
          </div>
        </header>

        {/* Admin Profile */}
        {activeMenu === "Admin Profile" ? (
          <AdminProfile
            onDashboard={() => setActiveMenu("Overview")}
          />
        ) : activeMenu === "User Management" ? (
          /* User Management */
          <UserManagement
            onDashboard={() => setActiveMenu("Overview")}
          />
        ) : activeMenu === "Inventory Management" ? (
          /* Inventory Management */
          <InventoryManagement
            onDashboard={() => setActiveMenu("Overview")}
          />
        ) : activeMenu === "Reports & Analytics" ? (
          /* Reports & Analytics */
          <ReportsAnalytics
            onDashboard={() => setActiveMenu("Overview")}
          />
        ) : activeMenu === "System Settings" ? (
          /* System Settings */
          <SystemSettings
            onDashboard={() => setActiveMenu("Overview")}
          />
        ) : activeMenu === "Activity Logs" ? (
          /* Activity Logs */
          <ActivityLogs
            onDashboard={() => setActiveMenu("Overview")}
          />
        ) : activeMenu === "Overview" ? (
          <>
            {/* Welcome Section */}
            <section className="admin-welcome">
              <div>
                <span>ADMIN WORKSPACE</span>

                <h1>Welcome back, Admin!</h1>

                <p>
                  Manage and monitor your bakery business
                  from one place.
                </p>
              </div>

              <div className="admin-welcome-icon">
                🎂
              </div>
            </section>

            {/* Statistics */}
            <section className="admin-stats">
              {stats.map((stat) => (
                <article
                  className="admin-stat-card"
                  key={stat.title}
                >
                  <div className="admin-stat-icon">
                    {stat.icon}
                  </div>

                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                </article>
              ))}
            </section>

            {/* Administration Overview */}
            <section className="admin-overview-card">
              <div className="admin-section-title">
                <div>
                  <h3>Administration Overview</h3>
                  <p>
                    Manage your administrative activities.
                  </p>
                </div>
              </div>

              <div className="admin-management-list">
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu("User Management")
                  }
                >
                  <span>♙</span>
                  <p>User Management</p>
                  <small>
                    Manage system access and roles
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu("Inventory Management")
                  }
                >
                  <span>🎂</span>
                  <p>Inventory Management</p>
                  <small>
                    Monitor bakery stock
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu("Reports & Analytics")
                  }
                >
                  <span>▥</span>
                  <p>Reports & Analytics</p>
                  <small>
                    Review business performance
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu("System Settings")
                  }
                >
                  <span>⚙</span>
                  <p>System Settings</p>
                  <small>
                    Configure bakery preferences
                  </small>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu("Activity Logs")
                  }
                >
                  <span>◷</span>
                  <p>Activity Logs</p>
                  <small>
                    Review administrative activities
                  </small>
                </button>
              </div>
            </section>
          </>
        ) : (
          /* Other Admin Sections */
          <section className="admin-overview-card admin-placeholder">
            <div className="admin-stat-icon">
              {getMenuIcon(activeMenu)}
            </div>

            <h3>{activeMenu}</h3>

            <p>
              {activeMenu} section is ready for its
              detailed functionality.
            </p>

            <button
              type="button"
              onClick={() => setActiveMenu("Overview")}
            >
              ← Back to Overview
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

function getMenuIcon(item) {
  const icons = {
    Overview: "▦",
    "Admin Profile": "♙",
    "User Management": "♧",
    "Inventory Management": "🎂",
    "Reports & Analytics": "▥",
    "System Settings": "⚙",
    "Activity Logs": "◷",
  };

  return icons[item] || "•";
}

export default Admin;