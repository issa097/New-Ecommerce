import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Statics from "./Statics";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [limit, setlimit] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const blog_id = {
    blog_id: blogs.blog_id,
  };
  console.log(blogs);
  const tableStyles = {
    overflowX: "auto",
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/${page}/${limit}`)

      .then((response) => {
        const { totalPages, pagination } = response.data;

        const result = response.data.result.rows;
        // const limit = response.data.pagination;
        // console.log("ssssssssssssssssssss", limit);

        setBlogs(result);
        setTotalPages(totalPages);
        setlimit(response.data.limit);
        console.log("result", result);
        console.log("totalPages", totalPages);
        console.log("pagination", pagination);
        console.log("limit", limit);
        console.log("hi", response);
        // const fetchedBlogs = response.data;
        // setBlogs(fetchedBlogs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page, limit]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleApprove = (blog_id) => {
    axios
      .put(`http://localhost:8000/approvedUpdate/${blog_id}`)
      .then((response) => {
        showAlert("blog approved succsfully", "success");

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error approving blog:", error);
      });
  };

  const handleReject = (blog_id) => {
    axios
      .put(`http://localhost:8000/approvedReject/${blog_id}`)
      .then((response) => {
        swal({
          title: "Done!",
          text: `blog rejected succsfully`,
          icon: "warning",
          confirmButtonText: "OK",
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error rejecting blog:", error);
      });
  };
  const showAlert = (message, icon) => {
    // alert(message, icon);
    swal({
      title: icon === "success" ? "Success" : "Error",
      text: message,
      icon: icon,
      confirmButtonText: "OK",
    });
  };
  return (
    <>
      {" "}
      <Statics />
      <h2 className="text-3xl font-bold text-[#C08261] pt-[7rem] text-center mb-4">Blog</h2>
      <div className=" ">
        <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ">
          {" "}
          {/* ml-80 */}
          <div className="table-container" style={tableStyles}>
            <table className="text-center w-full border-collapse bg-white  text-sm text-gray-500">
              <thead className=" bg-[#C08261]  ">
                <tr className=" ">
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium  text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4  font-medium text-gray-900"
                  >
                    Blog
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium   text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {Array.isArray(blogs) && blogs.length > 0 ? (
                  blogs.map((blog, index) => (
                    <tr
                      key={blog.id}
                      className={`hover:bg-gray-50 ${
                        index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                      }`}
                    >
                      <th className="flex gap-3 px-6 py-4 font-normal flex justify-center text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {blog.username}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium flex justify-center text-gray-700">
                            {blog.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 flex justify-center py-4">
                        {blog.content}
                      </td>
                      <td className="px-6 py-4 ">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleReject(blog.blog_id)}
                            className="text-grey-500 px-4 py-2 rounded"
                          >
                            {/* Delete SVG icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>

                            {/* End Delete SVG icon */}
                          </button>
                          <button
                            onClick={() => handleApprove(blog.blog_id)}
                            className="text-grey-500 px-4 py-2 rounded"
                          >
                            {/* Edit SVG icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No blog data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
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
        </div>
      </div>
    </>
  );
}

export default Blog;
