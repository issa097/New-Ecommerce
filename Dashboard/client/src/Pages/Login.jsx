import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [email, setemail] = useState(null);
  const [Password, setPassword] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const validateForm = () => {
  //   let validationErrors = {};

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!formData.email || !emailRegex.test(formData.email)) {
  //     validationErrors.email = "Invalid email address";
  //   }

  //   if (!formData.password || formData.password.length < 6) {
  //     validationErrors.password = "Password must be at least 6 characters long";
  //   }

  //   setErrors(validationErrors);
  //   return Object.keys(validationErrors).length === 0;
  // };

  const redirectToHome = () => {
    window.location.href = "/dashboard";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/loginAdmin",
        formData
      );

      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("token", token);

      if (user) {
        redirectToHome("/dashboard");
        swal.fire({
          icon: "success",
          title: `Welcome, ${user.username}!`,
          confirmButtonColor: "#C08261",
        });
      } else {
        swal.fire({
          icon: "error",
          title: "You Are Not Admin 😒",
          confirmButtonColor: "#C08261",
        });
      }
    } catch (error) {
      // console.error("Error logging in:", error);

      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          // Handle incorrect password
          return swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "Incorrect email or password.",
            confirmButtonColor: "#d33",
          });
        } else if (status === 401) {
          // Handle incorrect password
          return swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "Incorrect email or password.",
            confirmButtonColor: "#d33",
          });
        } else if (status === 404) {
          // Handle user not found
          return swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "User not found.",
            confirmButtonColor: "#d33",
          });
        } else if (status === 403) {
          // Handle not an admin
          return swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "You are not an admin.",
            confirmButtonColor: "#d33",
          });
        } else {
          // Handle other errors
          return swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: "There was an error during login. Please try again.",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        // Handle other errors (no response from the server)
        return swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "There was an error during login. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <arguments className="bg-[#c08261]">
      <div className="p-56 ">
        <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto ">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-3xl font-bold text-gray-700">
              Login to access your admin account
            </h1>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 ${
                  formData.email ? "-translate-y-4 scale-75" : ""
                }`}
              >
                Enter Your Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 ${
                  formData.password ? "-translate-y-4 scale-75" : ""
                }`}
              >
                Enter Your Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-[#C08261] py-3 font-bold text-white"
          >
            Login
          </button>
          {errors.general && (
            <p className="text-red-500 text-sm mt-1">{errors.general}</p>
          )}
        </div>
      </div>
    </arguments>
  );
}

export default Login;
