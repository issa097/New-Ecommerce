// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import Statics from "./Statics";
// import swal from "sweetalert";

// function Contactus() {
//   const [userData, setUserData] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [limit, setlimit] = useState(0);
//   const [page, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageNumber, setPageNumber] = useState(1);

//   const tableStyles = {
//     overflowX: "auto",
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/getContactMessageByuserr/${page}/${limit}`
//         );

//         const { totalPages, pagination } = response.data;

//         const result = response.data.result.rows;
//         // const limit = response.data.pagination;
//         // console.log("ssssssssssssssssssss", limit);

//         setUserData(result);
//         setTotalPages(totalPages);
//         setlimit(response.data.limit);
//         console.log("result", result);
//         console.log("totalPages", totalPages);
//         console.log("pagination", pagination);
//         console.log("limit", limit);
//         // setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [page, limit]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };
//   const handleOpenEnvelope = (user) => {
//     setSelectedUser(user);
//   };

//   const handleCloseEnvelope = () => {
//     setSelectedUser(null);
//   };

//   const handleDelete = async (contact_id) => {
//     try {
//       await axios.put(`http://localhost:8000/deleteContact/${contact_id}`);

//       swal({
//         icon: "success",
//         title: "contact Deleted",
//         text: "The contact was deleted successfully.",
//         confirmButtonColor: "#C08261",
//       });
//     } catch (error) {
//       console.error("Error deleting contact:", error);

//       swal({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred while deleting the contact.",
//         confirmButtonColor: "#B31312",
//       });
//     }
//   };

//   return (
//     <>
//       {" "}
//       <Statics />
//       <h2 className="text-3xl font-bold pt-[3rem] text-center mb-4">Contact</h2>
//       <div className="pt-[2rem] ">
//         {/* ml-96 */}
//         <div className=" ">
//           <div className="table-container" style={tableStyles}>
//             <table className="  w-full border-collapse bg-white text-left text-sm text-gray-500 overflow-hidden rounded-lg border border-[#C08261] shadow-md p-5   ">
//               <thead className="bg-[#C08261]">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium text-gray-900"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium text-gray-900"
//                   >
//                     Email
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium text-gray-900"
//                   >
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium  text-gray-900"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//                 {userData.map((user, index) => (
//                   <tr
//                     key={user.id}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
//                     }`}
//                   >
//                     <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
//                       <div className="text-sm">
//                         <div className="font-medium text-gray-700">
//                           {user.contact_name}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm">
//                         <div className="font-medium text-gray-700">
//                           {user.contact_email}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {/* You can customize the icon and color based on user status */}
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           className="h-6 w-6 text-green-500"
//                         >
//                           {/* Customize the checkmark icon */}
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                         {user.status}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex justify-start gap-4">
//                         <button
//                           className={`text-grey-500 px-4 py-2 rounded ${
//                             user === selectedUser
//                               ? "opacity-50 cursor-not-allowed"
//                               : ""
//                           }`}
//                           onClick={() => handleOpenEnvelope(user)}
//                           disabled={user === selectedUser}
//                         >
//                           {/* Envelope Font Awesome icon */}
//                           <FontAwesomeIcon
//                             icon={faEnvelope}
//                             className="h-6 w-6 text-[#C08261]"
//                           />
//                           {/* End Envelope Font Awesome icon */}
//                         </button>

//                         <button
//                           className="text-grey-500 px-4 py-2 rounded"
//                           onClick={() => handleDelete(user.contact_id)}
//                         >
//                           {/* Delete SVG icon */}
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                             className="h-6 w-6"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                             />
//                           </svg>
//                           {/* End Delete SVG icon */}
//                         </button>
//                       </div>
//                     </td>
//                     {/* <td className="px-6 py-4 "> */}

//                     {/* </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-center mt-4">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`mx-2 px-4 py-2 rounded ${
//                   pageNumber === index + 1
//                     ? "bg-[#C08261] text-white"
//                     : "bg-white text-[#C08261] border border-[#C08261]"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//         {selectedUser && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//             <div className="bg-white p-8 max-w-md rounded-md">
//               <h2 className="text-lg font-semibold mb-4">
//                 {selectedUser.contact_name}'s Message
//               </h2>
//               <p className="text-gray-700">{selectedUser.contact_message}</p>
//               <button
//                 className="mt-4 px-4 py-2 bg-[#C08261] text-white rounded-md"
//                 onClick={handleCloseEnvelope}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Contactus;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import Statics from "./Statics";

function Contactus() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [limit, setLimit] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [adminResponse, setAdminResponse] = useState("");

  const tableStyles = {
    overflowX: "auto",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getContactMessageByuserr/${page}/${limit}`
        );

        const { totalPages, pagination } = response.data;
        const result = response.data.result.rows;

        setUserData(result);
        setTotalPages(totalPages);
        setLimit(response.data.limit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpenEnvelope = (user) => {
    setSelectedUser(user);
  };

  const handleCloseEnvelope = () => {
    setSelectedUser(null);
    setAdminResponse(""); 
  };

  const handleDelete = async (contact_id) => {
    try {
      await axios.put(`http://localhost:8000/deleteContact/${contact_id}`);

      swal({
        icon: "success",
        title: "Contact Deleted",
        text: "The contact was deleted successfully.",
        confirmButtonColor: "#C08261",
      });
    } catch (error) {
      console.error("Error deleting contact:", error);

      swal({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the contact.",
        confirmButtonColor: "#B31312",
      });
    }
  };

  const handleAdminResponse = async () => {
        axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
    try {
      await axios.post(`http://localhost:8000/contact-uss`, {
        contact_name: selectedUser.contact_name,
        contact_message: adminResponse,
      });

      swal({
        icon: "success",
        title: "Admin Response Sent",
        text: "Your response has been sent to the user.",
        confirmButtonColor: "#C08261",
      });

      handleCloseEnvelope();
    } catch (error) {
      console.error("Error sending admin response:", error);

      swal({
        icon: "error",
        title: "Error",
        text: "An error occurred while sending the admin response.",
        confirmButtonColor: "#B31312",
      });
    }
  };

  return (
    <>
    <Statics />
      <h2 className="text-3xl font-bold pt-[3rem] text-center text-[#C08261] mb-4">Contact</h2>
      <div className="pt-[2rem]">
        <div className="">
          <div className="table-container" style={tableStyles}>
            <table className="  w-full border-collapse bg-white text-left text-sm text-gray-500 overflow-hidden rounded-lg border border-[#C08261] shadow-md p-5   ">
              <thead className="bg-[#C08261]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
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
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium  text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {userData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                    }`}
                  >
                    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {user.contact_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {user.contact_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {user.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-start gap-4">
                        <button
                          className={`text-grey-500 px-4 py-2 rounded ${
                            user === selectedUser
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleOpenEnvelope(user)}
                          disabled={user === selectedUser}
                        >
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-6 w-6 text-[#C08261]"
                          />
                        </button>

                        <button
                          className="text-grey-500 px-4 py-2 rounded"
                          onClick={() => handleDelete(user.contact_id)}
                        >
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
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 max-w-md rounded-md">
              <h2 className="text-lg font-semibold mb-4">
                {selectedUser.contact_name}'s Message
              </h2>
              <p className="text-gray-700">{selectedUser.contact_message}</p>
              <div className="mt-4">
                <label className="block text-gray-700">Admin Response:</label>
                <textarea
                  className="w-full h-20 p-2 border border-gray-300 rounded-md"
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                />
              </div>
              <button
                className="mt-4 px-4 py-2 bg-[#C08261] text-white rounded-md mr-2"
                onClick={handleAdminResponse}
              >
                Send Response
              </button>
              <button
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={handleCloseEnvelope}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Contactus;
