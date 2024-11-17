import React, { useState } from 'react';
import './PasswordForm.scss';

const PasswordForm = () => {
  // State hooks to handle password input and validation
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Function to validate password confirmation
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only proceed with form submission if no errors exist
    if (!error) {
      // Implement your form submission logic here
      alert('Passwords match! Form submitted.');
    }
  };

  return (
    <div className="password-form-container">
      <div className="moon">
        {/* Additional Crater for decoration */}
        <div className="crater-3"></div>
      </div>
      
      <div className="container">
        {/* Title of the form */}
        <h2 className="form-title"> Reset Your Password</h2>

        <form onSubmit={handleSubmit}>
          {/* Password Input Field */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(); // Revalidate on change
            }}
            className="input-field"
            required
          />

          {/* Confirm Password Input Field */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validatePassword(); // Revalidate on change
            }}
            className="input-field"
            required
          />

          {/* Error message display */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button, disabled if error exists */}
          <button 
            type="submit" 
            className="button" 
            disabled={Boolean(error)}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
