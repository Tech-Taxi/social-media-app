import React, { useState } from "react";
import user from "../images/user.jpg";
import postImage from "../images/postImage.jpg";
import { HeartIcon, ChatIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

function Post() {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const handleToggleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };
  const captionText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at nisi ac orci fermentum fermentum. Sed eget tristique risus. Integer tristique dolor sed vehicula vestibulum.";
  const truncatedCaption =
    captionText.length > 30
      ? captionText.substring(0, 30) + "..."
      : captionText;
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
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">5 hours ago</p>
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
          src={postImage} // "https://placeimg.com/640/640/nature"
          alt="Post"
          className="w-full object-cover"
        />
        <div className="mt-3 flex justify-between gap-2">
            <div className="flex gap-2">
                <HeartIcon className="w-6 h-6 text-gray-700" />
                <ChatIcon className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex gap-2">
                <input
                type="text"
                className="w-64 h-6 rounded-full px-2 my-0 py-0 border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter text"
                />
                <ArrowSmRightIcon className="w-6 h-6 text-gray-700" />
            </div>
      </div>
      </div>
    </div>
  );
}

export default Post;
