import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
      setRequests(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}/status`, { status });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'pending';
      case 'In Progress': return 'progress';
      case 'Resolved': return 'resolved';
      default: return '';
    }
  };

  return (
    <div>
      <div className="header-section" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <p>Manage and track all campus service requests.</p>
      </div>

      <div className="dashboard-grid">
        {requests.map(req => (
          <div key={req.id} className="request-card glass-card">
            <div className="req-header">
              <span className={`badge ${getStatusClass(req.status)}`}>{req.status}</span>
              <span className="req-id">#{req.id}</span>
            </div>
            <div className="req-category">{req.category}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Priority: <span style={{ color: req.priority === 'Critical' ? '#ef4444' : req.priority === 'High' ? '#f59e0b' : 'inherit'}}>{req.priority}</span></div>
            <div className="req-desc">{req.description}</div>
            <div className="req-footer">
              <span>{new Date(req.createdAt).toLocaleDateString()}</span>
              <select 
                className="form-control" 
                style={{ width: 'auto', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                value={req.status}
                onChange={(e) => updateStatus(req.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
        {requests.length === 0 && <p style={{ color: '#94a3b8' }}>No requests found.</p>}
      </div>
    </div>
  );
}
