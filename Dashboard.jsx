
import "./Dashboard.css";

function Dashboard({ onNavigate, onLogout, onHome }) {
  const sections = [
    {
      title: "Admin",
      subtitle: "Administration & Control",
      description:
        "Manage bakery operations, products, orders and business activities.",
      icon: "♙",
      page: "admin",
      number: "01",
    },
    {
      title: "Customers",
      subtitle: "Customer Portal",
      description:
        "View customer accounts, cake collections and customer orders.",
      icon: "♧",
      page: "customers",
      number: "02",
    },
    {
      title: "Staff",
      subtitle: "Staff Management",
      description:
        "Manage staff information, responsibilities and daily activities.",
      icon: "♜",
      page: "staff",
      number: "03",
    },
  ];

  return (
    <div className="bakery-dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">B</div>
          <div>
            <h2>Bakery.</h2>
            <p>MANAGEMENT SYSTEM</p>
          </div>
        </div>

        <div className="dashboard-menu-label">WORKSPACE</div>

        <button className="dashboard-menu-item active">
          <span>▦</span> Dashboard
        </button>

        <div className="dashboard-sidebar-note">
          <span>♡</span>
          <p>Freshly baked happiness, managed with care.</p>
        </div>

        <div className="dashboard-sidebar-bottom">
          <button onClick={onHome}>⌂ Back to Home</button>
          <button onClick={onLogout}>↪ Logout</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="dashboard-breadcrumb">
              WORKSPACE / DASHBOARD
            </span>
            <h3>Bakery Workspace</h3>
          </div>

          <div className="dashboard-user">
            <div className="dashboard-user-avatar">B</div>
            <div>
              <strong>Bakery Team</strong>
              <span>Management Portal</span>
            </div>
          </div>
        </header>

        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">
              ✦ YOUR BAKERY AT A GLANCE
            </span>
            <h1>Welcome to your<br />Bakery Dashboard.</h1>
            <p>
              Everything you need to manage your bakery,
              all in one place.
            </p>
          </div>

          <div className="dashboard-welcome-decoration">B.</div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h2>Choose Your Workspace</h2>
            </div>
            <p>03 MAIN SECTIONS</p>
          </div>

          <div className="dashboard-cards">
            {sections.map((section) => (
              <article className="dashboard-card" key={section.page}>
                <div className="dashboard-card-top">
                  <span className="dashboard-card-number">
                    {section.number}
                  </span>
                  <div className="dashboard-card-icon">
                    {section.icon}
                  </div>
                </div>

                <span className="dashboard-card-subtitle">
                  {section.subtitle}
                </span>

                <h3>{section.title}</h3>
                <p>{section.description}</p>

                <button
                  className="dashboard-card-button"
                  onClick={() => onNavigate(section.page)}
                >
                  Open Workspace <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>BAKERY. MANAGEMENT SYSTEM</span>
          <span>♡ Baked with love</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
