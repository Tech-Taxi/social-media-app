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

function Home() {
  const [user, setUser] = useState();
  const [d, toggleD] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      async function () {
        try {
          const res = await axios.get("http://localhost:5000/api/v1/posts", {
            withCredentials: true,
          });
          setPosts(res.data.data.posts);
          setLoading(false);
        } catch (err) {
          alert(err.response.data.message);
          setLoading(false);
        }
        try{
          const data = await axios.get(
            `http://localhost:5000/api/v1/users/me`,
            {
              withCredentials: true,
            }
          );
          setUser(data.data.data);
        } catch (err) {
          // alert(err.response.data.message);
        }
      },
    []
  );
  return (
    <div className="mx-4 my-2">
      <PostContext.Provider value={{ posts, setPosts, loading }}>
        <UserContext.Provider value={{ user, setUser, d, toggleD }}>
          {d && <Register />}
          <>
            <div className="w-full fixed top-0 z-50 border-b-2 border-blue-400">
              <Navbar />
            </div>
            <div className="flex mt-16">
              <div className="w-1/3">
                <Owndetails />
              </div>
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
      </PostContext.Provider>
    </div>
  );
}

export default Home;
