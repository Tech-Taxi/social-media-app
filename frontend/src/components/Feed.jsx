import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/posts", { withCredentials: true })
      .then((response) => {
        setPosts(response.data.data.posts);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
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
        />
      ))}
    </div>
  );
}

export default Feed;
