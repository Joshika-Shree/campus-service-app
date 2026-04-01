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
      <div className="brand">
        <Zap size={24} color="#60a5fa" />
        SmartCampus
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
