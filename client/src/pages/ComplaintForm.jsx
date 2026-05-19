import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ComplaintForm() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: '',
    description: '',
    category: 'Water',
    location: ''
  });

  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAiAnalyze = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please enter title and description first");
      return;
    }
    setLoadingAi(true);
    try {
      const { data } = await api.post('/ai/analyze', {
        title: formData.title,
        description: formData.description
      });
      setAiData(data);
    } catch (err) {
      alert('AI Analysis failed');
    }
    setLoadingAi(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (aiData) {
        payload.priority = aiData.priority;
        payload.department = aiData.department;
        payload.aiSummary = aiData.summary;
      }

      await api.post('/complaints', payload);
      alert('Complaint submitted successfully!');
      navigate('/complaints');
    } catch (err) {
      alert('Error submitting complaint');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2>Register Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          
          <button type="button" className="btn btn-ai" onClick={handleAiAnalyze} disabled={loadingAi}>
            {loadingAi ? 'Analyzing...' : '✨ Analyze with AI'}
          </button>

          {aiData && (
            <div className="alert" style={{ backgroundColor: '#f9ebff', border: '1px solid #d2b4de', marginBottom: '1rem' }}>
              <strong>AI Analysis Result:</strong>
              <p>Priority: <span className={`badge ${aiData.priority.toLowerCase()}`}>{aiData.priority}</span></p>
              <p>Department: {aiData.department}</p>
              <p><small>{aiData.summary}</small></p>
            </div>
          )}

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Roads">Roads</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location / Area</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;
