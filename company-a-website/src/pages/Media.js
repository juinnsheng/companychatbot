import React from 'react';

function Media() {
  const news = [
    {
      icon: '📢',
      date: '2023-12-15',
      type: 'Press Release',
      title: 'Company A Announces Record Revenue of $3.4 Billion for FY2023',
      content: 'Company A today announced record financial results for fiscal year 2023, with revenue reaching $3.4 billion, a 17% increase from the previous year.'
    },
    {
      icon: '🏆',
      date: '2023-11-20',
      type: 'Award',
      title: 'Company A Wins Asia Sustainability Award 2023',
      content: 'Company A has been recognized with the prestigious Asia Sustainability Award for its leadership in carbon reduction and renewable energy adoption.'
    },
    {
      icon: '🚀',
      date: '2023-10-05',
      type: 'Product Launch',
      title: 'Revolutionary QuantumChip X200 Launched',
      content: 'Company A unveiled the QuantumChip X200, a breakthrough in quantum computing components offering 10x performance improvement.'
    },
    {
      icon: '🤝',
      date: '2023-08-12',
      type: 'Partnership',
      title: 'Strategic Partnership with Global Automotive Leader',
      content: 'Company A announced a multi-year partnership valued at over $500 million to supply advanced sensors and AI systems for autonomous vehicles.'
    },
    {
      icon: '💡',
      date: '2023-06-30',
      type: 'Innovation',
      title: 'Company A Opens State-of-the-Art AI Research Center',
      content: 'A new 50,000 square foot AI Research Center opened in San Jose, California, representing a $100 million investment in future technologies.'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Media Center</h1>
        <p>Latest news and announcements from Company A</p>
      </div>

      <section className="list-section">
        <div className="container">
          {news.map((item, index) => (
            <div key={index} className="list-item">
              <div className="meta">
                <span>{item.icon} {item.type}</span> • <span>{item.date}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Media;