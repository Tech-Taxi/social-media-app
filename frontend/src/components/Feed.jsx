import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/posts", { withCredentials: true })
      .then((response) => {
        setPosts(response.data.data.posts);
        console.log(response.data.data.posts)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-600 rounded-full animate-bounce"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-full animate-bounce200"></div>
          <div className="w-6 h-6 bg-gray-600 rounded-full animate-bounce400"></div>
        </div>
        {/* <div className="ml-2 text-gray-600">Loading...</div> */}
      </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorimg={post.author.photo}
            authorid={post.author.id}
            age={post.age}
            caption={post.caption}
            photo={post.photo}
            likes={post.likes}
            comments={post.commentCount}
          />
        ))
      )}
    </div>
  );
}

export default Feed;
