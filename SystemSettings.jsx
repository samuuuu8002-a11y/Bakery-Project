
import { useState } from "react";
import "./SystemSettings.css";

function SystemSettings({ onDashboard }) {
  const [settings, setSettings] = useState({
    bakeryName: "Bakery Shop",
    email: "admin@bakery.com",
    phone: "9876543210",
    address: "Pune, Maharashtra",
    advancePayment: 30,
    orderNotifications: true,
    emailNotifications: true,
    darkMode: false,
    passwordExpiry: true,
    sessionTimeout: "30",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    setMessage("Settings saved successfully!");
  };

  return (
    <div className="system-settings">
      <div className="settings-header">
        <div>
          <span className="settings-eyebrow">ADMIN WORKSPACE</span>
          <h1>System Settings</h1>
          <p>Manage your bakery information and system preferences.</p>
        </div>

        <button
          type="button"
          className="settings-back-btn"
          onClick={onDashboard}
        >
          ← Back to Overview
        </button>
      </div>

      <form onSubmit={handleSave}>
        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-icon">🏪</span>
            <div>
              <h2>Bakery Information</h2>
              <p>Update your bakery's basic information.</p>
            </div>
          </div>

          <div className="settings-grid">
            <label>
              Bakery Name
              <input
                name="bakeryName"
                value={settings.bakeryName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Admin Email
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Bakery Address
              <input
                name="address"
                value={settings.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-icon">🎂</span>
            <div>
              <h2>Order Settings</h2>
              <p>Configure advance payment and order alerts.</p>
            </div>
          </div>

          <div className="settings-grid">
            <label>
              Minimum Advance Payment (%)
              <input
                type="number"
                name="advancePayment"
                min="0"
                max="100"
                value={settings.advancePayment}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="settings-toggle">
            <span>
              <strong>Order Notifications</strong>
              <small>Receive alerts for new bakery orders.</small>
            </span>
            <input
              type="checkbox"
              name="orderNotifications"
              checked={settings.orderNotifications}
              onChange={handleChange}
            />
          </label>

          <label className="settings-toggle">
            <span>
              <strong>Email Notifications</strong>
              <small>Enable email notification preferences.</small>
            </span>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
          </label>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-icon">🎨</span>
            <div>
              <h2>Appearance Settings</h2>
              <p>Manage your dashboard display preferences.</p>
            </div>
          </div>

          <label className="settings-toggle">
            <span>
              <strong>Dark Mode Preference</strong>
              <small>Save your preference for a darker interface.</small>
            </span>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
          </label>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-icon">🔐</span>
            <div>
              <h2>Security Settings</h2>
              <p>Manage basic account security preferences.</p>
            </div>
          </div>

          <label className="settings-toggle">
            <span>
              <strong>Password Expiry Reminder</strong>
              <small>Enable the password expiry preference.</small>
            </span>
            <input
              type="checkbox"
              name="passwordExpiry"
              checked={settings.passwordExpiry}
              onChange={handleChange}
            />
          </label>

          <div className="settings-grid settings-session">
            <label>
              Session Timeout
              <select
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleChange}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </label>
          </div>
        </section>

        <div className="settings-footer">
          <div>
            {message && (
              <p className="settings-success" role="status">
                ✓ {message}
              </p>
            )}
          </div>

          <button type="submit" className="settings-save-btn">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default SystemSettings;
