import React, { useState } from 'react';
import './SwapRequestForm.css';

function SwapRequestForm({ addSwapRequest }) {
  const [formData, setFormData] = useState({
    fromUsername: '',
    toUsername: '',
    checkIn: '',
    checkOut: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccessMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.fromUsername) errors.fromUsername = "Your username is required";
    if (!formData.toUsername) errors.toUsername = "Target username is required";
    if (!formData.checkIn) errors.checkIn = "Check-in time is required";
    if (!formData.checkOut) errors.checkOut = "Check-out time is required";
    if (!formData.reason) errors.reason = "Reason is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addSwapRequest(formData);
    setFormData({ fromUsername: '', toUsername: '', checkIn: '', checkOut: '', reason: '' });
    setSuccessMessage('Swap request submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="swap-request-form">
      <div className="form-group">
        <label htmlFor="fromUsername">Your Username</label>
        <input
          type="text"
          id="fromUsername"
          name="fromUsername"
          value={formData.fromUsername}
          onChange={handleChange}
          required
        />
        {errors.fromUsername && <span className="error">{errors.fromUsername}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="toUsername">Request Username</label>
        <input
          type="text"
          id="toUsername"
          name="toUsername"
          value={formData.toUsername}
          onChange={handleChange}
          required
        />
        {errors.toUsername && <span className="error">{errors.toUsername}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="checkIn">Swap-From</label>
        <input
          type="time"
          id="checkIn"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />
        {errors.checkIn && <span className="error">{errors.checkIn}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="checkOut">Swap-To</label>
        <input
          type="time"
          id="checkOut"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />
        {errors.checkOut && <span className="error">{errors.checkOut}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="reason">Reason</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>
        {errors.reason && <span className="error">{errors.reason}</span>}
      </div>
      <button type="submit">Submit Request</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default SwapRequestForm;
