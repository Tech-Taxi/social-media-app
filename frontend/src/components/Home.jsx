import React from "react";
import Feed from "./Feed.jsx";
import axios from "axios";

const isLoggedIn = () => {
  axios
    .get("http://localhost:5000/api/v1/users/isLoggedIn")
    .then((res) => console.log("Logged in"));
};

function Home() {
  isLoggedIn();
  return (
    <div className="flex m-4">
      <div className="w-1/3 bg--200"></div>
      <div className="w-1/3">
        <Feed />
      </div>
      <div className="w-1/3 bg--200"></div>
    </div>
  );
}

export default Home;
