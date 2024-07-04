import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import BlogForm from '../Components/BlogForm';

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData =  () => {
      try {
        // Fetch data from your API
        const response =  axios.get("http://localhost:8000/approvedblog").then((response)=>{
        console.log(response.data.result[0]);
        const AllBlogs = response.data.result
        setBlogs(AllBlogs);

        })
        // Log the data array specifically
        // console.log('API Data:', response.data);

        // Set blog posts and loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        // Set loading to false on error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav />
    <div className="bg-gray-100 px-2 py-10">
      {blogs.map((blog) => (
        // <Link key={blog.blog_id} to={`/blogsdetails/${blog.blog_id}`}>
        <Link key={blog.blog_id}>
          <article className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
            <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
              <img className="rounded-2xl" src={blog.blog_img} alt="" />
            </div>
            <div className="py-4 sm:py-8">
              <a href="#" className="mb-6 block text-2xl font-medium text-gray-700">
                {blog.title}
              </a>
              <p className="mb-6 text-gray-500">{blog.created_at}</p>
              <span className="text-sm text-gray-400">{blog.content}</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
    <BlogForm />
    <Footer />
    </>
  );
}

export default AllBlogs;
