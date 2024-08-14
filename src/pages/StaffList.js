import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffList.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', contactnumber: '', position: '', user_email: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/staff/');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error.response ? error.response.data : error.message);
      alert('Failed to fetch staff data. Please try again later.');
    }
  };

  const addStaffMember = async (newMember) => {
    const isValid = newMember.name && newMember.contactnumber && newMember.position && newMember.user_email;
    if (!isValid) {
      alert('Please fill all required fields.');
      return;
    }

    const isDuplicate = staff.some(member => member.user_email === newMember.user_email);
    if (isDuplicate) {
      alert('A staff member with the same email already exists.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/staff/', newMember);
      console.log('Staff member added:', response.data); // Debugging line
      setStaff(prevStaff => [...prevStaff, response.data]);
      setSuccessMessage('Staff member added successfully!');
    } catch (error) {
      console.error('Error adding staff member:', error.response ? error.response.data : error.message);
      alert('Failed to add staff member. Please try again later.');
    }
  };

  const deleteStaffMember = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/staff/${id}/`);
      setStaff(prevStaff => prevStaff.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting staff member:', error.response ? error.response.data : error.message);
      alert('Failed to delete staff member. Please try again later.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccessMessage('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.position) errors.position = "Position is required";
    if (!formData.contactnumber) errors.contactnumber = "Contact number is required";
    if (!formData.user_email) errors.user_email = "Email is required";
    if (formData.user_email && !/\S+@\S+\.\S+/.test(formData.user_email)) errors.user_email = "Email is invalid";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Submitting form data:', formData); // Log formData for debugging
    await addStaffMember(formData);
    setFormData({ name: '', contactnumber: '', position: '', user_email: '' });
  };

  return (
    <div className="staff-list">
      <center><h2>Employee Members</h2></center>
      <input
        type="text"
        placeholder="Search by name or position"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul>
        {filteredStaff.map(member => (
          <li key={member.id} className="staff-item">
            <div>
              <strong>{member.name}</strong> - {member.position} ({member.contactnumber}, {member.user_email})
            </div>
            <div>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn" onClick={() => deleteStaffMember(member.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="staff-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" name="contactnumber" value={formData.contactnumber} onChange={handleChange} placeholder="Contact Number" required />
          {errors.contactnumber && <span className="error">{errors.contactnumber}</span>}
        </div>
        <div className="form-group">
          <label>Position</label>
          <select name="position" value={formData.position} onChange={handleChange} required>
            <option value="">Select Position</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Editor">Editor</option>
          </select>
          {errors.position && <span className="error">{errors.position}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} placeholder="Email" required />
          {errors.user_email && <span className="error">{errors.user_email}</span>}
        </div>
        <center><button type="submit">Add Staff</button></center>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default StaffList;
