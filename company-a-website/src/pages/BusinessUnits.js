import React from 'react';

function BusinessUnits() {
  const units = [
    {
      icon: '🔌',
      name: 'Advanced Electronics Division',
      description: 'Our Advanced Electronics Division specializes in designing and manufacturing high-performance integrated circuits, microprocessors, and semiconductor components.',
      revenue: '45%',
      products: ['SmartBoard Pro Series', 'QuantumChip X200', 'AutoDrive Sensors']
    },
    {
      icon: '⚡',
      name: 'Sustainable Energy Solutions',
      description: 'This division focuses on renewable energy technologies including solar panel manufacturing, energy storage systems, and smart grid solutions.',
      revenue: '25%',
      products: ['SolarMax Panels', 'EnergyVault Battery Systems', 'GridSmart Controllers']
    },
    {
      icon: '🤖',
      name: 'AI & Software Services',
      description: 'Our newest division develops artificial intelligence solutions, machine learning platforms, and enterprise software for smart manufacturing.',
      revenue: '20%',
      products: ['IntelliFactory AI Platform', 'PredictPro Analytics', 'AutoOptimize Suite']
    },
    {
      icon: '🔬',
      name: 'Research & Development',
      description: 'The R&D division drives innovation across all business units. We focus on emerging technologies including quantum computing and nanotechnology.',
      revenue: '10%',
      products: ['Quantum Components', 'NanoMaterial Solutions', 'Future Tech Prototypes']
    }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Business Units</h1>
        <p>Driving innovation across multiple sectors</p>
      </div>

      <section className="content-section">
        <div className="cards-grid">
          {units.map((unit, index) => (
            <div key={index} className="card">
              <div className="card-icon">{unit.icon}</div>
              <h3>{unit.name}</h3>
              <p>{unit.description}</p>
              <div className="revenue">Revenue: {unit.revenue}</div>
              <div style={{ marginTop: '15px' }}>
                <strong>Key Products:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {unit.products.map((product, idx) => (
                    <li key={idx}>{product}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BusinessUnits;
