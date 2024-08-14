import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginSuccess, loginFailure } from '../slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';
import axios from 'axios';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/users/');
      const users = response.data;
      const user = users.find(user => user.email === formData.email && user.password === formData.password);

      if (user) {
        dispatch(loginSuccess());
        toast.success('Login successful! Redirecting...');
        
        setTimeout(() => {
          if (user.email==="vicky123@gmail.com" && user.password==="123") {
            navigate('/managerDashboard'); // Redirect to admin page
          } else {
            navigate('/');
          }
        }, 100); 
      } else {
        dispatch(loginFailure('Invalid credentials'));
        toast.error('Invalid credentials');
      }
    } catch (err) {
      dispatch(loginFailure('An error occurred during login'));
      toast.error('An error occurred during login');
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Sign In</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p className="redirect-message">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
