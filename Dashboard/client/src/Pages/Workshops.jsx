import React, { useState, useEffect } from "react";
import axios from "axios";
import Statics from "./Statics";
import EditForm from "./EditForm";

const tableStyles = {
  overflowX: "auto",
};

function Workshops({ totalPages, pageNumber, handlePageChange }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    workshop_name: "",
    workshop_dis: "",
    workshop_title: "",
  });

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllShop");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const handleDelete = async (workshop_id) => {
    try {
      await axios.put(`http://localhost:8000/deleteShop/${workshop_id}`);
      setWorkshops((prevWorkshops) =>
        prevWorkshops.filter((workshop) => workshop.workshop_id !== workshop_id)
      );
    } catch (error) {
      console.error("Error deleting workshop:", error);
    }
  };

  const handleEdit = async (updatedWorkshop) => {
    try {
      await axios.put(
        `http://localhost:8000/updateShop/${updatedWorkshop.workshop_id}`,
        updatedWorkshop
      );
      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop.workshop_id === updatedWorkshop.workshop_id
            ? updatedWorkshop
            : workshop
        )
      );
    } catch (error) {
      console.error("Error updating workshop:", error);
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("workshop_name", formData.workshop_name);
      formDataToSend.append("workshop_dis", formData.workshop_dis);
      formDataToSend.append("workshop_title", formData.workshop_title);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:8000/newShop",
        formDataToSend
      );
      console.log("saaaaaaa", formDataToSend);

      // setWorkshops((prevWorkshops) => [...prevWorkshops, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating workshop:", error);
    }
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      workshop_name: "",
      workshop_dis: "",
      workshop_title: "",
    });
  };
  return (
    <>
      <Statics />
      <h2 className="text-3xl font-bold pt-[3rem] text-center text-[#C08261] mb-4">
        Workshops
      </h2>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 rounded bg-[#C08261] text-white"
        >
          Add Workshop
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <button
              onClick={handleButtonClick}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="workshopName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workshop Name:
                </label>
                <input
                  type="text"
                  id="workshop_name"
                  name="workshop_name"
                  value={formData.workshop_name}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter workshop name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="workshopDescription"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workshop Description:
                </label>
                <textarea
                  id="workshop_dis"
                  name="workshop_dis"
                  value={formData.workshop_dis}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter workshop description"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="workshopTime"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workshop Time:
                </label>
                <input
                  type="text"
                  id="workshop_title"
                  name="workshop_title"
                  value={formData.workshop_title}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter workshop time"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="workshopImage"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Workshop Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#C08261] hover:bg-[#E2C799] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5">
        <div className="table-container" style={tableStyles}>
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-[#C08261]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Description
                </th>
                <th className="px-6 py-4  font-medium text-gray-900">Time</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {workshops.map((workshop, index) => (
                <tr
                  key={workshop.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                  }`}
                >
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full object-cover object-center"
                        src={workshop.workshop_img}
                        alt=""
                      />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">
                        {workshop.workshop_name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">
                        {workshop.workshop_dis}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{workshop.workshop_end}</td>
                  <td className="px-6 py-4 ">
                    <div className="flex justify-end gap-4">
                      <button
                        className="text-grey-500 px-4 py-2 rounded"
                        onClick={() => handleDelete(workshop.workshop_id)}
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
                      </button>
                   
                      {/* Display pagination controls */}
                    </div>
                  </td>
                </tr>
              ))}
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

export default Workshops;
