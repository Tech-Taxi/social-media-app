import React, { useState, useEffect, useContext } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid, XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { PostContext } from "../contexts/PostContext";

function CommentsModal({ id, isOpen, onRequestClose }) {
  const [postDetails, setPostDetails] = useState(null);
  const [typedComment, setTypedComment] = useState("");
  const [isLiked, setLiked] = useState(false);

  const {setPosts, posts} = useContext(PostContext)

  const closeModal = () => {
    onRequestClose();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/posts/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setPostDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const handleCommentBox = (e) => {
    setTypedComment(e.target.value);
  };

  const handleLike = () => {
    axios
      .post(
        `http://localhost:5000/api/v1/posts/${id}/like`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        setLiked(() => !isLiked);
        setPosts(() =>
          posts.map((post) =>
            post.id === response.data.data.post.id
              ? response.data.data.post
              : post
          )
        );
        setPostDetails(response.data.data.post);
      })
      .catch((err) => alert(err.response.data.message));
  };

  const postComment = () => {
    if (typedComment === null || typedComment === "") {
    } else {
      axios
        .post(
          `http://localhost:5000/api/v1/posts/${id}/comment`,
          {
            content: typedComment,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setPosts(() =>
            posts.map((post) =>
              post.id === response.data.data.post.id
                ? response.data.data.post
                : post
            )
          );
          setPostDetails(response.data.data.post);
          setTypedComment("");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  if (!postDetails) {
    return null;
  } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="p-4 h-full">
              {postDetails.photo !== "null" ? (
                <>
                  <img
                    src={`http://localhost:5000/img/posts/${postDetails.photo}`}
                    alt="Post"
                    className="w-full my-auto h-auto"
                  />

                  <p className="text-md mt-1 text-left">
                    {postDetails.caption}
                  </p>
                </>
              ) : (
                <div className="h-full flex items-center">
                  <p className="text-xl">{postDetails.caption}</p>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-end">
                <XIcon
                  className="cursor-pointer w-6 h-6"
                  onClick={closeModal}
                />
              </div>
              <div className="overflow-y-auto h-60">
                {postDetails.commentCount > 0 ? (
                  postDetails.comments.map((comment, index) => {
                    return (
                      <div key={index} className="flex mb-2 items-center">
                        <img
                          src={`http://localhost:5000/img/users/${comment.author.photo}`}
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex flex-col text-left">
                          <span className="font-semibold">
                            {comment.author.name}
                          </span>
                          <span className="">{comment.content}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <span className="fs-xl">This post has no comments 🥺</span>
                )}
              </div>

              <div className="flex justify-between mr-2">
                {isLiked ? (
                  <div className="flex items-center mb-4">
                    <HeartSolid
                      className="w-6 h-6 mr-1 text-red-700 cursor-pointer"
                      onClick={handleLike}
                    />
                    <span className="font-semibold">
                      {postDetails.likeCount}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center mb-4">
                    <HeartOutline
                      className="w-6 h-6 mr-1 text-gray-700 cursor-pointer"
                      onClick={handleLike}
                    />
                    <span className="font-semibold">
                      {postDetails.likeCount}
                    </span>
                  </div>
                )}
                <div className="cursor-pointer">
                  {postDetails.commentCount} Comments
                </div>
              </div>

              <div className="flex mb-4 gap-2">
                <input
                  type="text"
                  placeholder="Add a comment ..."
                  className="flex-1 p-2 border border-gray-300 rounded-full"
                  value={typedComment}
                  onChange={handleCommentBox}
                />
                <button
                  className="bg-blue-500 text-white px-4 rounded-full hover:bg-blue-600"
                  onClick={postComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentsModal;
