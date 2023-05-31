import React, { useState, useEffect } from "react";
import user from "../images/user.jpg";
import postImage from "../images/postImage.jpg";
import {
  HeartIcon,
  ChatIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import CommentsModal from "./CommentsModal";

function Post(props) {
  const [showModal, setShowModal] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [image, setImage] = useState("");

  const [typedComment, setTypedComment] = useState("");

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
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/v1/posts/${props.id}`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       setLikes(response.data.data.likes);
  //       setComments(response.data.data.comments);
  //       setAuthor(response.data.data.author.name);
  //       setCaptionText(response.data.data.caption);
  //       setImage(response.data.data.photo);
  //     });
  // }, [props]);

  const truncatedCaption =
    captionText.length > 30
      ? captionText.substring(0, 30) + "..."
      : captionText;
  const handleLike = () => {};
  const postComment = () => {
    if (typedComment === null || typedComment === "") {
    } else {
      axios
        .post(
          `http://localhost:5000/api/v1/posts/${props.id}/comments`,
          {
            content: typedComment,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="bg-white shadow-2xl overflow-hidden rounded-xl mb-4">
      <div className="p-3">
        <div className="flex items-center">
          <img
            src={user}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-gray-800">{author}</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
        <div className="mx-1 my-2">
          <p className="text-gray-700 text-left">
            {showFullCaption ? captionText : truncatedCaption}
            {captionText.length > 30 && (
              <button
                className="text-gray-800 hover:text-blue-700 font-medium"
                onClick={handleToggleCaption}
              >
                {showFullCaption ? " Read less" : " Read more"}
              </button>
            )}
          </p>
        </div>
        <img
          src={image ? `http://localhost:5000/img/posts/${image}` : postImage}
          alt="Post"
          className="w-full object-cover"
        />
        <div className="mt-3 flex justify-between gap-2">
          <div>{likes.length} Likes</div>
          <div className="cursor-pointer">{comments.length} Comments</div>
        </div>
        <div className="mt-3 flex justify-between gap-2">
          <div className="flex gap-2">
            <HeartIcon
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={handleLike}
            />
            <ChatIcon
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={openModal}
            />
            {showModal && (
              <CommentsModal
                photo={image}
                likes={likes}
                comments={comments}
                isOpen={showModal}
                onRequestClose={closeModal}
              />
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-64 h-6 rounded-full px-2 my-0 py-0 border border-gray-300 focus:outline-none focus:border-blue-500"
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
