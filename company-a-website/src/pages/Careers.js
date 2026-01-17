import React from 'react';

function Careers() {
  const benefits = [
    {
      icon: '💼',
      title: 'Why Work at Company A',
      description: 'Join 15,000+ innovators working on cutting-edge technology. Competitive compensation, comprehensive benefits, and continuous learning opportunities.'
    },
    {
      icon: '🎓',
      title: 'Learning & Development',
      description: '$20 million invested annually in employee development. Technical training, leadership courses, tuition reimbursement, and university partnerships.'
    },
    {
      icon: '❤️',
      title: 'Diversity & Inclusion',
      description: '45% of workforce are women, 60+ nationalities represented. Employee resource groups support LGBTQ+, women in tech, and cultural communities.'
    },
    {
      icon: '🎁',
      title: 'Benefits & Perks',
      description: 'Health insurance, flexible work, stock options, 25 days leave, parental leave, wellness programs, fitness centers, mental health support.'
    }
  ];

  const openings = [
    { title: 'Senior Electronics Engineer', location: 'Penang, Malaysia', department: 'Engineering' },
    { title: 'AI/ML Research Scientist', location: 'San Jose, USA', department: 'R&D' },
    { title: 'Sustainability Manager', location: 'Kuala Lumpur, Malaysia', department: 'Operations' },
    { title: 'Software Developer (Full Stack)', location: 'Singapore', department: 'Technology' },
    { title: 'Manufacturing Specialist', location: 'Penang, Malaysia', department: 'Operations' },
    { title: 'Data Scientist', location: 'Remote', department: 'AI & Software' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Careers at Company A</h1>
        <p>Build your career with us and shape the future</p>
      </div>

      <section className="content-section">
        <div className="cards-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="card">
              <div className="card-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="list-section" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#3f0606' }}>
            Open Positions
          </h2>
          {openings.map((job, index) => (
            <div key={index} className="list-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3>{job.title}</h3>
                  <div className="meta">
                    📍 {job.location} • 🏢 {job.department}
                  </div>
                </div>
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ marginBottom: '15px' }}>Don't see a position that fits? Send us your resume!</p>
            <a href="mailto:careers@companya.com" style={{ color: '#7f1d1d', fontWeight: 'bold' }}>
              careers@companya.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;
