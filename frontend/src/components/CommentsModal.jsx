import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import axios from "axios";

function CommentsModal({ photo, likes, comments, showModal, setRequestClose }) {
  const [isOpen, setIsOpen] = useState(showModal);
  const [allComments, setAllComments] = useState([]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const updatedComments = [];
      for (const comment of comments) {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/user/${comment.author}`
        );
        const author = response.data.data.name;
        updatedComments.push({
          ...comment,
          author,
        });
      }
      setAllComments(updatedComments);
    };
    fetchComments();
  }, [comments]);

//   if (!isOpen) {
//     return null;
//   } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            {/* Left Side - Post Image */}
            <div className="p-4 h-full">
              <img
                src={`http://localhost:5000/img/posts/${photo}`}
                alt="Post"
                className="w-full my-auto h-auto"
              />
            </div>

            {/* Right Side - Comments, Like, Comment Box, Post Button */}
            <div className="p-4">
              <div className="overflow-y-auto h-60">
                {allComments.map((comment, index) => (
                  <div key={index} className="flex mb-2">
                    <span className="font-semibold mr-2">{comment.author}</span>
                    <span>{comment.content}</span>
                  </div>
                ))}
              </div>

              {/* Like Button */}
              <div className="flex items-center mb-4">
                <HeartIcon className="text-2xl mr-2 w-6 h-6 cursor-pointer" />
                <span className="font-semibold">{likes.length}</span>
              </div>

              {/* Comment Text Box */}
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                />
                <button className="bg-blue-500 text-white px-4 rounded-r">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
// }

export default CommentsModal;
