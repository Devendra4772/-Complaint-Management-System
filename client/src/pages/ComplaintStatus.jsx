import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ComplaintStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('In Progress');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/complaints/${id}`, { status });
      alert('Status updated successfully');
      navigate('/complaints');
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px' }}>
      <div className="card">
        <h2>Update Complaint Status</h2>
        <form onSubmit={handleUpdate} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>New Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintStatus;
