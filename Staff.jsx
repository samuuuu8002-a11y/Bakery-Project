import { useState } from "react";
import "./Staff.css";
import AssignedOrders from "./AssignedOrders.jsx";
import Products from "./Products.jsx";
import ReadyOrders from "./ReadyOrders.jsx";
import Deliveries from "./Deliveries.jsx";

function Staff({ onDashboard, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [staffList, setStaffList] = useState([
    {
      id: "STF-001",
      name: "Samiksha Patil",
      email: "samiksha@bakery.com",
      phone: "9876543210",
      department: "Cake Production",
      joiningDate: "2026-09-01",
      status: "Active",
    },
    {
      id: "STF-002",
      name: "Priya Sharma",
      email: "priya@bakery.com",
      phone: "9876543211",
      department: "Order Management",
      joiningDate: "2026-09-10",
      status: "Active",
    },
    {
      id: "STF-003",
      name: "Rahul Patil",
      email: "rahul@bakery.com",
      phone: "9876543212",
      department: "Delivery",
      joiningDate: "2026-09-15",
      status: "On Leave",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Cake Production",
    joiningDate: "",
    status: "Active",
  });

  const menuItems = [
    { name: "Overview", icon: "▦" },
    { name: "My Profile", icon: "♙" },
    { name: "Staff Management", icon: "👥" },
    { name: "Assigned Orders", icon: "▤" },
    { name: "Cake Production", icon: "🎂" },
    { name: "Ready Orders", icon: "✓" },
    { name: "Deliveries", icon: "🚚" },
    { name: "Attendance", icon: "📅" },
    { name: "Notifications", icon: "🔔" },
    { name: "Change Password", icon: "🔒" },
  ];

  const totalStaff = staffList.length;

  const activeStaff = staffList.filter(
    (staff) => staff.status === "Active"
  ).length;

  const onLeaveStaff = staffList.filter(
    (staff) => staff.status === "On Leave"
  ).length;

  const filteredStaff = staffList.filter((staff) =>
    `${staff.id} ${staff.name} ${staff.email} ${staff.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleInput = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleAddStaff = (event) => {
    event.preventDefault();

    const nextId =
      Math.max(
        0,
        ...staffList.map(
          (staff) => Number(staff.id.split("-")[1]) || 0
        )
      ) + 1;

    const newStaff = {
      ...form,
      id: `STF-${String(nextId).padStart(3, "0")}`,
    };

    setStaffList((previousStaff) => [
      ...previousStaff,
      newStaff,
    ]);

    setForm({
      name: "",
      email: "",
      phone: "",
      department: "Cake Production",
      joiningDate: "",
      status: "Active",
    });

    setShowForm(false);
    setActiveMenu("Staff Management");
  };

  const deleteStaff = (id) => {
    if (window.confirm("Do you want to delete this staff member?")) {
      setStaffList((previousStaff) =>
        previousStaff.filter((staff) => staff.id !== id)
      );
    }
  };

  const renderStaffTable = () => (
    <div className="staff-table-wrapper">
      <table className="staff-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Staff Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStaff.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.department}</td>
              <td>{staff.joiningDate || "—"}</td>

              <td>
                <span
                  className={`staff-status ${
                    staff.status === "Active" ? "active" : "leave"
                  }`}
                >
                  {staff.status}
                </span>
              </td>

              <td>
                <button
                  className="staff-delete-btn"
                  onClick={() => deleteStaff(staff.id)}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredStaff.length === 0 && (
            <tr>
              <td colSpan="7" className="staff-empty">
                No staff members found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "Overview":
        return (
          <>
            <div className="staff-welcome">
              <div>
                <p className="staff-eyebrow">
                  BAKERY / STAFF WORKSPACE
                </p>
                <h1>Staff Overview</h1>
                <p>Manage your bakery team and daily activities.</p>
              </div>

              <button
                className="staff-primary-btn"
                onClick={() => {
                  setActiveMenu("Staff Management");
                  setShowForm(true);
                }}
                type="button"
              >
                + Add New Staff
              </button>
            </div>

            <div className="staff-stats">
              <div className="staff-stat-card">
                <span className="staff-stat-icon">👥</span>
                <p>Total Staff</p>
                <h2>{totalStaff}</h2>
                <small>Registered team members</small>
              </div>

              <div className="staff-stat-card">
                <span className="staff-stat-icon">✓</span>
                <p>Active Staff</p>
                <h2>{activeStaff}</h2>
                <small>Currently active</small>
              </div>

              <div className="staff-stat-card">
                <span className="staff-stat-icon">📅</span>
                <p>On Leave</p>
                <h2>{onLeaveStaff}</h2>
                <small>Currently on leave</small>
              </div>

              <div className="staff-stat-card">
                <span className="staff-stat-icon">🎂</span>
                <p>Departments</p>
                <h2>
                  {
                    new Set(
                      staffList.map((staff) => staff.department)
                    ).size
                  }
                </h2>
                <small>Team departments</small>
              </div>
            </div>

            <div className="staff-panel">
              <div className="staff-panel-heading">
                <div>
                  <h2>Staff Members</h2>
                  <p>Your bakery team at a glance</p>
                </div>

                <button
                  className="staff-outline-btn"
                  onClick={() => setActiveMenu("Staff Management")}
                  type="button"
                >
                  View All Staff
                </button>
              </div>

              {renderStaffTable()}
            </div>
          </>
        );

      case "My Profile":
        return (
          <div className="staff-panel staff-profile-panel">
            <p className="staff-eyebrow">PERSONAL INFORMATION</p>
            <h1>My Profile</h1>

            <div className="staff-profile-avatar">S</div>
            <h2>Samiksha Patil</h2>
            <p className="staff-profile-role">Bakery Staff</p>

            <div className="staff-profile-details">
              <p><strong>Staff ID:</strong> STF-001</p>
              <p><strong>Email:</strong> samiksha@bakery.com</p>
              <p><strong>Department:</strong> Cake Production</p>
              <p><strong>Role:</strong> Staff Member</p>
            </div>
          </div>
        );

      case "Staff Management":
        return (
          <div className="staff-panel">
            <div className="staff-panel-heading">
              <div>
                <p className="staff-eyebrow">TEAM DIRECTORY</p>
                <h1>Staff Management</h1>
                <p>Total registered staff: {totalStaff}</p>
              </div>

              <button
                className="staff-primary-btn"
                onClick={() => setShowForm(!showForm)}
                type="button"
              >
                {showForm ? "Cancel" : "+ Add New Staff"}
              </button>
            </div>

            {showForm && (
              <form className="staff-form" onSubmit={handleAddStaff}>
                <h2>Add New Staff Member</h2>

                <div className="staff-form-grid">
                  <label>
                    Full Name *
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                      placeholder="Enter full name"
                      required
                    />
                  </label>

                  <label>
                    Email Address *
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInput}
                      placeholder="Enter email"
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
                    Department *
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleInput}
                    >
                      <option>Cake Production</option>
                      <option>Order Management</option>
                      <option>Delivery</option>
                      <option>Billing & Payments</option>
                      <option>Inventory</option>
                    </select>
                  </label>

                  <label>
                    Joining Date *
                    <input
                      name="joiningDate"
                      type="date"
                      value={form.joiningDate}
                      onChange={handleInput}
                      required
                    />
                  </label>

                  <label>
                    Status
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleInput}
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                    </select>
                  </label>
                </div>

                <button className="staff-primary-btn" type="submit">
                  Save Staff Member
                </button>
              </form>
            )}

            <div className="staff-search-row">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, ID, email or department..."
              />

              <span>{filteredStaff.length} staff members</span>
            </div>

            {renderStaffTable()}
          </div>
        );

      case "Assigned Orders":
        return <AssignedOrders />;

      case "Cake Production":
        return <Products />;

      case "Ready Orders":
        return <ReadyOrders onDashboard={onDashboard} />;

      case "Deliveries":
        return <Deliveries onDashboard={onDashboard} />;

      case "Attendance":
        return (
          <div className="staff-panel">
            <p className="staff-eyebrow">STAFF WORKSPACE</p>
            <h1>Attendance</h1>
            <p>Track staff attendance and leave status.</p>
            {renderStaffTable()}
          </div>
        );

      case "Notifications":
        return (
          <div className="staff-panel">
            <p className="staff-eyebrow">UPDATES</p>
            <h1>Notifications</h1>

            <div className="staff-notification">
              <span>🔔</span>
              <div>
                <strong>Welcome to the Staff Workspace</strong>
                <p>Check this section for bakery team updates.</p>
              </div>
            </div>
          </div>
        );

      case "Change Password":
        return (
          <div className="staff-panel staff-password-panel">
            <p className="staff-eyebrow">ACCOUNT SECURITY</p>
            <h1>Change Password</h1>

            <form
              className="staff-password-form"
              onSubmit={(event) => {
                event.preventDefault();
                window.alert(
                  "Password change UI is ready. Connect it to your backend to update the real password."
                );
              }}
            >
              <label>
                Current Password
                <input type="password" required />
              </label>

              <label>
                New Password
                <input type="password" minLength="6" required />
              </label>

              <label>
                Confirm New Password
                <input type="password" minLength="6" required />
              </label>

              <button className="staff-primary-btn" type="submit">
                Update Password
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="staff-layout">
      <aside className="staff-sidebar">
        <div className="staff-brand">
          <div className="staff-brand-logo">B</div>
          <div>
            <h2>Bakery.</h2>
            <p>Management System</p>
          </div>
        </div>

        <p className="staff-menu-label">STAFF WORKSPACE</p>

        <nav className="staff-navigation">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`staff-menu-btn ${
                activeMenu === item.name ? "selected" : ""
              }`}
              onClick={() => {
                setActiveMenu(item.name);
                setShowForm(false);
              }}
              type="button"
            >
              <span className="staff-menu-icon">{item.icon}</span>
              <span>{item.name}</span>

              {activeMenu === item.name && (
                <span className="staff-menu-arrow">›</span>
              )}
            </button>
          ))}
        </nav>

        <div className="staff-sidebar-bottom">
          <p>♡ Baked with love</p>

          <button
            className="staff-logout-btn"
            onClick={onLogout}
            type="button"
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="staff-main">
        <header className="staff-topbar">
          <div>
            <p>BAKERY / STAFF</p>
            <h2>{activeMenu}</h2>
          </div>

          <div className="staff-topbar-user">
            <div className="staff-small-avatar">S</div>
            <div>
              <strong>Samiksha</strong>
              <span>Staff Member</span>
            </div>
          </div>
        </header>

        <section className="staff-content">
          {renderContent()}
        </section>

        <footer className="staff-footer">
          <span>© 2026 Bakery Management System</span>

          <button
            className="staff-back-btn"
            onClick={onDashboard}
            type="button"
          >
            ← Back to Dashboard
          </button>
        </footer>
      </main>
    </div>
  );
}

export default Staff;