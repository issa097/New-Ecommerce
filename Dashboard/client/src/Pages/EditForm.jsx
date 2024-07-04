import React from 'react';
import axios from 'axios';

function EditForm({
  formData,
  handleFormChange,
 
  handleCancel,
}) {
  const handleFormSubmits = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('workshop_name', formData.workshopName);
      formDataToSend.append('workshop_dis', formData.workshopDescription);
      formDataToSend.append('workshop_end', formData.workshopTime);
      formDataToSend.append('image', formData.workshopImage);

      await axios.put(
        `http://localhost:8000/updateShop/${formData.workshop_id}`,
        formDataToSend
      );

      handleCancel();
    } catch (error) {
      console.error('Error updating workshop:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmits}>
      <div className="mb-4">
        <label
          htmlFor="workshopName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Workshop Name:
        </label>
        <input
          type="text"
          id="workshopName"
          name="workshopName"
          value={formData.workshopName}
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
          id="workshopDescription"
          name="workshopDescription"
          value={formData.workshopDescription}
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
          id="workshopTime"
          name="workshopTime"
          value={formData.workshopTime}
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
          id="workshopImage"
          name="workshopImage"
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
          onClick={handleCancel}
          className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditForm;