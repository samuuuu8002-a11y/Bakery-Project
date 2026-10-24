
import { useState } from "react";
import "./UserManagement.css";

function UserManagement({ onDashboard }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [users, setUsers] = useState([
    {
      id: "USR-001",
      name: "Samiksha",
      email: "samiksha@bakery.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: "USR-002",
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: "USR-003",
      name: "Rahul Patil",
      email: "rahul@example.com",
      role: "Staff",
      status: "Active",
    },
    {
      id: "USR-004",
      name: "Sneha Joshi",
      email: "sneha@example.com",
      role: "Customer",
      status: "Inactive",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Customer",
  });
  const [error, setError] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  function handleAddUser(e) {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      setError("Please enter a name and valid email address.");
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (emailExists) {
      setError("This email address already exists.");
      return;
    }

    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      status: "Active",
    };

    setUsers((previousUsers) => [...previousUsers, newUser]);
    setForm({ name: "", email: "", role: "Customer" });
    setShowForm(false);
  }

  function toggleStatus(id) {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  }

  return (
    <div className="user-management-page">
      <header className="um-header">
        <div>
          <p className="um-breadcrumb">
            BAKERY / ADMIN / USER MANAGEMENT
          </p>
          <h1>User Management</h1>
          <p className="um-subtitle">
            Manage administrator, staff and customer accounts.
          </p>
        </div>

        <button
          className="um-back-btn"
          onClick={onDashboard}
          type="button"
        >
          ← Back to Dashboard
        </button>
      </header>

      <section className="um-stats">
        <article className="um-stat-card">
          <span>♙</span>
          <p>Total Users</p>
          <h2>{users.length}</h2>
        </article>

        <article className="um-stat-card">
          <span>✓</span>
          <p>Active Users</p>
          <h2>
            {users.filter((user) => user.status === "Active").length}
          </h2>
        </article>

        <article className="um-stat-card">
          <span>♧</span>
          <p>Staff Members</p>
          <h2>
            {users.filter((user) => user.role === "Staff").length}
          </h2>
        </article>

        <article className="um-stat-card">
          <span>♙</span>
          <p>Customers</p>
          <h2>
            {users.filter((user) => user.role === "Customer").length}
          </h2>
        </article>
      </section>

      <section className="um-table-card">
        <div className="um-table-heading">
          <div>
            <h2>All Users</h2>
            <p>View and manage registered accounts.</p>
          </div>

          <button
            className="um-add-btn"
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setError("");
            }}
          >
            {showForm ? "Cancel" : "+ Add User"}
          </button>
        </div>

        {showForm && (
          <form className="um-add-form" onSubmit={handleAddUser}>
            <h3>Add New User</h3>

            <div className="um-form-grid">
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>

              <button className="um-save-btn" type="submit">
                Save User
              </button>
            </div>

            {error && <p className="um-error">{error}</p>}
          </form>
        )}

        <div className="um-filters">
          <input
            type="search"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        <div className="um-table-wrapper">
          <table className="um-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>
                    <div className="um-user-cell">
                      <div className="um-user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`um-role ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`um-status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="um-action-btn"
                      type="button"
                      disabled={user.role === "Admin" && user.name === "Samiksha"}
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="um-empty">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="um-table-footer">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </section>

      <footer className="um-footer">
        ♡ Baked with love
      </footer>
    </div>
  );
}

export default UserManagement;
