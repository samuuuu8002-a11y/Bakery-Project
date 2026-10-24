
import { useState } from "react";

import Home from "./Home.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Admin from "./Admin.jsx";
import Customers from "./Customers.jsx";
import Staff from "./Staff.jsx";
import Orders from "./Orders.jsx";
import Payments from "./Payments.jsx";

function App() {
  const [page, setPage] = useState("home");
  const [loggedInUser, setLoggedInUser] = useState(null);

  function handleNavigate(nextPage) {
    setPage(nextPage);
  }

  function handleHome() {
    setPage("home");
  }

  function handleLogin(user) {
    const currentUser = user || {
      name: "Samiksha",
      email: "customer@bakery.com",
      role: "Staff",
    };

    setLoggedInUser(currentUser);

    const role = String(currentUser.role || "Staff").toLowerCase();

    if (role === "customer") {
      setPage("customer");
    } else if (role === "admin") {
      setPage("admin");
    } else if (role === "staff") {
      setPage("staff");
    } else {
      setPage("dashboard");
    }
  }

  function handleLogout() {
    setLoggedInUser(null);
    setPage("home");
  }

  return (
    <div className="app">
      {page === "home" && (
        <Home
          onLogin={() => handleNavigate("login")}
          onRegister={() => handleNavigate("register")}
        />
      )}

      {page === "register" && (
        <Register
          onLogin={() => handleNavigate("login")}
          onHome={handleHome}
        />
      )}

      {page === "login" && (
        <Login
          onRegister={() => handleNavigate("register")}
          onHome={handleHome}
          onLoginSuccess={handleLogin}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          user={loggedInUser}
          onNavigate={handleNavigate}
          onHome={handleHome}
          onLogin={() => handleNavigate("login")}
          onLogout={handleLogout}
          onAdmin={() => handleNavigate("admin")}
          onDashboard={() => handleNavigate("dashboard")}
          onCustomer={() => handleNavigate("customers")}
          onStaff={() => handleNavigate("staff")}
          onProducts={() => handleNavigate("products")}
          onOrders={() => handleNavigate("orders")}
          onNewOrder={() => handleNavigate("new-order")}
          onPayments={() => handleNavigate("payments")}
          onReports={() => handleNavigate("reports")}
          onSettings={() => handleNavigate("settings")}
        />
      )}

      {page === "admin" && (
        <Admin
          onDashboard={() => handleNavigate("dashboard")}
        />
      )}

      {page === "customer" && (
        <div className="app-placeholder">
          <h2>Customer Dashboard</h2>
          <p>Welcome, {loggedInUser?.name || "Customer"}!</p>
          <p>Email: {loggedInUser?.email || "Not provided"}</p>

          <button onClick={() => handleNavigate("products")}>
            🎂 Cake Collection
          </button>

          <button onClick={() => handleNavigate("customers")}>
            Customers
          </button>

          <button onClick={() => handleNavigate("orders")}>
            Orders
          </button>

          <button onClick={() => handleNavigate("payments")}>
            Payments
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {page === "customers" && (
        <Customers
          user={loggedInUser}
          onDashboard={() => handleNavigate("dashboard")}
        />
      )}

      {page === "staff" && (
        <Staff
          onDashboard={() => handleNavigate("dashboard")}
        />
      )}

      {page === "products" && (
        <CakeCollection
          user={loggedInUser}
          onDashboard={() => handleNavigate("dashboard")}
        />
      )}

      {page === "orders" && (
        <Orders
          onDashboard={() => handleNavigate("dashboard")}
        />
      )}

      {page === "payments" && (
        <Payments
          onDashboard={() => handleNavigate("dashboard")}
        />
      )}

      {["new-order", "reports", "settings"].includes(page) && (
        <div className="app-placeholder">
          <h2>
            {page === "new-order"
              ? "New Cake Order"
              : page.charAt(0).toUpperCase() + page.slice(1)}
          </h2>

          <p>This section is ready for further development.</p>

          <button onClick={() => handleNavigate("dashboard")}>
            ← Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
