// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BlogList = (product) => {
//   const [blogs, setBlogs] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setCurrentPage] = useState(1);
// console.log("cccccccccccccc",blogs)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/products/${page}/2`);
//         const {  totalPages, pagination } = response.data;
//         const result = response.data.result.rows
//         setBlogs(result);
//         setTotalPages(totalPages);
//         console.log("result", result);
//         console.log("totalPages", totalPages);
//         console.log("pagination", pagination);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [page]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       {/* Display your blogs */}
//       <ul>
//         {blogs && blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <>
//             <li key={blog.id}>{blog.title}</li>
     

//             </>
//           ))
//         ) : (
//             <>
//           <li>No blogs available</li>
//         </>
          
//         )}
//       </ul>

//       {/* Display pagination controls */}
//       <div>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={page === index + 1 ? 'bg-black' : ''}>
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogList;
