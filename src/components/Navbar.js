import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // Temporary placeholders. Replace with actual authentication logic.
  const isLoggedIn = true; // Example placeholder
  const isManager = true;  // Example placeholder

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-header">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Close' : 'Staff_Details'}
      </button>

        <div className="navbar-links">
          <NavLink to="/" className="home-button">Home</NavLink>
          <NavLink to="/login" className="login-button">Login</NavLink>
          <NavLink to="/register" className="register-button">Register</NavLink>
        </div>
      </div>
      <ul className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <li><NavLink to="/staffList">Staff List</NavLink></li>
        <li><NavLink to="/shiftList">Shift List</NavLink></li>
        <li><NavLink to="/swapRequest">Swap Request</NavLink></li>
        <li><NavLink to="/employeeList">Employee List</NavLink></li>
        <li><NavLink to="/timeOffRequests">Time-Off Requests</NavLink></li>    
      </ul>
    </nav>
  );
};

export default Navbar;
