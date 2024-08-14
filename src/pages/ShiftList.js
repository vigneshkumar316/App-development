import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShiftList.css';

const apiUrl = 'http://localhost:8000/api/shift/';

function ShiftList() {
  const [shifts, setShifts] = useState([]);
  const [formData, setFormData] = useState({ date: '', type: '', staff_needed: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(apiUrl);
        setShifts(response.data);
      } catch (error) {
        console.error('Error fetching shift data:', error.response ? error.response.data : error.message);
      }
    };

    fetchShifts();
  }, []);

  const addShift = async (newShift) => {
    // Validate data before sending the request
    const isValid = newShift.date && newShift.type && newShift.staff_needed > 0;
    if (!isValid) {
      setErrors({
        date: !newShift.date ? 'Date is required' : '',
        type: !newShift.type ? 'Shift type is required' : '',
        staff_needed: newShift.staff_needed <= 0 ? 'Valid staff number is required' : ''
      });
      return;
    }
  
    try {
      // Log the request data for debugging
      console.log('Posting new shift data:', newShift);
  
      // Make the POST request to the backend
      const response = await axios.post(apiUrl, newShift, {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if necessary
        }
      });
  
      // Log the response data for debugging
      console.log('Response from server:', response.data);
  
      // Update state with the newly added shift
      setShifts(prevShifts => [...prevShifts, response.data]);
      setSuccessMessage('Shift added successfully!');
      setFormData({ date: '', type: '', staff_needed: '' }); // Clear the form
    } catch (error) {
      // Log the error details for debugging
      console.error('Error adding shift:', error.response ? error.response.data : error.message);
  
      // Provide a user-friendly error message
      const errorMessage = error.response?.data?.detail || 'An error occurred while adding the shift. Please try again.';
      setErrors({ ...errors, form: errorMessage }); // Optionally set a general form error message
      setSuccessMessage(''); // Clear any success message
    }
  };
  
  const deleteShift = async (id) => {
    try {
      await axios.delete(`${apiUrl}${id}/`);
      setShifts(prevShifts => prevShifts.filter(shift => shift.id !== id));
    } catch (error) {
      console.error('Error deleting shift:', error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccessMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.date) errors.date = "Date is required";
    if (!formData.type) errors.type = "Shift type is required";
    if (!formData.staff_needed || formData.staff_needed <= 0) errors.staff_needed = "Valid staff number is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addShift(formData);
    setFormData({ date: '', type: '', staff_needed: '' });
  };

  const sortShifts = () => {
    const sortedShifts = [...shifts].sort((a, b) => {
      return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    });
    setShifts(sortedShifts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredShifts = shifts.filter(shift =>
    shift.date.includes(searchTerm) ||
    shift.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shift-list">
      <center><h2>Shift Schedule</h2></center>
      <button onClick={sortShifts} className="sort-btn">
        Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <ul>
        {filteredShifts.map(shift => (
          <li key={shift.id} className="shift-item">
            <div>
              <strong>Date:</strong> {shift.date} <br />
              <strong>Type:</strong> {shift.type} <br />
              <strong>Staff Needed:</strong> {shift.staff_needed}
            </div>
            <div>
              <button className="delete-btn" onClick={() => deleteShift(shift.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="shift-form">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="type">Shift Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Shift Type</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="staffNeeded">Staff Needed</label>
          <input
            type="number"
            id="staff_needed"
            name="staff_needed"
            value={formData.staff_needed}
            onChange={handleChange}
            min="1"
            required
          />
          {errors.staff_needed && <span className="error">{errors.staff_needed}</span>}
        </div>
        <center><button type="submit">Add Shift</button></center>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default ShiftList;
