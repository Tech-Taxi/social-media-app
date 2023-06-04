import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, CameraIcon } from "@heroicons/react/outline";

function Owndetails() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users/me", { withCredentials: true })
      .then((response) => {
        setUserDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!userDetails) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center mx-16 my-4 px-0 py-4 bg-white rounded-lg shadow-xl">
      <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
        <PencilIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
      </div>
      <div className="relative group">
        <img
          src={`http://localhost:5000/img/users/${userDetails.photo}`}
          alt={userDetails.name}
          className="w-24 h-24 rounded-full object-cover cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <CameraIcon className="w-6 h-6 text-white bg-blue-500 rounded-full p-1" />
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-4">{userDetails.name}</h2>
      <div className="flex mt-2">
        <div className="flex items-center mr-4">
          <span className="font-semibold">{userDetails.followers.length}</span>
          <span className="text-gray-500 ml-1">Followers</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold">{userDetails.following.length}</span>
          <span className="text-gray-500 ml-1">Following</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Bio:</span>
          <span className="flex-1 text-left">{userDetails.bio}</span>
          {/* <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">Email:</span>
          <span className="flex-1 text-left">{userDetails.email}</span>
          {/* <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">Age:</span>
          <span className="flex-1 text-left">{userDetails.age}</span>
          {/* <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">Total Posts:</span>
          <span className="flex-1 text-left">{userDetails.posts.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Owndetails;
