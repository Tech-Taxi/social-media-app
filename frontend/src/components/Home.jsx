import React, { useContext, useEffect, useState } from "react";
import Feed from "./Feed.jsx";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import CreatePost from "./CreatePost.jsx";

// const isLoggedIn = () => {
//   axios
//     .get("http://localhost:5000/api/v1/users/isLoggedIn")
//     .then((res) => console.log("Logged in"));
// };

function Home() {
  const [user, setUser] = useState(null);
  // useEffect(() => isLoggedIn, []);

  return (
    <div className="mx-4 my-2">
      <div className="w-full fixed top-0 z-50 border-b-2 border-blue-400">
        <Navbar />
      </div>
      <div className="flex mt-16">
        <div className="w-1/3">

        </div>
        <div className="w-1/3">
          <CreatePost />
          <Feed />
        </div>
        <div className="w-1/3">
          
        </div>
      </div>
    </div>
  );
}

export default Home;
