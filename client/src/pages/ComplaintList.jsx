import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaints');
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await api.get(`/complaints/search?location=${searchLocation}&category=${filterCategory}`);
      setComplaints(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await api.delete(`/complaints/${id}`);
        fetchComplaints();
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="container">
      <h2>All Complaints</h2>

      <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Roads">Roads</option>
          </select>
          <button className="btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="complaint-list">
        {complaints.length === 0 ? <p>No complaints found.</p> : null}
        {complaints.map(comp => (
          <div key={comp._id} className="complaint-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{comp.title}</h3>
              <span className={`badge ${comp.priority?.toLowerCase() || 'normal'}`}>
                {comp.priority || 'Normal'} Priority
              </span>
            </div>
            <p><strong>Category:</strong> {comp.category} | <strong>Location:</strong> {comp.location}</p>
            <p><strong>Status:</strong> <span className={`status-${comp.status.toLowerCase().replace(' ', '')}`}>{comp.status}</span></p>
            {comp.department && (
              <p>
                <strong>Assigned Dept:</strong> {comp.department}
              </p>
            )}
            <p style={{ marginTop: '1rem' }}>{comp.description}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <Link to={`/complaints/${comp._id}/status`} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Update Status</Link>
              <button className="btn btn-danger" onClick={() => handleDelete(comp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplaintList;
