import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Zap } from 'lucide-react';
import Portal from './components/Portal';
import Dashboard from './components/Dashboard';

function Navigation() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  
  return (
    <nav>
      <div className="brand" style={{ background: 'linear-gradient(90deg, #ff8a00, #e52e71)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>
        <Zap size={24} color="#ff8a00" />
        SmartCampus V2 🚀
      </div>
      <div className="nav-links">
        <Link to="/" className={!isDashboard ? 'active' : ''}>
          <FileText size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Portal
        </Link>
        <Link to="/dashboard" className={isDashboard ? 'active' : ''}>
          <LayoutDashboard size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Portal />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
