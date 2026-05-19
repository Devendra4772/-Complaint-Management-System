import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return null;

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user.name}!</h2>
        <p>This is your Smart Complaint Management Dashboard.</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Link to="/new-complaint" className="btn">Register New Complaint</Link>
          <Link to="/complaints" className="btn" style={{ backgroundColor: '#2ecc71' }}>View All Complaints</Link>
        </div>
      </div>
      <div className="card">
        <h3>How it works</h3>
        <p style={{ marginTop: '1rem' }}>
          Our AI system automatically analyzes your complaint to assign priority and the correct department based on keywords, ensuring faster resolution times.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
