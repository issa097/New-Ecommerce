import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert";
import Cookies from "js-cookie";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(blog);
  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

      try {
        // Fetch data from your API
        const response = await axios.get("http://localhost:8000/getBlogidUser");
        console.log("🤣🤣🤣", response);

        const data = response.data;

        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        // Set loading to false on error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <section className="flex justify-center items-center mr-10">
      <div className=" mt-4"></div>
      <div className=" sm:grid  sm:justify-center sm:ml-0 lg:flex justify-center gap-4 lg:ml-20 ">
        {blog &&
          blog.map((blogs) => (
            <article
              key={blogs.blog_id}
              className="mx-auto my-4 flex h-[400px] flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-[#C08261] transition hover:translate-y-2 hover:shadow-lg"
            >
              <a href="#">
                <img
                  src={blogs.blog_img}
                  className="h-40 w-full object-cover"
                  alt=""
                />
                <div className="flex-auto px-6 py-5">
                  <span className="mb-2 flex items-center text-sm font-semibold">
                    <svg
                      className="mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.761 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z"
                      />
                    </svg>
                    {blogs.created_at}
                  </span>
                  <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                    {blogs.title}
                  </h3>
                  <p className="mb-4 text-base font-light">{blogs.content}</p>
                  {/* <span className="inline-block cursor-pointer select-none rounded-full border border-[#C08261] bg-[#C08261] px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                    Learn More
                  </span> */}
                </div>
              </a>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Blogs;
