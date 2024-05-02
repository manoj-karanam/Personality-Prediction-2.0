import React, { useState } from 'react';
import './SignUpPage.css'; // Ensure the CSS path matches your structure
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear the specific field error when the user modifies the input
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    // Validate email
    if (!formData.email || !validateEmail(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }

    // Validate password
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return; // Prevent further execution if there are errors
    }

    // Create the payload inside the handleSubmit function
    const payload = {
      login: {
        email: formData.email,
        password: formData.password
      }
    };

    try {
      // Log in with provided credentials
      const response = await axios.post("http://127.0.0.1:8000/api/login/", payload);
      console.log('Login successful:', response.data);
      setErrors({}); // Clear errors on successful validation
      navigate("/prediction"); // Navigate after successful login
    } catch (error) {
      // Handle errors if the request fails
      console.error('Login error:', error.response || error);
      if (error.response) {
        // Set backend error messages here if you expect any
        setErrors({ apiError: error.response.data.detail || 'Error logging in' });
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <input
            type="email"
            name="email"
            className={errors.email ? 'input-error' : ''}
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            name="password"
            className={errors.password ? 'input-error' : ''}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
          {errors.apiError && <div className="api-error">{errors.apiError}</div>}
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
