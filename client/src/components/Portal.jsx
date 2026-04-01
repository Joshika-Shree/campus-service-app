import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Portal() {
  const [formData, setFormData] = useState({ category: '', description: '', priority: 'Low' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/requests', formData);
      setStatus({ type: 'success', msg: 'Request submitted successfully!' });
      setFormData({ category: '', description: '', priority: 'Low' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to submit request.' });
    }
  };

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', color: 'white', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <CheckCircle /> Deployed Automatically via Jenkins CI/CD
        </h2>
        <p style={{ margin: 0, opacity: 0.9 }}>This prominent change proves the GitHub Webhook + Azure Pipeline is 100% operational!</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="header-section">
          <h1>Submit Request</h1>
          <p>Report an issue on campus and we'll handle it.</p>
        </div>
        
        {status && (
          <div style={{ padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: status.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: status.type === 'success' ? '#10b981' : '#ef4444' }}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select 
              className="form-control" 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select a category</option>
              <option value="IT">IT Support</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Facilities">Facilities & Cleaning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select 
              className="form-control" 
              value={formData.priority} 
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="form-control" 
              placeholder="Please detail the issue..."
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>Submit Request</button>
        </form>
      </div>
    </>
  );
}
