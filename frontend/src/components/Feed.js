import React, { useContext } from "react";
import Post from "./Post";
import { PostContext } from "../contexts/PostContext";

function Feed() {
  const { posts, loading } = useContext(PostContext);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-600 rounded-full animate-bounce dark:bg-gray-100"></div>
            <div className="w-6 h-6 bg-gray-600 rounded-full animate-bounce dark:bg-gray-100" style={{animationDelay: "75ms"}}></div>
            <div className="w-6 h-6 bg-gray-600 rounded-full animate-bounce  dark:bg-gray-100" style={{animationDelay: "150ms"}}></div>
          </div>
        </div>
      ) : (
        posts &&
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
