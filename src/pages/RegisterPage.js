import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', isAdmin: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.get('http://localhost:8000/api/users/');
      const existingUsers = response.data;
      const userExists = existingUsers.some(user => user.email === formData.email);
  
      if (userExists) {
        setError('User already exists');
        toast.error('User already exists');
        return;
      }
  
      await axios.post('http://localhost:8000/api/users/', {
        name: formData.username,  // Adjust to match your model
        email: formData.email,
        password: formData.password,
      });
      toast.success('Registration successful');
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('User already exists or data is invalid');
        toast.error('User already exists or data is invalid');
      } else {
        setError('An error occurred during registration');
        toast.error('An error occurred during registration');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
            Admin Access
          </label>
          <button type="submit">Register</button>
        </form>
        <p className="redirect-message">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
