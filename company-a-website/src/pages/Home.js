import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Innovating Tomorrow, Today</h1>
        <p>
          Leading the technology and manufacturing revolution since 1995.
          Empowering progress through sustainable innovation and excellence.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Explore Our Solutions</button>
          <button className="btn btn-secondary">Contact Us</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>$3.4B</h3>
            <p>Revenue FY2023</p>
          </div>
          <div className="stat-card">
            <h3>15,000+</h3>
            <p>Global Employees</p>
          </div>
          <div className="stat-card">
            <h3>28</h3>
            <p>Years of Excellence</p>
          </div>
          <div className="stat-card">
            <h3>5</h3>
            <p>Global Offices</p>
          </div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="content-section">
        <h2>Our Business Units</h2>
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">📊</div>
            <h3>Advanced Electronics Division</h3>
            <p>
              High-performance integrated circuits, microprocessors, and semiconductor
              components for consumer electronics, automotive, and telecommunications.
            </p>
            <div className="revenue">45% Revenue Contribution</div>
          </div>

          <div className="card">
            <div className="card-icon">⚡</div>
            <h3>Sustainable Energy Solutions</h3>
            <p>
              Renewable energy technologies including solar panel manufacturing, energy
              storage systems, and smart grid solutions.
            </p>
            <div className="revenue">25% Revenue Contribution</div>
          </div>

          <div className="card">
            <div className="card-icon">🤖</div>
            <h3>AI & Software Services</h3>
            <p>
              Artificial intelligence solutions, machine learning platforms, and
              enterprise software for smart manufacturing.
            </p>
            <div className="revenue">20% Revenue Contribution</div>
          </div>

          <div className="card">
            <div className="card-icon">🔬</div>
            <h3>Research & Development</h3>
            <p>
              Breakthrough innovations in quantum computing, nanotechnology, and
              next-generation materials.
            </p>
            <div className="revenue">10% Revenue Contribution</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero">
        <h2>Ready to Partner with Us?</h2>
        <p>
          Join leading companies worldwide who trust Company A for innovative
          technology solutions
        </p>
        <button className="btn btn-primary">Get in Touch</button>
      </section>
    </div>
  );
}

export default Home;