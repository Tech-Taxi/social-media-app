import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { toggleD, d, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    // navigate('/register', {state: {active: e}})
    toggleD(() => !d);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        alert("Logged Out successfully 🥳");
        setTimeout(navigate(0), 1500);
      })
      .catch((err) => console.log(err));
  };

  // If the user exists in the context, then instead of displaying the regular things, display the user specific information.

  return (
    <div className="h-14 items-center flex bg-white">
      <div className="w-1/2 flex justify-start gap-5 mx-6 px-6">
        <h1 className="text-2xl font-semibold text-blue-700">Social Media</h1>
      </div>
      <div className="w-1/2 flex justify-end gap-5 mx-6 px-6">
        {!user ? (
          <button
            className="bg-blue-500 text-white font-medium border-b-2 border-transparent py-1 px-3 rounded-full hover:bg-blue-600 transition"
            onClick={() => handleLogin("register")}
          >
            Log In
          </button>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200">
            <UserMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
