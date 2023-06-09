import React, { useState, useEffect, useContext } from "react";
import {
  HeartIcon as HeartOutline,
  ChatIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import axios from "axios";
import CommentsModal from "./CommentsModal";

import { UserContext } from "../contexts/UserContext";
import { PostContext } from "../contexts/PostContext";

import { BACKEND_URI } from "../config";

function Post(props) {
  const [showModal, setShowModal] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [typedComment, setTypedComment] = useState("");
  const [isLiked, setLiked] = useState(false);

  const { user } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    if (user) {
      if (props.likes) setLiked(props.likes.includes(user.id));
      else setLiked(false);
    }
  }, [user, props.likes]);


  const handleCommentBox = (e) => {
    setTypedComment(e.target.value);
  };

  const handleToggleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const truncatedCaption =
    props.caption.length > 70
      ? props.caption.substring(0, 70) + "... "
      : props.caption;

  const handleLike = () => {
    axios
      .post(
        `${BACKEND_URI}/api/v1/posts/${props.id}/like`,
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
      })
      .catch((err) => alert(err.response.data.message));
  };

  const postComment = () => {
    if (typedComment === null || typedComment === "") {
    } else {
      axios
        .post(
          `${BACKEND_URI}/api/v1/posts/${props.id}/comment`,
          {
            content: typedComment,
          },
          { withCredentials: true }
        )
        .then((response) => {
          alert("You've commented successfully 🥳");
          setPosts(() =>
            posts.map((post) =>
              post.id === response.data.data.post.id
                ? response.data.data.post
                : post
            )
          );
          setTypedComment("");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="bg-white shadow-2xl overflow-hidden rounded-xl mb-4 dark:bg-slate-800 dark:text-white mt-4">
      <div className="p-3">
        <div className="flex items-center">
          <img
            src={`${BACKEND_URI}/img/users/${props.authorimg}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{props.author}</p>
            <p className="text-xs text-gray-500 text-left dark:text-gray-300">{props.age}</p>
          </div>
        </div>
        <div className="mx-1 my-2">
          <p className="text-gray-700 text-left dark:text-gray-100">
            {showFullCaption ? props.caption : truncatedCaption}
            {props.caption.length > 70 && (
              <button
                className="text-gray-800 hover:text-blue-700 font-medium ml-1"
                onClick={handleToggleCaption}
              >
                {showFullCaption ? "Read less" : "Read more"}
              </button>
            )}
          </p>
        </div>
        {props.photo !== "null" && (
          <img
            src={`${BACKEND_URI}/img/posts/${props.photo}`}
            alt=""
            className="w-full object-cover"
          />
        )}
        <div className="mt-3 flex justify-between gap-2">
          <div>{props.likes ? props.likes.length : props.likeCount} Likes</div>
          <div className="cursor-pointer">{props.comments} Comments</div>
        </div>
        <div className="mt-3 flex gap-5">
          <div className="flex gap-2 flex-start items-center w-16">
            {isLiked ? (
              <HeartSolid
                className="w-6 h-6 text-red-700 cursor-pointer dark:text-gray-100"
                onClick={handleLike}
              />
            ) : (
              <HeartOutline
                className="w-6 h-6 text-gray-700 cursor-pointer dark:text-gray-100"
                onClick={handleLike}
              />
            )}

            <ChatIcon
              className="w-6 h-6 text-gray-700 cursor-pointer dark:text-gray-100"
              onClick={openModal}
            />
            {showModal && (
              <CommentsModal
                id={props.id}
                isOpen={showModal}
                onRequestClose={closeModal}
              />
            )}
          </div>
          <div className="flex w-[calc(100%-5rem)] gap-3 items-center justify-between">
            <input
              type="text"
              className="w-64 h-6 rounded-full px-2 my-0 py-3 border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white"
              placeholder="Enter text"
              value={typedComment}
              onChange={handleCommentBox}
            />
            <ArrowSmRightIcon
              className="w-6 h-6 text-gray-700 cursor-pointer dark:text-gray-100"
              onClick={postComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
