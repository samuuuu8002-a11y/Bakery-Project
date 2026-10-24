import { useState } from "react";
import "./Register.css";

function Register({ onLogin, onHome }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (form.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(
        "Registration form validated successfully! Backend connection is still pending."
      );
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <button className="register-back" onClick={onHome}>
          ← Back to Home
        </button>

        <div className="register-logo">🎂</div>

        <h1>Bakery Shop</h1>
        <p className="register-tagline">
          ✦ FRESHLY BAKED HAPPINESS ✦
        </p>

        <h2>Create Your Account</h2>
        <p className="register-subtitle">
          Join us and make your special moments sweeter.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="register-error">{errors.name}</p>}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="register-error">{errors.email}</p>}

          <label htmlFor="phone">Mobile Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="register-error">{errors.phone}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="register-error">{errors.password}</p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="register-error">{errors.confirmPassword}</p>
          )}

          {success && <p className="register-success">{success}</p>}

          <button type="submit" className="register-submit">
            Create Account →
          </button>
        </form>

        <p className="register-login">
          Already have an account?{" "}
          <button type="button" onClick={onLogin}>
            Login
          </button>
        </p>

        <p className="register-footer">♡ Baked with love, made for you</p>
      </div>
    </div>
  );
}

export default Register;