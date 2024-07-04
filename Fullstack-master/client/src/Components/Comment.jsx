

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert";
import Cookies from "js-cookie";

const CommentSection = ({ product_id }) => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userid, setuserid] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState({});

  const loggedInUserId = 71; // Replace with the actual user ID of the logged-in user

  const fetchComments = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/gitRatings/${id}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchCommentss = async () => {
    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

    try {
      const response = await axios.post(`http://localhost:8000/decode`)
      setuserid(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchComments(id);
    fetchCommentss();
  }, []);

  const handleAddComment = () => {
    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`


    const dataapi = {
      comment: newComment.text,
      product_id: id,
      rating: rating,
    };

    axios
      .post("http://localhost:8000/addRating", dataapi)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment({ user: "", text: "" });

        Swal({
          icon: "success",
          title: "Comment Added!",
          text: "Your comment has been successfully added.",
        });
      })
      .catch((error) => {
        Swal({
          icon: "error",
          title: "Comment not Added!",
          text: "User has not purchased the product.",
        });
      });
  };

  const activateEditMode = (comment) => {
    setIsEditing(true);
    setEditedComment(comment);
  };

  const cancelEditMode = () => {
    setIsEditing(false);
    setEditedComment({});
  };

  const handleUpdateComment = () => {
    axios
      .put(`http://localhost:8000/updates/${editedComment.rating_id}`, {
        comment: editedComment.comment,
      })
      .then((response) => {
        Swal({
          icon: "success",
          title: "Comment Updated!",
          text: "Your comment has been successfully updated.",
        });

        fetchComments(id);
        cancelEditMode();
      })
      .catch((error) => {
        Swal({
          icon: "error",
          title: "Comment not Updated!",
          text: "Error updating the comment.",
        });
      });
  };

  const handleDeleteComment = (rating_id) => {
    axios
      .put(`http://localhost:8000/SoftDeletes/${rating_id}`)
      .then((response) => {
        Swal({
          icon: "success",
          title: "Comment Deleted!",
          text: "Your comment has been successfully deleted.",
        });
        fetchComments(id);
      })
      .catch((error) => {
        Swal({
          icon: "error",
          title: "Comment not Deleted!",
          text: "Error deleting the comment.",
        });
      });
  };

  return (
    <div>
      <div className="max-w-md mx-7">
        {/* <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-600"
          >
            User:
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={newComment.user_id}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-600"
          >
            Comment:
          </label>
          <textarea
            id="text"
            name="text"
            value={newComment.comment}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">Rating:</span>
          {[1, 2, 3, 4, 5].map((rate) => (
            <div
              key={rate}
              className={`cursor-pointer text-2xl ${rating >= rate ? "text-yellow-500" : "text-gray-300"
                }`}
              onClick={() => setRating(rate)}
            >
              ★
            </div>
          ))}
        </div>

        <button
          onClick={handleAddComment}
          className="bg-[#C08261] text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Add Comment
        </button>
      </div>

      {comments && (
        <ul className="list-disc pl-6 mt-4">
          {comments.map((comment) => (
            <li
              key={comment.rating_id}
              className="mb-4 p-4 border border-gray-300 rounded"
            >
              <div className="flex items-center mb-2">
                <strong className="text-blue-500">{comment.username}</strong>:
                <span className="ml-2 text-yellow-500">{comment.comment}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <CiStar
                    key={rate}
                    className={`cursor-pointer ${comment.rating >= rate
                      ? "text-yellow-500"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              {userid && comment.user_id === userid.user_id && (
                <>
                  {/* الأزرار للتعديل والحذف */}
                  {isEditing &&
                    comment.rating_id === editedComment.rating_id ? (
                    <div className="mt-2">
                      <textarea
                        value={editedComment.comment}
                        onChange={(e) =>
                          setEditedComment({
                            ...editedComment,
                            comment: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <div className="mt-2">
                        <button
                          onClick={() => handleUpdateComment(editedComment)}
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={cancelEditMode}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-end justify-end ">
                      <button
                        onClick={() => activateEditMode(comment)}
                        className="bg-[#C08261]  text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.rating_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
