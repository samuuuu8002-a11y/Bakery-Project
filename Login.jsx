
import { useState } from "react";
import "./Login.css";

function Login({ onRegister, onHome, onLoginSuccess }) {
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Valid email required.");
      return;
    }

    if (!/^\d{8}$/.test(password)) {
      setError("Password must be exactly 8 digits.");
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess({
        name:
          role === "Admin"
            ? "Admin"
            : role === "Customer"
            ? "Samiksha"
            : "Staff",
        email: email,
        role: role,
      });
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <button
          type="button"
          className="login-home"
          onClick={onHome}
        >
          ← Home
        </button>

        <div className="login-logo">🎂</div>

        <h1>Bakery Login</h1>
        <p className="login-subtitle">
          Management System
        </p>

        <form onSubmit={handleSubmit}>
          <label>Select Login</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
          </select>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter 8-digit password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value.replace(/\D/g, "").slice(0, 8)
              )
            }
            inputMode="numeric"
            maxLength={8}
            required
          />

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          ♡ Baked with love
        </p>

        {onRegister && (
          <p className="login-register">
            Don't have an account?{" "}
            <button type="button" onClick={onRegister}>
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
