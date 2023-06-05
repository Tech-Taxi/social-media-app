import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, CameraIcon, TrashIcon } from "@heroicons/react/outline";
import EditModal from "./EditModal";

function User() {
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(
    () =>
      async function () {
        try {
          const data = axios.get(`http://localhost:5000/api/v1/users/me`, {
            withCredentials: true,
          });
          const dataUser = await data;
          setUser(dataUser.data.data);
        } catch (err) {
          console.log(err.response);
        }
      },
    []
  );

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
            .patch("http://localhost:5000/api/v1/users/updateMe", formData, {
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
      <div className="">
        <div className="relative flex flex-col items-center mx-16 my-4 px-5 py-4 bg-white rounded-lg shadow-xl">
          <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
            <PencilIcon
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={handleEditClick}
            />
          </div>
          <div className="relative group">
            <img
              src={`http://localhost:5000/img/users/${user.photo}`}
              alt={user.name}
              className="w-48 h-48 rounded-full object-cover cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <CameraIcon
                className="w-6 h-6 text-white bg-blue-500 rounded-full p-1"
                onClick={handleChangePhoto}
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <div className="flex mt-2">
            <div className="flex items-center mr-4">
              <span className="font-semibold">{user.followers.length}</span>
              <span className="text-gray-500 ml-1">Followers</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">{user.following.length}</span>
              <span className="text-gray-500 ml-1">Following</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-start">
              <span className="text-gray-500 mr-2">Bio:</span>
              <span className="flex-1 text-left">{user.bio}</span>
              {/* <PencilIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
            </div>
            <div className="flex items-start mt-2">
              <span className="text-gray-500 mr-2">Email:</span>
              <span className="flex-1 text-left">{user.email}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="text-gray-500 mr-2">Gender:</span>
              <span className="flex-1 text-left">{user.gender}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="text-gray-500 mr-2">Age:</span>
              <span className="flex-1 text-left">{user.age}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="text-gray-500 mr-2">Total Posts:</span>
              <span className="flex-1 text-left">{user.posts.length}</span>
            </div>
          </div>
          {isModalOpen && (
            <EditModal
              user={user}
              setUser={setUser}
              onClose={handleCloseModal}
            />
          )}
        </div>
        <div className="relative flex flex-col items-center mx-16 my-4 px-5 py-4 bg-white rounded-lg shadow-xl">
          <div className="grid grid-cols-3 gap-4 mt-8">
            {user.posts.map((post) => (
              <div
                key={post.id}
                className="relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={`http://localhost:5000/img/posts/${post.photo}`}
                  alt="Post"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 bg-black bg-opacity-50 hover:opacity-100">
                  <div className="flex items-center space-x-2">
                    <PencilIcon className="w-6 h-6 text-gray-100 cursor-pointer" />
                    <TrashIcon className="w-6 h-6 text-gray-100 cursor-pointer"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default User;