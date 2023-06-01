import React, { useState, useRef } from "react";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";

const CreatePost = () => {
  const comment = useRef();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleChoosePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('caption', comment);
      formData.append('photo', selectedPhoto);

      const response = await axios.post('http://localhost:5000/api/v1/posts', formData, {
        withCredentials: true,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-2xl my-4">
      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
      <div className="flex-1">
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 resize-none overflow-y-hidden"
          style={{ wordWrap: "break-word" }}
          placeholder="Write a comment..."
          ref={comment}
        ></textarea>
        {selectedPhoto && (
          <div className="relative mt-2">
            <img
              className="max-h-64 object-contain rounded-lg"
              src={selectedPhoto}
              alt="Selected"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700"
              onClick={handleRemovePhoto}
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex justify-end mt-2 gap-2">
          <label className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            <PhotographIcon className="w-6 h-6" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChoosePhoto}
            />
          </label>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
