import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const PeopleToFollow = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const { user } = useContext(UserContext);
  
  function difference(superset, subset) {
    const subsetIds = subset.map(item => item.to);
    return superset.filter((item) => !subsetIds.includes(item.id));
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users", { withCredentials: true })
      .then((response) => {
        setUsersToFollow(difference(response.data.data.docs, user.following));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const handleFollowUser = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/user/${userId}/follow`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.status === "success") {
        console.log(`User with ID ${userId} followed successfully`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">People to Follow</h2>
        <div className="flex flex-col gap-3">
            {usersToFollow.map((user) => (
            <div key={user.id} className="flex items-center">
                <img
                src={`http://localhost:5000/img/users/${user.photo}`}
                alt={user.name}
                className="w-9 h-9 rounded-full mr-2"
                />
                <span className="mr-auto text-base">{user.name}</span>
                <button 
                    className=" text-blue-500 font-bold py-0.5 px-1 text-xs rounded ml-5"
                    onClick={() => handleFollowUser(user.id)}
                >
                    Follow
                </button>
            </div>
            ))}
        </div>
    </div>
  );
};

export default PeopleToFollow;
