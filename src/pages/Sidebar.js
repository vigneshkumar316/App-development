import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className={`sidebar ${isOpen ? '' : 'active'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <h2>Sidebar</h2>
      <ul>
        <li><NavLink to="/staffList">Staff List</NavLink></li>
        <li><NavLink to="/shiftList">Shift List</NavLink></li>
        <li><NavLink to="/swapRequest">Swap Request</NavLink></li>
        <li><NavLink to="/employeeForm">Employee Form</NavLink></li>
        <li><NavLink to="/timeOffRequests">Time-Off Requests</NavLink></li>
        <li><NavLink to="/employeeList">Employee List</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
