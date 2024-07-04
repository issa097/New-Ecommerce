import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert";
import Cookies from "js-cookie";

const BlogForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [image, setImage] = useState(null);

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setBlogTitle(value);
    } else if (name === "content") {
      setBlogContent(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const formData = new FormData();
  formData.append("title", blogTitle);
  formData.append("content", blogContent);
  formData.append("image", image);
  console.log(formData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`


      await axios.post("http://localhost:8000/newblog", formData);

      setBlogTitle("");
      setBlogContent("");
      setImage(null);
      setIsFormVisible(false);
      showAlert("Done", "success");
    } catch (error) {
      showAlert("You Need To login First!", "error");
      // console.error('Error submitting blog:', error);
    }
  };

  const showAlert = (message, icon) => {
    // alert(message, icon);
    Swal({
      title: icon === "success" ? "Success" : "Error",
      text: message,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      <button
        onClick={handleToggleForm}
        className="fixed bottom-8 right-8 bg-[#C08261] p-3 text-white rounded-full"
      >
        {isFormVisible ? "Close Form" : <FaPlus size={20} />}
      </button>
      {isFormVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Blog Form</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4 w-[45rem]">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-[#C08261]"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={blogTitle}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-[#C08261]"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={blogContent}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-[#C08261]"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#C08261] text-white p-2 rounded-md mt-6"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogForm;
