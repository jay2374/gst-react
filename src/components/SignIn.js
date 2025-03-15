import React from 'react';

const SignIn = ({ email, setEmail, password, setPassword, error, handleSignIn, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Sign In</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 