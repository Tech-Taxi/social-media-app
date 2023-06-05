import React, { useState } from "react";
import axios from "axios";

function EditModal({ user, setUser, onClose }) {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    dob: new Date(user.dob).toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch("http://localhost:5000/api/v1/users/updateMe", formData, {
        withCredentials: true,
      })
      .then((response) => {
        setUser((user) => ({
          ...user,
          name: response.data.data.name,
          bio: response.data.data.bio,
          email: response.data.data.email,
          dob: response.data.data.dob,
          age: response.data.data.age,
        }));
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg overflow-hidden transform transition-transform ease-in-out duration-300 -translate-x-full md:-translate-x-1/2">
        <div className="p-4 bg-blue-500 text-white">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block mb-1 font-medium">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                name="bio"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block mb-1 font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.dob}
                onChange={handleChange}
                max={today}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
