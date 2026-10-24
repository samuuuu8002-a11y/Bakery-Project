import "./Home.css";

function Home({ onRegister, onLogin }) {
return (
<div className="bakery-home">
<nav className="bakery-navbar">
<a href="#home" className="bakery-brand">
<span className="brand-icon">B</span>
<span>
<strong>Bakery Shop</strong>
<small>FRESHLY BAKED HAPPINESS</small>
</span>
</a>

    <div className="bakery-nav-links">
      <a href="#home">Home</a>
      <a href="#features">Our Specialties</a>
      <a href="#about">About</a>
    </div>

    <div className="bakery-nav-actions">
      <button
        className="nav-login"
        onClick={onLogin}
      >
        Login
      </button>

      <button
        className="nav-register"
        onClick={onRegister}
      >
        Register <span>→</span>
      </button>
    </div>
  </nav>

  <main>
    <section className="bakery-hero" id="home">
      <div className="hero-content">
        <span className="hero-label">
          ✦ MADE FRESH, MADE WITH LOVE ✦
        </span>

        <h1>
          Fresh Cakes,
          <br />
          <span>Sweet Moments.</span>
        </h1>

        <p className="hero-description">
          Every celebration deserves something special.
          Discover beautiful cakes, delightful pastries
          and freshly baked happiness made just for you.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-button"
            onClick={onRegister}
          >
            Get Started <span>→</span>
          </button>

          <a className="secondary-button" href="#features">
            Explore Our Bakery
          </a>
        </div>

        <div className="hero-highlights">
          <div>
            <strong>100%</strong>
            <span>Fresh Ingredients</span>
          </div>

          <div className="highlight-divider"></div>

          <div>
            <strong>30+</strong>
            <span>Cake Designs</span>
          </div>

          <div className="highlight-divider"></div>

          <div>
            <strong>Made with ♥</strong>
            <span>Every Single Day</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
            alt="Beautiful chocolate celebration cake"
          />

          <div className="image-note">
            <span className="note-icon">♡</span>
            <div>
              <strong>Baked with Love</strong>
              <small>Special moments, sweeter</small>
            </div>
          </div>
        </div>

        <div className="floating-decoration decoration-one">✿</div>
        <div className="floating-decoration decoration-two">✦</div>
        <div className="floating-decoration decoration-three">♡</div>
      </div>
    </section>

    <section className="bakery-features" id="features">
      <div className="section-heading">
        <span>THE BAKERY EXPERIENCE</span>
        <h2>A Little Something Special</h2>
        <p>Made with care for all your beautiful occasions.</p>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon">🎂</div>
          <h3>Signature Cakes</h3>
          <p>
            Beautifully crafted cakes for birthdays,
            anniversaries and every celebration.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">🧁</div>
          <h3>Sweet Treats</h3>
          <p>
            Enjoy delicious cupcakes, pastries and
            freshly baked favourites.
          </p>
        </article>

        <article className="feature-card">
          <div className="feature-icon">♡</div>
          <h3>Custom Pre-Orders</h3>
          <p>
            Choose your cake design, add your details
            and plan your special day with ease.
          </p>
        </article>
      </div>
    </section>

    <section className="bakery-about" id="about">
      <span>OUR PROMISE</span>
      <h2>Every Cake Tells a Story.</h2>
      <p>
        From your first idea to the final creation,
        we make your special moments memorable.
      </p>
      <button className="primary-button" onClick={onRegister}>
        Start Your Order →
      </button>
    </section>
  </main>

  <footer className="bakery-footer">
    <strong>♡ Bakery Shop</strong>
    <span>Freshly baked happiness, made with love.</span>
    <small>© 2026 Bakery Shop. All rights reserved.</small>
  </footer>
</div>

);
}

export default Home;