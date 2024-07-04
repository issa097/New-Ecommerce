import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import FaTimes for the close (X) icon
import UserTable from "./UserTable";
import Products from "./Products";
import Blog from "./Blog";
import axios from "axios";
import Contactus from "./Contactus";
import Payment from "./Payment";
import Coupons from "./Coupons";
import FAQ from "./Faq";
import Workshops from "./Workshops";
import Cookies from "js-cookie";

function SideBar() {
  const [activeItem, setActiveItem] = useState("usertable");
  const [user, setuser] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const sidebarRef = useRef(null);

  const renderContent = () => {
    switch (activeItem) {
      case "usertable":
        return <UserTable />;
      case "products":
        return <Products />;
      case "Blog":
        return <Blog />;
      case "contactus":
        return <Contactus />;
      case "payment":
        return <Payment />;
      case "Coupon":
        return <Coupons />;
      case "WorkShop":
        return <Workshops />;
      case "FAQ":
        return <FAQ />;
      default:
        return null;
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sidebarRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `${localStorage.getItem("token")}`;
        const response = await axios
          .get("http://localhost:8000/user")
          .then((response) => {
            setuser(response.data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    Cookies.remove("token");

    window.location.href = "/login";
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "token"
    )}`;
    try {
      await axios.post("http://localhost:8000/logout");
      // logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  // function logout() {
  //   removeLocalStorage("token");
  //   Cookies.remove("token");

  //   history("/");
  // }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="fixed z-50">
        <div
          ref={sidebarRef}
          className={`absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-[#C08261] text-white transition-all duration-300 ${
            sidebarVisible ? "" : "hidden"
          }`}
        >
          <div className="transition-all duration-300 z-10 ">
            <div className="flex justify-between fixed w-full items-center p-4 z-30 bg-[#C08261] text-white">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <button onClick={handleToggleSidebar} className="text-2xl">
                {sidebarVisible ? <FaTimes /> : <FaBars />}
                {/* <FaBars /> */}
              </button>
            </div>
          </div>
          <ul className=" space-y-3 overflow-y-scroll">
            <ul className="mt-20  space-y-3">
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-[#E2C799] ${
                  activeItem === "usertable" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("usertable")}
              >
                <span className="text-2xl">👥</span>
                <span className="">Users</span>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 font-semibold hover:bg-slate-600 ${
                  activeItem === "products" ? "bg-[#E2C799]" : ""
                }`}
                onClick={() => handleItemClick("products")}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </span>
                <span className="">Products</span>
                <svg
                  className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="399.349 57.696 100.163 402.081"
                  width="1em"
                  height="4em"
                >
                  <path
                    fill="currentColor"
                    d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z"
                  />
                </svg>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md  py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "Blogs" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("Blog")}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
                <span className="">Blogs</span>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "payment" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("payment")}
              >
                <span className="text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 36 36"
                  >
                    <path
                      fill="currentColor"
                      d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z"
                      className="clr-i-outline clr-i-outline-path-1"
                    />
                    <circle
                      cx="23.01"
                      cy="20"
                      r="1.5"
                      fill="currentColor"
                      className="clr-i-outline clr-i-outline-path-2"
                    />
                    <path fill="none" d="M0 0h36v36H0z" />
                  </svg>
                </span>
                <span className="">Payment</span>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "Coupon" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("Coupon")}
              >
                <span className="text-2xl">
                  <svg
                    xmlns="http://www.w3.org/3000/svg"
                    height="16"
                    width="10"
                    viewBox="0 0 320 512"
                  >
                    {/* <path fill="none" d="M0 0h36v36H0z" /> */}

                    <path
                      // fill="none"
                      d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
                    />
                  </svg>
                </span>

                {/* <i className="fa-solid fa-dollar-sign"></i> */}

                <span className="">Coupon</span>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "contactus" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("WorkShop")}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="">WorkShop</span>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "contactus" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("contactus")}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="">Contact</span>
              </li>
              <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "settings" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("FAQ")}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </span>
                <span className="">FAQ</span>
              </li>
              {/* <li
                className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 ${
                  activeItem === "settings" ? "bg-slate-600" : ""
                }`}
                onClick={() => handleItemClick("settings")}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </span>
                <span className="">Settings</span>
              </li> */}

              <div className="{`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-white  ">
                <button
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="mx-2 text-sm font-medium">Log Out</span>
                </button>
              </div>
              {user &&
                user.map((d) => (
                  <div
                    key={d.user_id}
                    className="my-6 ml-4 flex cursor-pointer"
                  >
                    <div>
                      <img
                        className="h-12 w-12 rounded-full"
                        src={d.user_img}
                        alt="User"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{d.username}</p>
                      <p className="text-sm text-gray-300">{d.role}</p>
                    </div>
                  </div>
                ))}
            </ul>{" "}
          </ul>
        </div>
      </div>
      <div className={`transition-all duration-300`}>
        <div className="flex justify-between fixed w-full items-center p-4 z-20 bg-[#C08261] text-white">
          <button onClick={handleToggleSidebar} className="text-2xl z-50">
            {sidebarVisible ? <FaBars /> : <FaBars />}{" "}
            {/* Toggle between bars and times icon */}
          </button>
          <h1 className="text-3xl font-bold">
            {user &&
              user.map((f) => (
                <div
                  className="flex gap-2 items-center justify-center"
                  key={f.user_id}
                >
                  <img
                    className="h-12 w-12 rounded-full"
                    src={f.user_img}
                    alt="User"
                  />
                  <h1 className="center">{f.username}</h1>
                </div>
              ))}
          </h1>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default SideBar;
