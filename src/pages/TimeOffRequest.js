// src/pages/TimeOffRequest.js
import React, { useState } from 'react';
import './TimeOffRequest.css'; // Assuming you will add styles in this file

const TimeOffRequest = ({ onSubmitRequest, onNotify }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateDates = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setError('End date must be after start date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateDates()) return;

    setLoading(true);
    try {
      // Logic to submit the request
      // Example: await submitRequest({ employeeName, startDate, endDate, reason });

      // Notify the parent component
      onSubmitRequest({ employeeName, startDate, endDate, reason });
      setSuccess('Request submitted successfully!');
      onNotify('Request submitted successfully!');
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      onNotify('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer-container">
      <div className="time-off-request">
        <center><h2>Request Time Off</h2></center>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <center><button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button></center>
        </form>
      </div>
    </div>
  );
};

export default TimeOffRequest;
