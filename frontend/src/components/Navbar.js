import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        navigate('/register', {state: {active: e}})
    }

// If the user exists in the context, then instead of displaying the regular things, display the user specific information.

  return (
    <div className="h-14 items-center flex bg-white">
      <div className="w-1/2 flex justify-start gap-5 mx-6 px-6">
        <h1 className="text-2xl font-semibold text-blue-700">
            Social Media
        </h1>
      </div>
      <div className="w-1/2 flex justify-end gap-5 mx-6 px-6">
        <button className="text-blue-500 font-medium border-b-2 border-transparent hover:border-blue-400 py-1 px-3" onClick={() => handleLogin("login")}>
          Log in
        </button>
        <button className="bg-blue-500 text-white font-medium border-b-2 border-transparent py-1 px-3" onClick={() => handleLogin("register")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
