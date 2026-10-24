
import { useState } from "react";
import "./ActivityLogs.css";

const initialLogs = [
  {
    id: "LOG-001",
    user: "Samiksha",
    role: "Admin",
    action: "Updated system settings",
    category: "Settings",
    date: "2026-10-24",
    time: "10:30 AM",
    status: "Success",
  },
  {
    id: "LOG-002",
    user: "Samiksha",
    role: "Admin",
    action: "Added a new bakery product",
    category: "Products",
    date: "2026-10-24",
    time: "10:15 AM",
    status: "Success",
  },
  {
    id: "LOG-003",
    user: "Priya Sharma",
    role: "Staff",
    action: "Updated order ORD-001",
    category: "Orders",
    date: "2026-10-24",
    time: "09:45 AM",
    status: "Success",
  },
  {
    id: "LOG-004",
    user: "Rahul Patil",
    role: "Staff",
    action: "Updated customer details",
    category: "Customers",
    date: "2026-10-23",
    time: "04:20 PM",
    status: "Success",
  },
  {
    id: "LOG-005",
    user: "Samiksha",
    role: "Admin",
    action: "Reviewed monthly reports",
    category: "Reports",
    date: "2026-10-23",
    time: "02:10 PM",
    status: "Success",
  },
  {
    id: "LOG-006",
    user: "Sneha Joshi",
    role: "Staff",
    action: "Attempted to update an order",
    category: "Orders",
    date: "2026-10-22",
    time: "11:05 AM",
    status: "Failed",
  },
];

function ActivityLogs({ onDashboard }) {
  const [logs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredLogs = logs.filter((log) => {
    const searchText =
      `${log.id} ${log.user} ${log.action} ${log.role}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesCategory =
      category === "All" || log.category === category;

    const matchesStatus =
      status === "All" || log.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const successfulLogs = logs.filter(
    (log) => log.status === "Success"
  ).length;

  const failedLogs = logs.filter(
    (log) => log.status === "Failed"
  ).length;

  return (
    <div className="activity-page">
      {/* Header */}
      <div className="activity-header">
        <div>
          <span className="activity-eyebrow">
            ADMIN WORKSPACE
          </span>

          <h1>Activity Logs</h1>

          <p>
            Monitor administrative actions and system activity.
          </p>
        </div>

        <button
          type="button"
          className="activity-back-btn"
          onClick={onDashboard}
        >
          ← Back to Overview
        </button>
      </div>

      {/* Statistics */}
      <div className="activity-stats">
        <div className="activity-stat-card">
          <span className="activity-stat-icon">▤</span>
          <div>
            <p>Total Activities</p>
            <h2>{logs.length}</h2>
          </div>
        </div>

        <div className="activity-stat-card">
          <span className="activity-stat-icon success-icon">
            ✓
          </span>
          <div>
            <p>Successful Actions</p>
            <h2>{successfulLogs}</h2>
          </div>
        </div>

        <div className="activity-stat-card">
          <span className="activity-stat-icon failed-icon">
            !
          </span>
          <div>
            <p>Failed Actions</p>
            <h2>{failedLogs}</h2>
          </div>
        </div>

        <div className="activity-stat-card">
          <span className="activity-stat-icon user-icon">
            ♙
          </span>
          <div>
            <p>Activity Categories</p>
            <h2>5</h2>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <section className="activity-table-card">
        <div className="activity-table-heading">
          <div>
            <h2>Recent Activities</h2>
            <p>Review recorded system events.</p>
          </div>

          <span className="activity-record-count">
            {filteredLogs.length} Records
          </span>
        </div>

        {/* Search and Filters */}
        <div className="activity-filters">
          <input
            type="text"
            placeholder="Search user, action or log ID..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="All">All Categories</option>
            <option value="Settings">Settings</option>
            <option value="Products">Products</option>
            <option value="Orders">Orders</option>
            <option value="Customers">Customers</option>
            <option value="Reports">Reports</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Responsive Table */}
        <div className="activity-table-wrapper">
          <table className="activity-table">
            <thead>
              <tr>
                <th>LOG ID</th>
                <th>USER</th>
                <th>ACTION</th>
                <th>CATEGORY</th>
                <th>DATE & TIME</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="activity-log-id">
                      {log.id}
                    </td>

                    <td>
                      <div className="activity-user-cell">
                        <span className="activity-user-avatar">
                          {log.user.charAt(0)}
                        </span>

                        <div>
                          <strong>{log.user}</strong>
                          <small>{log.role}</small>
                        </div>
                      </div>
                    </td>

                    <td>{log.action}</td>

                    <td>
                      <span className="activity-category">
                        {log.category}
                      </span>
                    </td>

                    <td>
                      <div className="activity-date-cell">
                        <strong>{log.date}</strong>
                        <small>{log.time}</small>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`activity-status ${
                          log.status === "Success"
                            ? "status-success"
                            : "status-failed"
                        }`}
                      >
                        {log.status === "Success" ? "✓" : "!"}
                        {" "}{log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="activity-empty"
                  >
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="activity-note">
        Showing sample activity data for demonstration.
        Real activity tracking requires backend integration.
      </p>
    </div>
  );
}

export default ActivityLogs;
