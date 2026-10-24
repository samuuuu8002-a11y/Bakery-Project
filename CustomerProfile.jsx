
import { useState } from "react";
import "./CustomerProfile.css";

function CustomerProfile({ profile, onSave, onDashboard }) {
  const [formData, setFormData] = useState({
    name: profile?.name || "Samiksha",
    email: profile?.email || "samiksha@gmail.com",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (onSave) {
      onSave(formData);
    }

    setMessage("Profile updated successfully!");
  }

  return (
    <div className="customer-profile">
      <div className="profile-heading">
        <div>
          <span className="profile-eyebrow">CUSTOMER ACCOUNT</span>
          <h2>My Profile</h2>
          <p>Manage your personal information and contact details.</p>
        </div>

        <div className="profile-heading-icon">♙</div>
      </div>

      {message && (
        <div className="profile-success">
          <span>✓ {message}</span>
          <button type="button" onClick={() => setMessage("")}>
            ×
          </button>
        </div>
      )}

      <div className="profile-layout">
        <section className="profile-summary">
          <div className="profile-avatar">
            {formData.name.charAt(0).toUpperCase() || "S"}
          </div>

          <h3>{formData.name || "Customer Name"}</h3>
          <p>{formData.email}</p>

          <span className="profile-customer-badge">
            Customer Account
          </span>

          <div className="profile-summary-divider" />

          <div className="profile-summary-row">
            <span>Account Type</span>
            <strong>Customer</strong>
          </div>

          <div className="profile-summary-row">
            <span>Bakery</span>
            <strong>Bakery Shop</strong>
          </div>

          <div className="profile-summary-note">
            ♡ Baked with love
          </div>
        </section>

        <section className="profile-form-card">
          <div className="profile-card-heading">
            <div>
              <h3>Personal Information</h3>
              <p>Update your details using the form below.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-field">
              <label htmlFor="customer-name">Full Name</label>
              <input
                id="customer-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="customer-email">Email Address</label>
              <input
                id="customer-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="customer-phone">Phone Number</label>
              <input
                id="customer-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="customer-address">Delivery Address</label>
              <textarea
                id="customer-address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                rows={4}
              />
            </div>

            <div className="profile-form-actions">
              {onDashboard && (
                <button
                  type="button"
                  className="profile-secondary-btn"
                  onClick={onDashboard}
                >
                  ← Back to Overview
                </button>
              )}

              <button type="submit" className="profile-save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CustomerProfile;
