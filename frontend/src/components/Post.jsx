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

function Post(props) {
  const [showModal, setShowModal] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [typedComment, setTypedComment] = useState("");
  const [isLiked, setLiked] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      if (props.likes) setLiked(props.likes.includes(user.id));
      else setLiked(false);
    }
  }, [user]);

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
        `http://localhost:5000/api/v1/posts/${props.id}/like`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setLiked(() => !isLiked);
      })
      .catch((err) => alert(err.response.data.message));
  };

  const postComment = () => {
    if (typedComment === null || typedComment === "") {
    } else {
      axios
        .post(
          `http://localhost:5000/api/v1/posts/${props.id}/comment`,
          {
            content: typedComment,
          },
          { withCredentials: true }
        )
        .then((response) => {
          alert("You've commented successfully 🥳");
          console.log(response.data);
          setTypedComment("");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="bg-white shadow-2xl overflow-hidden rounded-xl mb-4">
      <div className="p-3">
        <div className="flex items-center">
          <img
            src={`http://localhost:5000/img/users/${props.authorimg}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-gray-800">{props.author}</p>
            <p className="text-xs text-gray-500 text-left">{props.age}</p>
          </div>
        </div>
        <div className="mx-1 my-2">
          <p className="text-gray-700 text-left">
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
            src={`http://localhost:5000/img/posts/${props.photo}`}
            alt=""
            className="w-full object-cover"
          />
        )}
        <div className="mt-3 flex justify-between gap-2">
          <div>{props.likes ? props.likes.length : props.likeCount} Likes</div>
          <div className="cursor-pointer">{props.comments} Comments</div>
        </div>
        <div className="mt-3 flex gap-5">
          <div className="flex gap-2 flex-start items-center">
            {isLiked ? (
              <HeartSolid
                className="w-6 h-6 text-red-700 cursor-pointer"
                onClick={handleLike}
              />
            ) : (
              <HeartOutline
                className="w-6 h-6 text-gray-700 cursor-pointer"
                onClick={handleLike}
              />
            )}

            <ChatIcon
              className="w-6 h-6 text-gray-700 cursor-pointer"
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
          <div className="flex w-full items-center justify-between">
            <input
              type="text"
              className="w-64 h-6 rounded-full px-2 my-0 py-3 border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter text"
              value={typedComment}
              onChange={handleCommentBox}
            />
            <ArrowSmRightIcon
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={postComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
