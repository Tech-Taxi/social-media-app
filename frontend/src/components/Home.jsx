import React, { useEffect, useState } from "react";
import Feed from "./Feed.jsx";
import Navbar from "./Navbar.jsx";
import CreatePost from "./CreatePost.jsx";
import { UserContext } from "../contexts/UserContext.js";
import Register from "./Register.jsx";
import axios from "axios";
import Connections from "./Connections.jsx";

function Home() {
  const [user, setUser] = useState();
  const [d, toggleD] = useState(false);

  useEffect(
    () =>
      async function () {
        try {
          const data = await axios.get(
            `http://localhost:5000/api/v1/users/me`,
            {
              withCredentials: true,
            }
          );
          setUser(data.data.data);
        } catch (err) {
          // console.log(err.response.data.message)
        }
      },
    []
  );
  return (
    <div className="mx-4 my-2">
      <UserContext.Provider value={{ user, setUser, d, toggleD }}>
        {d && <Register />}
        <>
          <div className="w-full fixed top-0 z-50 border-b-2 border-blue-400">
            <Navbar />
          </div>
          <div className="flex mt-16">
            <div className="w-1/3"></div>
            <div className="w-1/3">
              {user && <CreatePost />}
              <Feed />
            </div>
            <div className="w-1/3">
              <Connections />
            </div>
          </div>
        </>
      </UserContext.Provider>
    </div>
  );
}

export default Home;
