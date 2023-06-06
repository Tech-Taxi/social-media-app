import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import Navbar from "./Navbar";
import CreatePost from "./CreatePost";
import { UserContext } from "../contexts/UserContext";
import Register from "./Register";
import axios from "axios";
import Connections from "./Connections";
import Owndetails from "./OwnDetails";
import { PostContext } from "../contexts/PostContext";

import { BACKEND_URI } from "../config";

function Home() {
  const [user, setUser] = useState();
  const [d, toggleD] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      async function () {
        if (
          localStorage.theme === "light" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("light");
        } else {
          document.documentElement.classList.remove("light");
        }

        try {
          console.log("Inside HOME")
          const res = axios.get(`${BACKEND_URI}/api/v1/posts`, {
            withCredentials: true,
          });

          const resPosts = await res;
          console.log(res);
          setPosts(resPosts.data.data.posts);
          setLoading(false);

          console.log(resPosts.data.data.posts)

          const data = axios.get(`${BACKEND_URI}/api/v1/users/me`, {
            withCredentials: true,
          });

          const dataUser = await data;
          setLoading(false);
          setUser(dataUser.data.data);

          console.log(dataUser.data.data)
        } catch (err) {
          console.log(err.response);
          setLoading(false);
        }
      },
    []
  );

  return (
    <div className="dark:bg-slate-700 min-h-screen ">
      <PostContext.Provider value={{ posts, setPosts, loading }}>
        <UserContext.Provider value={{ user, setUser, d, toggleD }}>
          
          {d && <Register />}
          <>
            {!loading && (
              <div className="w-full fixed top-0 left-0 border-b-2 border-blue-400">
                <Navbar />
              </div>
            )}
            <div className={`flex ${loading ? "mt-0" : "mt-14"}`}>
              <div className="w-1/3 md:block hidden">
                <Owndetails />
              </div>
              <div className="md:w-1/3 w-full px-4">
                {user && <CreatePost />}
                <Feed />
              </div>
              <div className="w-1/3 md:block hidden">
                <Connections />
              </div>
            </div>
          </>
        </UserContext.Provider>
      </PostContext.Provider>
    </div>
  );
}

export default Home;
