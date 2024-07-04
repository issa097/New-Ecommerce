import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import Cookies from "js-cookie";
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error parsing JSON for key '${key}':`, error);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({});
  console.log("object", formValues);
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  console.log("ccccccccccccccccc", formValues);
  const [image, setImageFile] = useState(null);
  const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState("");
  console.log(token);
  useEffect(() => {
    // استرجاع الـ token من الـ cookies
    const storedToken = Cookies.get("Token");

    if (storedToken) {
      // إذا وجدت الـ token، ضعها في حالة (state)
      setToken(storedToken);
    } else {
      // إذا لم تجد الـ token، قم بتعيين الحالة (state) إلى قيمة فارغة أو تعديلها حسب الحالة المطلوبة
      setToken("");
    }
  }, []);
  useEffect(() => {
    // const token = localStorage.getItem("token");

    // console.log("Stored Token:", token);

    if (token !== null) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      axios
        .get("http://localhost:8000/user")
        .then((response) => {
          console.log("🤣🤣🤣🤣🤣🤣🤣", response);
          setFormValues(response.data[0]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setUser(false);
    }
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPhotoName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };



  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        // console.log(updatedUser);
        axios.defaults.headers.common[
          "Authorization"
        ] = `${token}`;
        const response = await axios.put(
          `http://localhost:8000/updateuser`,
          formValues
        );
        console.log("Server Response:", response.data[0]);
        setSuccessMessage("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating Information", error);
        setSuccessMessage("");
        setError("Error updating information. Please try again.");
      }
    }
  };

  const handleImage = async (e) => {
    e.preventDefault();
    if (!error) {
      const updatedImage = new FormData();

      updatedImage.append("image", image);

      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `${token}`;
        const response = await axios.put(
          `http://localhost:8000/updatedImage`,
          updatedImage
        );
        console.log("Server Response:", response.data[0]);
        setSuccessMessage("Profile Image updated successfully!");
      } catch (error) {
        console.error("Error updating Information", error);
        setSuccessMessage("");
        setError("Error updating information. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation logic as needed
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `${token}`;

      const response = await axios.put(
        "http://localhost:8000/updatepassword",
        { currentPassword, newPassword },

      );
      console.log(response.error, "lololo");
      setSuccessMessage("Password updated successfully!");
      setErrorMessage(response.error);
    } catch (error) {
      Swal({
        icon: "error",
        title: "Login Failed!",
        text: `${errorMessage}`,
        confirmButtonColor: "#d33",
      });
      // console.error(
      //   "Error updating password:",
      //   // error.response?.data || error.message
      //   error.response.message

      // );
      setSuccessMessage("");
      setErrorMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="min-h-full min-w-full  flex justify-center  ">
      <div className="w-[40rem] min-h-[10rem] bg-white p-8 rounded-md shadow-md">
        <form className="space-y-4" onSubmit={handleSaveChanges}>
          <div className="text-center">
            <label htmlFor="user_img" className="cursor-pointer">
              <div className="relative">
                <img
                  src={photoPreview || formValues.user_img}
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition duration-300">
                  <button onClick={handleImage} className="text-white text-sm">
                    Change Photo
                  </button>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="user_img"
              name="user_img"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-700"
            >
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              value={formValues.birthday}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-center bg-red-500 hover:bg-red-600 text-white rounded-md"
            // onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              // onClick={handleSaveChanges}
              className="px-4 py-2 bg-[#C08261] text-white rounded-md hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150"
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Your password change form elements go here */}
            {/* ... */}

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#C08261] text-white rounded-md hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150"
              >
                Change Password
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
