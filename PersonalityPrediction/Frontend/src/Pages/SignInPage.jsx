import React, { useState } from 'react';
import './SignUpPage.css'; // Make sure the CSS path matches your structure
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    // Validate email
    if (!formData.email || !validateEmail(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }

    // Validate password (can add more specific checks if necessary)
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      console.log('Logging in with:', formData);

      const response = axios.post("https://", formData)
      setErrors({}); // Clear errors on successful validation
      navigate("/prediction")
    }
  };

  return (
    <div className="signin-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <input
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
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
