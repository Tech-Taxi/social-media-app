import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { toggleD, d, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    toggleD(() => !d);
  };

  return (
    <div className="h-14 items-center flex bg-white dark:bg-slate-800 z-52">
      <div className="w-1/2 flex justify-start px-6">
        <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
          <Link to={"/"}>Social Media</Link>
        </h1>
      </div>
      <div className="w-1/2 flex justify-end gap-5 mx-6 px-6">
        {!user ? (
          <button
            className="bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium border-b-2 border-transparent py-1 px-3 rounded-full hover:bg-blue-600"
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
