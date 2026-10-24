
import "./AdminProfile.css";

function AdminProfile({ onDashboard }) {
  return (
    <div className="admin-profile-page">
      <header className="profile-header">
        <div>
          <p className="profile-breadcrumb">BAKERY / ADMIN / PROFILE</p>
          <h1>Admin Profile</h1>
          <p className="profile-subtitle">
            View your administrator account information.
          </p>
        </div>

        <button
          className="profile-back-btn"
          onClick={onDashboard}
        >
          ← Back to Dashboard
        </button>
      </header>

      <section className="profile-hero">
        <div className="profile-avatar">A</div>

        <div className="profile-hero-info">
          <span className="profile-role-badge">SUPER ADMIN</span>
          <h2>Administrator</h2>
          <p>admin@bakery.com</p>
          <span className="profile-status">
            <span className="profile-status-dot"></span>
            Active Account
          </span>
        </div>
      </section>

      <section className="profile-info-card">
        <div className="profile-card-heading">
          <div>
            <h3>Personal Information</h3>
            <p>Your administrator account details</p>
          </div>
          <span className="profile-heading-icon">♙</span>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail">
            <label>Full Name</label>
            <p>Administrator</p>
          </div>

          <div className="profile-detail">
            <label>Email Address</label>
            <p>admin@bakery.com</p>
          </div>

          <div className="profile-detail">
            <label>Role</label>
            <p>Super Admin</p>
          </div>

          <div className="profile-detail">
            <label>Department</label>
            <p>Bakery Management</p>
          </div>

          <div className="profile-detail">
            <label>Account Status</label>
            <p className="profile-active-text">Active</p>
          </div>

          <div className="profile-detail">
            <label>Access Level</label>
            <p>Full Administrative Access</p>
          </div>
        </div>
      </section>

      <section className="profile-info-card">
        <div className="profile-card-heading">
          <div>
            <h3>Account Security</h3>
            <p>Administrator access information</p>
          </div>
          <span className="profile-heading-icon">⚿</span>
        </div>

        <div className="profile-security-item">
          <div className="profile-security-icon">✉</div>
          <div className="profile-security-info">
            <h4>Email Address</h4>
            <p>admin@bakery.com</p>
          </div>
          <span className="profile-verified">Configured</span>
        </div>

        <div className="profile-security-item">
          <div className="profile-security-icon">♙</div>
          <div className="profile-security-info">
            <h4>Administrator Permissions</h4>
            <p>Manage authorized bakery administration features.</p>
          </div>
          <span className="profile-verified">Super Admin</span>
        </div>
      </section>

      <footer className="profile-footer">
        ♡ Baked with love
      </footer>
    </div>
  );
}

export default AdminProfile;
