import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const email=useRef();
  const password=useRef();
  const navigate = useNavigate();

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/users/login', {
      "email": email.current.value,
      "password": password.current.value
    })
    .then((response)=>{
      if(response.data.status === 'success'){
        // document.cookie = `user_id=${response.data.token}; max-age=31536000; path=/`;
        // backend e cookie set hoye jabe
        navigate('/home');
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left" htmlFor="email">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="email"
            ref={email}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left" htmlFor="password">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
            ref={password}
            placeholder="Password"
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
