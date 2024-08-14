import React, { useState } from 'react';
import './ManagerDashboard.css';

const ManagerDashboard = ({ requests, onNotify }) => {
  const [notification, setNotification] = useState(''); // State to store notification message

  const handleApprove = (id) => {
    // Logic to approve request
    console.log(`Approved request with id: ${id}`);
    setNotification(`Request with ID ${id} has been approved.`); // Set notification
    onNotify(`Request with ID ${id} has been approved.`); // Notify parent
  };

  const handleDeny = (id) => {
    // Logic to deny request
    console.log(`Denied request with id: ${id}`);
    setNotification(`Request with ID ${id} has been denied.`); // Set notification
    onNotify(`Request with ID ${id} has been denied.`); // Notify parent
  };
  

  return (
    <div className="dashboard-container">
      <h2>Manager Dashboard </h2>
      {notification && <div className="notification">{notification}</div>}
      <ul className="request-list">
        {requests.map((request, index) => (
          <li key={index} className="request-item">
            <div className="request-details">
              <p><strong>Employee:</strong> {request.employeeName || 'Unknown'}</p>
              <p><strong>Dates:</strong> {request.startDate} TO {request.endDate}</p>
              <p><strong>Reason:</strong> {request.reason}</p>
            </div>
            <div className="request-actions">
              <button onClick={() => handleApprove(index)} className="approve-btn">Approve</button>
              <button onClick={() => handleDeny(index)} className="deny-btn">Deny</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerDashboard;
