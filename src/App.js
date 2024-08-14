import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StaffPage from './pages/StaffList';
import SchedulePage from './pages/ShiftList';
import TimeOffRequest from './pages/TimeOffRequest';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeList from './pages/EmployeeList';
import Navbar from './components/Navbar';
import Sidebar from './pages/Sidebar';
import SwapRequest from './pages/SwapRequestList';
import SwapRequestForm from './pages/SwapRequestForm';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState('');
  const [shifts, setShifts] = useState([
    { id: 1, date: '2024-07-28', type: 'Morning', staffNeeded: 3 },
    { id: 2, date: '2024-07-29', type: 'Evening', staffNeeded: 2 },
    // Add more shifts as needed
  ]);

  const handleNewRequest = (request) => {
    setRequests((prevRequests) => [...prevRequests, request]);
  };

  const handleNotify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 20000); // Clear notification after 20 seconds
  };

  const addEmployee = (newEmployee) => {
    const isDuplicate = employees.some(employee => employee.name === newEmployee.name && employee.position === newEmployee.position);
    if (isDuplicate) {
      alert('An employee with the same name and position already exists.');
      return;
    }
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/staffList" element={<StaffPage />} />
            <Route path="/shiftList" element={<SchedulePage />} />
            <Route path="/timeOffRequests" element={<TimeOffRequest onSubmitRequest={handleNewRequest} onNotify={handleNotify} />} />
            <Route path="/managerDashboard" element={<ManagerDashboard requests={requests} onNotify={handleNotify} />} />
            <Route path="/employeeForm" element={<EmployeeForm addEmployee={addEmployee} />} />
            <Route path="/employeeList" element={<EmployeeList employees={employees} setEmployees={setEmployees} />} />
            <Route path="/swapRequest" element={<SwapRequest shifts={shifts} onRequestSwap={handleNewRequest} />} />
          </Routes>
          {notification && <div className="notification">{notification}</div>}
        </main>
      </div>
    </Router>
  );
};

export default App;
