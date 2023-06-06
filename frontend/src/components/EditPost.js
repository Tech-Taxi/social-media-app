import React, {useState} from 'react'
import axios from 'axios';

function EditPost({post, onClose}) {
  const [formData, setFormData] = useState({
    caption: post.caption,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:5000/api/v1/posts/update/${post.id}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        post = {
          ...post,
          caption: response.data.data.caption,
        };
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-600 w-full md:mx-0 mx-5 max-w-md mx-auto rounded-lg overflow-hidden transform transition-transform ease-in-out duration-300">
        <div className="p-4 bg-blue-500 text-white">
          <h2 className="text-xl font-semibold">Edit Caption</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Caption
              </label>
              <input
                type="text"
                id="name"
                name="caption"
                className="w-full p-2 border border-gray-300 rounded dark:bg-slate-600 dark:text-white"
                value={formData.caption}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPost