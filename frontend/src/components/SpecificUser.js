
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config";

function User() {
  const loc=window.location.href
  const user_id = loc.substring(loc.lastIndexOf('/')+1);
  const [user, setUser] = useState();
  useEffect(
    () =>
      async function () {
        try {
          const data = axios.get(`${BACKEND_URI}/api/v1/users/user/${user_id}`, {
            withCredentials: true,
          });
          const dataUser = await data;
          setUser(dataUser.data.data);
        } catch (err) {
          console.log(err.response);
        }
      },
    [user_id]
  );


  return (
    user && (
      <div className="dark:bg-slate-700 -mt-4 py-5 dark:text-white">
        <div className="relative flex flex-col items-center md:mx-16 mx-6 my-4 px-5 py-4 bg-white rounded-lg shadow-xl dark:bg-slate-800">
          <div className="relative group">
            <img
              src={`${BACKEND_URI}/img/users/${user.photo}`}
              alt={user.name}
              className="w-48 h-48 rounded-full object-cover cursor-pointer"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <div className="flex mt-2">
            <div className="flex items-center mr-4">
              <span className="font-semibold">{user.followers.length}</span>
              <span className="dark:text-gray-300 text-gray-500 ml-1">Followers</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">{user.following.length}</span>
              <span className="dark:text-gray-300 text-gray-500 ml-1">Following</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-start">
              <span className="dark:text-gray-300 text-gray-500 mr-2">Bio:</span>
              <span className="flex-1 text-left">{user.bio}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="dark:text-gray-300 text-gray-500 mr-2">Email:</span>
              <span className="flex-1 text-left">{user.email}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="dark:text-gray-300 text-gray-500 mr-2">Gender:</span>
              <span className="flex-1 text-left">{user.gender}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="dark:text-gray-300 text-gray-500 mr-2">Age:</span>
              <span className="flex-1 text-left">{user.age}</span>
            </div>
            <div className="flex items-start mt-2">
              <span className="dark:text-gray-300 text-gray-500 mr-2">Total Posts:</span>
              <span className="flex-1 text-left">{user.posts.length}</span>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col items-center md:mx-16 mx-6 my-4 px-5 py-4 bg-white rounded-lg shadow-xl dark:bg-slate-800">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8 pb-5">
            {user.posts.map((post) => (
              <div
                key={post.id}
                className="relative overflow-hidden rounded-lg cursor-pointer flex items-center justify-center"
              >
                {post.photo !== "null"?<img
                  src={`${BACKEND_URI}/img/posts/${post.photo}`}
                  alt="Post"
                  className="w-full h-full"
                />:<p className="text-3xl">{post.caption}</p>}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 bg-black bg-opacity-50 hover:opacity-100">
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
