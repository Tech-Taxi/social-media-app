import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginPage = () => {
  const [activeComponent, setActiveComponent] = useState('login');

  const handleToggleComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleToggleComponent('login')}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleToggleComponent('signup')}
        >
          Signup
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md w-80 p-6 mt-6">
        {activeComponent === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default LoginPage;