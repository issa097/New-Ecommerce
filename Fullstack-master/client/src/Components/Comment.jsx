

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert";
import Cookies from "js-cookie";

const CommentSection = ({ product_id }) => {
  const { id } = useParams();
  console.log(id)
  const [comments, setComments] = useState([]);
  console.log(comments)
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userid, setuserid] = useState();
  const [repliess, setreplies] = useState();
  console.log(repliess)
  const [formData, setformData] = useState({

    replay_text: ""


  });
  console.log(formData)
  // console.log(formData)
  console.log(userid)
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState({});
  console.log(editedComment)
  const loggedInUserId = 71; // Replace with the actual user ID of the logged-in user
  // const repaly = async (rating_id) => {
  //   axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

  //   const response = await axios.post(
  //     `http://localhost:8000/replay`, {

  //     product_id: id,
  //     rating_id: rating_id,
  //     ...formData

  //   }
  //   );
  //   console.log(response.data)
  // }


  const handleInputChanges = (e) => {
    setformData({
      ...formData, replay_text: e.target.value

    });
  };
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
  const Token = Cookies.get("Token")
  const fetchCommentss = async () => {

    try {
      const response = await axios.post(`http://localhost:8000/decode`, {
        Token
      })
      console.log("oekdoekdoekdoekdoedS", response)
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
    fetchCommentss()
    get()
  }, []);

  const handleAddComment = () => {
    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`


    const dataapi = {
      comment: newComment.comment,
      product_id: id,
      rating: rating,
    };

    axios
      .post("http://localhost:8000/addRating", dataapi)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment({ user: "", text: "" });
        fetchCommentss();

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


  const get = async () => {
    const response = await axios.get('http://localhost:8000/replayget')
    const replies = response.data.result
    setreplies(replies)

  }
  const handleUpdateComments = (rating_id) => {

    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

    axios
      .post(`http://localhost:8000/replay`, { replay_text: formData.replay_text, rating_id })
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
    <div className="max-w-4xl mx-auto">
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Comments</h2>

        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-600">
            Your Comment:
          </label>
          <textarea
            id="text"
            name="comment"
            value={newComment.comment}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2 font-medium">Rating:</span>
          {[1, 2, 3, 4, 5].map((rate) => (
            <CiStar
              key={rate}
              className={`text-2xl cursor-pointer ${rating >= rate ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(rate)}
            />
          ))}
        </div>

        <button
          onClick={handleAddComment}
          className="bg-[#C08261] text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Add Comment
        </button>

        {comments.length > 0 && (
          <ul className="mt-8 space-y-4">
            {comments.map((comment) => (
              <li key={comment.rating_id} className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={comment.user_img}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{comment.username}</p>
                    <p className="text-sm text-gray-500">{comment.created_at}</p>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <CiStar
                      key={rate}
                      className={`text-xl cursor-pointer ${comment.rating >= rate ? "text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                  <p className="text-sm font-semibold text-gray-900 ml-2">Customer Review</p>
                </div>

                <p className="text-gray-700 mb-2">{comment.comment}</p>
                {repliess && repliess.map((reply) => (
                  reply.rating_id === comment.rating_id && (
                    <p key={reply.replay_id} className="text-gray-800">{reply.replay_text}</p>
                  )
                ))}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateComments(comment.rating_id);
                  }}
                  className="mt-4"
                >
                  <input
                    type="text"
                    name="replay_text"
                    value={formData.replay_text}
                    onChange={handleInputChanges}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your reply..."
                  />
                  <button
                    type="submit"
                    className="bg-[#C08261] text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Add Reply
                  </button>
                </form>
                {userid && comment.user_id === userid.user_id && (
                  <div className="flex mt-2">
                    {isEditing && editedComment.rating_id === comment.rating_id ? (
                      <div className="flex items-center">
                        <textarea
                          value={editedComment.comment}
                          onChange={(e) => setEditedComment({ ...editedComment, comment: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => handleUpdateComment(editedComment)}
                          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={cancelEditMode}
                          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => activateEditMode(comment)}
                          className="bg-[#C08261] text-white px-4 py-2 rounded mr-2"
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
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommentSection;


