import React, { useState, useContext } from "react";
import axios from "axios";
import { PencilIcon, CameraIcon } from "@heroicons/react/outline";
import EditModal from "./EditModal";
import { UserContext } from "../contexts/UserContext";

import { BACKEND_URI } from "../config";

function Owndetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleChangePhoto = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("photo", file);
        const shouldUpdate = window.confirm(
          "Are you sure you want to change your profile photo?"
        );

        if (shouldUpdate) {
          axios
            .patch(`${BACKEND_URI}/api/v1/users/updateMe`, formData, {
              withCredentials: true,
            })
            .then((response) => {
              setUser((user) => ({
                ...user,
                photo: response.data.data.photo,
              }));
            })
            .catch((error) => {
              console.error("Error updating profile image:", error);
            });
        }
      }
    };
    fileInput.click();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    user && (
      <div className="relative flex flex-col items-center mx-16 my-4 px-5 py-4 bg-white rounded-lg shadow-xl -z-50 dark:bg-slate-800 dark:text-white">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <PencilIcon
            className="w-6 h-6 text-gray-500 cursor-pointer dark:text-gray-300"
            onClick={handleEditClick}
          />
        </div>
        <div className="relative group">
          <img
            src={`${BACKEND_URI}/img/users/${user.photo}`}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover cursor-pointer"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <CameraIcon
              className="w-6 h-6 text-white bg-blue-500 rounded-full p-1"
              onClick={handleChangePhoto}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        {
          user.following && 
        <div className="flex mt-2">
          <div className="flex items-center mr-4">
            <span className="font-semibold">{user.followers.length}</span>
            <span className="text-gray-500 ml-1 dark:text-gray-300">Followers</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">{user.following.length}</span>
            <span className="text-gray-500 ml-1  dark:text-gray-300">Following</span>
          </div>
        </div>
        }
        <div className="mt-4">
          <div className="flex items-start">
            <span className="text-gray-500 mr-2 dark:text-gray-300">Bio:</span>
            <span className="flex-1 text-left">{user.bio}</span>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-gray-500 mr-2 dark:text-gray-300">Email:</span>
            <span className="flex-1 text-left">{user.email}</span>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-gray-500 mr-2 dark:text-gray-300">Gender:</span>
            <span className="flex-1 text-left">{user.gender}</span>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-gray-500 mr-2 dark:text-gray-300">Age:</span>
            <span className="flex-1 text-left">{user.age}</span>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-gray-500 mr-2 dark:text-gray-300">Total Posts:</span>
            <span className="flex-1 text-left">{user.posts.length}</span>
          </div>
        </div>
        {isModalOpen && (
          <EditModal user={user} setUser={setUser} onClose={handleCloseModal} />
        )}
      </div>
    )
  );
}

export default Owndetails;
