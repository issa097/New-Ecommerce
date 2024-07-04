import React, { useState, useEffect } from "react";
import axios from "axios";

function Statics() {
  const [data, setData] = useState({
    Payments: 0,
    Blogs: 0,
    Products: 0,
    Users: 0, // Change Users to users for consistency
  });

  useEffect(() => {
    // Fetch users
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        const usersCount = response.data.length;
        setData((prevData) => ({
          ...prevData,
          Users: usersCount,
        }));
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });

    // Fetch products
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        const productsCount = response.data.length;
        setData((prevData) => ({
          ...prevData,
          Products: productsCount,
        }));
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
    axios
      .get("http://localhost:8000/getAllBlog")
      .then((response) => {
        const BlogCount = response.data.length;
        setData((prevData) => ({
          ...prevData,
          Blogs: BlogCount,
        }));
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
    axios
      .get("http://localhost:8000/payments")
      .then((response) => {
        const PaymentsCount = response.data.length;
        setData((prevData) => ({
          ...prevData,
          Payments: PaymentsCount,
        }));
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6  ">
      <div className="grid lg:grid-cols-4 pt-[7rem] pb-[1.5rem] gap-5 sm:grid-cols-2 pt-20">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className={`bg-white overflow-hidden shadow sm:rounded-lg  `}
          >
            <div className="px-4 py-5   sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-[#C08261] truncate">
                  {key}
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-[#C08261]">
                  {value}
                </dd>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statics;
