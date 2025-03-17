import React, { useState } from 'react';
import { endpoints } from '../api/config';

const SignIn = ({ email, setEmail, password, setPassword, error, handleSignIn, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(endpoints.signin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin':'https://dwlrpga2kd.execute-api.ap-south-1.amazonaws.com'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }

      // Call the parent component's handleSignIn function with the response data
      handleSignIn(e, data);
    } catch (err) {
      console.error('Signin error:', err);
      // You might want to handle this error in the parent component
      handleSignIn(e, null, err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Sign In</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 