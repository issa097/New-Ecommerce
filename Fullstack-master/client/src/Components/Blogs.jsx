import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS file

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init(); // Initialize AOS

    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await axios.get("http://localhost:8000/approvedblog");

        const data = response.data.result;

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

  useEffect(() => {
    AOS.refresh(); // Refresh AOS when component updates
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#C08261] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <h1 className="mb-12 text-center font-sans text-3xl font-bold text-[#C08261]">
        Featured Blogs
      </h1>
      <div
        className="flex justify-center mt-4"
        data-aos="fade-up" // Set the AOS animation attribute
        data-aos-offset="200" // Optional: Set the offset
        data-aos-duration="1000" // Optional: Set the duration
      >
        <Link
          to="/allblogs"
          className="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group "
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
            View More
          </span>
        </Link>
      </div>
      <div
        className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3"
        data-aos="fade-up" // Set the AOS animation attribute
        data-aos-offset="200" // Optional: Set the offset
        data-aos-duration="1000" // Optional: Set the duration
      >
        {blog.map((blogs) => (
          <article
            key={blogs.blog_id}
            className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white transition hover:translate-y-2 hover:shadow-lg"
          >
            <Link to={`/blogsdetails/${blogs.blog_id}`}>
              <img
                src={blogs.blog_img}
                className="h-56 w-full object-cover"
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
                {/* <span className="inline-block cursor-pointer select-none border border-[#C08261] bg-[#C08261] px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
                  Read More
                </span> */}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
