import React from 'react';

function Sustainability() {
  const initiatives = [
    {
      icon: '🎯',
      title: 'Carbon Neutrality Goal',
      content: 'Company A is committed to achieving carbon neutrality by 2030. We have reduced our carbon emissions by 50% since 2020.'
    },
    {
      icon: '🌿',
      title: 'Renewable Energy',
      content: 'We operate three solar-powered manufacturing facilities that generate 60% of our energy needs from renewable sources.'
    },
    {
      icon: '♻️',
      title: 'Circular Economy',
      content: 'Company A has implemented circular economy principles. We recycle 85% of manufacturing waste and use recycled materials.'
    },
    {
      icon: '💧',
      title: 'Water Conservation',
      content: 'Our water recycling systems have reduced freshwater consumption by 40%. All facilities use closed-loop water systems.'
    },
    {
      icon: '👥',
      title: 'Community Impact',
      content: 'We invest 2% of annual profits in community development. Provided STEM education to 50,000+ students and planted 1 million trees.'
    }
  ];

  return (
    <div>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #2d7a2d, #1a5c1a)' }}>
        <h1>Sustainability</h1>
        <p>Building a sustainable future for generations to come</p>
      </div>

      <section className="content-section">
        <div className="stats-grid" style={{ marginBottom: '40px' }}>
          <div className="stat-card">
            <h3>50%</h3>
            <p>Carbon Reduction</p>
          </div>
          <div className="stat-card">
            <h3>85%</h3>
            <p>Waste Recycled</p>
          </div>
          <div className="stat-card">
            <h3>2030</h3>
            <p>Carbon Neutral Goal</p>
          </div>
        </div>

        <div className="cards-grid">
          {initiatives.map((item, index) => (
            <div key={index} className="card">
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Sustainability;