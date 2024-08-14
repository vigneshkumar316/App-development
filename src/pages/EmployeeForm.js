import React, { useState } from 'react';
import './EmployeeForm.css'; // Ensure you have relevant styles

function EmployeeForm({ addEmployee }) {
  const [formData, setFormData] = useState({ name: '', position: '', checkIn: '', checkOut: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccessMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.position) errors.position = "Position is required";
    if (!formData.checkIn) errors.checkIn = "Check-in time is required";
    if (!formData.checkOut) errors.checkOut = "Check-out time is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addEmployee(formData);
    setFormData({ name: '', position: '', checkIn: '', checkOut: '' });
    setSuccessMessage('Employee added successfully!');
  };



  
  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        {errors.position && <span className="error">{errors.position}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="checkIn">Check-in Time</label>
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
        <label htmlFor="checkOut">Check-out Time</label>
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
      <center><button type="submit">Add Employee</button></center>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default EmployeeForm;
