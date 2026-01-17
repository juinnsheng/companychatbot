
import React from 'react';

function Contact() {
  const contacts = [
    { icon: '📧', label: 'General Inquiries', value: 'info@companya.com' },
    { icon: '💼', label: 'Investor Relations', value: 'investors@companya.com' },
    { icon: '📰', label: 'Media Inquiries', value: 'media@companya.com' },
    { icon: '🛠️', label: 'Customer Support', value: 'support@companya.com' }
  ];

  const offices = [
    {
      name: 'Global Headquarters',
      location: 'Kuala Lumpur, Malaysia',
      address: 'Tower A, Menara Company A, Jalan Ampang, 50450 Kuala Lumpur, Malaysia',
      phone: '+60 3 2161 8888',
      email: 'hq@companya.com'
    },
    {
      name: 'Manufacturing & Innovation Center',
      location: 'Penang, Malaysia',
      address: 'Bayan Lepas Industrial Park, 11900 Penang, Malaysia',
      phone: '+60 4 643 9999',
      email: 'penang@companya.com'
    },
    {
      name: 'Regional Hub - Asia Pacific',
      location: 'Singapore',
      address: '1 Marina Boulevard, #20-01, 018989 Singapore',
      phone: '+65 6789 1234',
      email: 'singapore@companya.com'
    },
    {
      name: 'Technology Center',
      location: 'San Jose, USA',
      address: '2500 Mission College Blvd, Santa Clara, CA 95054, USA',
      phone: '+1 408 555 7890',
      email: 'usa@companya.com'
    },
    {
      name: 'European Operations',
      location: 'Frankfurt, Germany',
      address: 'Europa-Allee 50, 60327 Frankfurt, Germany',
      phone: '+49 69 9876 5432',
      email: 'europe@companya.com'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>

      <section className="content-section">
        <div className="cards-grid">
          {contacts.map((contact, index) => (
            <div key={index} className="card">
              <div className="card-icon">{contact.icon}</div>
              <h3>{contact.label}</h3>
              <a href={`mailto:${contact.value}`} style={{ color: '#7f1d1d', fontWeight: 'bold' }}>
                {contact.value}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="list-section" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#3f0606' }}>
            Our Global Offices
          </h2>
          {offices.map((office, index) => (
            <div key={index} className="office-card">
              <h3>{office.name}</h3>
              <div className="location">{office.location}</div>
              <div className="details">
                <div>📍 {office.address}</div>
                <div>📞 {office.phone}</div>
                <div>
                  📧 <a href={`mailto:${office.email}`} style={{ color: '#7f1d1d' }}>
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Contact;