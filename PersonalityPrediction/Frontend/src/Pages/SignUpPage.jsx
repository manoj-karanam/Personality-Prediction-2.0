import React, { useState } from 'react';
import './SignUpPage.css'; // Importing CSS for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber); // Assuming phone number should be 10 digits
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Remove errors as user corrects them
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    // Check for empty fields
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        tempErrors[key] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }

    // Phone number validation
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      tempErrors.phoneNumber = 'Invalid phone number format';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    } else {
      console.log('Form data:', formData); // Replace this with backend integration
      setErrors({});

      // API integration
      const response = axios.post("https://", formData)
      navigate("/")
    }
  };

  return (
    <div className="signup-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="firstName"
            className={errors.firstName ? 'input-error' : ''}
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
          <input
            type="text"
            name="lastName"
            className={errors.lastName ? 'input-error' : ''}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
          <input
            // type="email"
            name="email"
            className={errors.email ? 'input-error' : ''}
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="tel"
            name="phoneNumber"
            className={errors.phoneNumber ? 'input-error' : ''}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
