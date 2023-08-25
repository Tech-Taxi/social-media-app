import axios from "axios";
import React, { useRef, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";

import {BACKEND_URI} from '../config'

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { toggleD } = useContext(UserContext);

  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${BACKEND_URI}/api/v1/users/login`,
        {
          email: email.current.value,
          password: password.current.value,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setUser(response.data.user);
          toggleD(false);
        }
      })
      .catch((error) => {
        alert(error.response.data.message) 
      });
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-left">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 dark:bg-slate-700"
            type="email"
            ref={email}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-left">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 dark:bg-slate-700"
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
          Log In
        </button>
      </form>
      <Link
        className="flex mt-3 px-4 py-2 bg-gray-100 rounded-lg items-center justify-center gap-1 dark:text-black dark:border-gray-900"
        to={`${BACKEND_URI}/api/v1/users/auth/google`}
      >
        <p
          className="text-lg rounded-full border p-1"
          style={{ transform: "translateY(0.6px)" }}
        >
          <AiOutlineGoogle />
        </p>
        Sign In With Google
      </Link>
    </div>
  );
};

export default Login;
