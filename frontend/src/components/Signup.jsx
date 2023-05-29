import React, { useState } from 'react';
import axios from 'axios';
import {} from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left" htmlFor="email">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left" htmlFor="password">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
