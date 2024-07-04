import React, { useState, useEffect } from "react";
import axios from "axios";
import Statics from "./Statics";
import swal from "sweetalert";

function UserTable() {
  const [users, setUsers] = useState(null);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setlimit] = useState(0);
  console.log(limit);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const tableStyles = {
    overflowX: "auto",
  };
  console.log("hhhhhhhhhhhh", users);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:8000/users/${page}/${limit}`)
        .then((response) => {
          const { totalPages, pagination } = response.data;
          const result = response.data.result.rows;
          console.log(totalPages, pagination);
          console.log("API Response:", response.data);
          setUsers(Array.isArray(result) ? result : []);
          setTotalPages(totalPages);
          const limit = response.data.limit;
          console.log("asd", limit);
          setlimit(limit);
          console.log(response.config.url, "asdasasdasdasd");
          // window.location.href=response.config.urlx
          console.log(totalPages);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUsers(null);
          setTotalPages(0);
        });
    };
    fetchData();
  }, [page, limit]); // Add 'page' as a dependency to useEffect

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearch = () => {
    const filteredProducts = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setPageNumber(0);
  };
  const handleDelete = (user_id) => {
    // Find the user with the specified user_id
    const userToDelete = users.find((user) => user.user_id === user_id);

    // Check if the user was found
    if (!userToDelete) {
      console.error("User not found");
      alert("User not found. Please try again.");
      return;
    }

    // Determine if the user should be blocked or unblocked based on the 'is_deleted' attribute.
    const is_deleted = userToDelete.is_deleted;

    // Send a request to block/unblock the user using Axios.
    axios
      .put(`http://localhost:8000/deleteuser/${user_id}`)
      .then((response) => {
        console.log(user_id);
        // Handle the successful response
        if (is_deleted) {
          // alert("User unblocked successfully");
          handleUndo(user_id);
        } else {
          swal({
            title: "Done!",
            text: "User Blocked Successfully",
            icon: "success", // Fix the typo here
            confirmButtonText: "OK",
          });
        }
        // Update the user list (you may want to refetch it)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error blocking/unblocking user:", error);
        alert("Failed to block/unblock the user. Please try again.");
      });
  };
  const handleUndo = (user_id) => {
    // Send a request to block/unblock the user using Axios.
    axios
      .put(`http://localhost:8000/undo/${user_id}`)
      .then((response) => {
        console.log(response.data);
        // Handle the successful response

        swal({
          title: "Done!",
          text: "User UnBlocked Successfully",
          icon: "success", // Fix the typo here
          confirmButtonText: "OK",
        });
        // Update the user list (you may want to refetch it)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error blocking/unblocking user:", error);
        alert("Failed to block/unblock the user. Please try again.");
      });
  };
  // const handleEdit = (e, userId) => {
  //   e.preventDefault();
  //   setIsEditModalOpen(true);
  //   setSelectedUserId(userId);
  // };

  return (
    <>
      <Statics />
      <h2 className="text-3xl font-bold pt-[3rem] text-center text-[#C08261]  mb-4">Users</h2>

      <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5  mt-30">
        <div className="flex items-center rounded-none border-none    space-x-2">
          <input
            type="text"
            id="user-search"
            className="w-full p-2 text-sm border border-gray-300 rounded-lg"
            placeholder="Search for user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <br />
        <div className="table-container" style={tableStyles}>
          <table className="  w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-[#C08261]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  State
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Role
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {(searchResults.length > 0 ? searchResults : users || []).map(
                (user, index) => (
                  <tr
                    key={user.user_id}
                    className={`hover:bg-gray-50 ${
                      index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                    }`}
                  >
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={user.user_img}
                          alt=""
                        />
                        <span
                          className={`absolute right-0 bottom-0 h-2 w-2 rounded-full bg-${
                            user.active ? "green" : "red"
                          }-400 ring ring-white`}
                        ></span>
                        {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {user.username}
                        </div>
                        <div className="text-gray-400">{user.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full ${
                          user.active ? "bg-green-50" : "bg-red-50"
                        } px-2 py-1 text-xs font-semibold text-${
                          user.active ? "green" : "red"
                        }-600`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.active ? "bg-green-600" : "bg-red-600"
                          }`}
                        ></span>
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">{user.role}</td>
                    {/* <td className="px-6 py-4"></td> */}
                    <td className="px-6 py-4 ">
                      <div className="flex justify-start gap-4">
                        <button
                          className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
                          onClick={() => handleDelete(user.user_id)}
                        >
                          {user.is_deleted ? "Unblock" : "Block"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 rounded ${
                pageNumber === index + 1
                  ? "bg-[#C08261] text-white"
                  : "bg-white text-[#C08261] border border-[#C08261]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserTable;
