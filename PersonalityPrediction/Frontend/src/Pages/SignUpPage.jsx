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
    password: '',
    confirmPassword: ''  // Added confirm password to match backend requirements
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
    // Remove errors as user corrects them
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    } else {
      // Backend data structure adjustment
      const userData = {
        registration: {
          studentName: {
            firstName: formData.firstName,
            lastName: formData.lastName
          },
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }
      };

      try {
        // API integration
        const response = await axios.post("http://127.0.0.1:8000/api/register/", userData);
        console.log('Server response:', response.data);
        navigate("/"); // Navigate on successful registration
      } catch (error) {
        console.error('Error posting data:', error.response || error);
        setErrors({ general: 'Failed to register. Please try again.' });
      }
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
            type="email"
            name="email"
            className={errors.email ? 'input-error' : ''}
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
          {/* <input
            type="tel"
            name="phoneNumber"
            className={errors.phoneNumber ? 'input-error' : ''}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>} */}
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
          <input
            type="password"
            name="confirmPassword"
            className={errors.confirmPassword ? 'input-error' : ''}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          <button type="submit">Register</button>
          {errors.general && <div className="error general-error">{errors.general}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
