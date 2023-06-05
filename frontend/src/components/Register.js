import React, {  useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginPage = () => {
  const [activeComponent, setActiveComponent] = useState('login');

  const handleToggleComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex flex-col items-center min-h-screen fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-slate-900 dark:bg-opacity-50 dark:text-white">
      <div className="flex space-x-2 mt-28">
        <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:text-black'
          }`}
          onClick={() => handleToggleComponent('login')}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeComponent === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:text-black'
          }`}
          onClick={() => handleToggleComponent('signup')}
        >
          Signup
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6 w-96 dark:bg-slate-700">
        {activeComponent === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default LoginPage;
