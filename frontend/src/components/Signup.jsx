import React, { useRef } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const email=useRef();
  const password=useRef();
  const confirmPassword=useRef();
  const navigate = useNavigate();
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/users/register', {
      "email": email.current.value,
      "password": password.current.value,
      "confirmPassword": confirmPassword.current.value
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
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left">Name</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="text"
            // id="email"
            // value={email}
            // onChange={handleEmailChange}
            placeholder="Name"
            required
          />
          <label className="block text-left">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Confirm Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
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
