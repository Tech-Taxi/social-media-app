import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const dob = useRef();
  const gender = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/users/register", {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
        dob: dob.current.value,
        gender: gender.current.value,
      })
      .then((response) => {
        if (response.data.status === "success") {
          // document.cookie = `user_id=${response.data.token}; max-age=31536000; path=/`;
          // backend e cookie set hoye jabe
          alert("Registered Successfully 🥳");
          setTimeout(() => navigate("/home"), 1500);
        }
      })
      .catch((error) => {
        alert(error.reponse.data.message);
      });
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
            placeholder="Name"
            ref={name}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="email"
            placeholder="Email"
            ref={email}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Confirm Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Gender</label>
          <input
            className="mr-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="radio"
            ref={gender}
            value={"Male"}
            name="gender"
          />
          <span className="mr-3">Male</span>
          <input
            className="mr-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="radio"
            ref={gender}
            value={"Female"}
            name="gender"
          />
          <span className="mr-3">Female</span>
          <input
            className="mr-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="radio"
            ref={gender}
            value={"Other"}
            name="gender"
          />
          <span className="mr-3">Other</span>
        </div>
        <div className="mb-4">
          <label className="block text-left">Birthday</label>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
            type="date"
            ref={dob}
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
