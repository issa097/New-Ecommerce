// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductForm from "./ProductForm";
// import AddProductForm from "./AddProduct";
// import Swal from "sweetalert";
// import Statics from "./Statics";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [isAddProductFormVisible, setIsAddProductFormVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [limit, setlimit] = useState(0);
//   console.log("ddddddddd", limit);
//   // const [blogs, setBlogs] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setCurrentPage] = useState(1);
//   const tableStyles = {
//     overflowX: "auto",
//   };
//   console.log("vvvvvvvvvvvvvv", searchResults);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/products/${page}/${limit}`
//         );
//         const { totalPages, pagination } = response.data;

//         const result = response.data.result.rows;
//         // const limit = response.data.pagination;
//         // console.log("ssssssssssssssssssss", limit);

//         setProducts(result);
//         setTotalPages(totalPages);
//         setlimit(response.data.limit);
//         console.log("result", result);
//         console.log("totalPages", totalPages);
//         console.log("pagination", pagination);
//         console.log("limit", limit);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [page, limit]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleSearch = () => {
//     const filteredProducts = products.filter((product) =>
//       product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(filteredProducts);
//     setPageNumber(1);
//   };

//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//   };

//   const handleEditFormClose = () => {
//     setEditingProduct(null);
//   };

//   const handleSaveEdit = (editedProduct) => {
//     console.log(editedProduct);
//     axios
//       .put(
//         `http://localhost:8000/updateproduct/${editedProduct.product_id}`,
//         editedProduct.formData
//       )
//       .then((response) => {
//         console.log(response);
//         Swal({
//           title: "Success!",
//           text: `Product ${response.data[0].product_name} saved successfully.`,
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         setEditingProduct(null);
//       })
//       .catch((error) => {
//         console.error("Error saving product:", error);
//         Swal({
//           title: "Error!",
//           text: "Failed to save the product. Please try again.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       });
//   };

//   // const handleAddProduct = (newProduct) => {
//   //   axios
//   //     .post("http://localhost:8000/product", newProduct)
//   //     .then((response) => {
//   //       setIsAddProductFormVisible(false);
//   //       console.log(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error adding product:", error);
//   //     });
//   // };

//   const handleDeleteProduct = (productId) => {
//     axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
//       "token"
//     )}`;

//     axios
//       .put(`http://localhost:8000/deleteproduct/${productId}`)
//       .then((response) => {
//         alert("Product deleted successfully");
//       })
//       .catch((error) => {
//         console.error("Error deleting product:", error);
//         alert("Failed to delete the product. Please try again.");
//       });
//   };

//   return (
//     <>
//       <Statics />
//       <h2 className="text-3xl font-bold pt-[3rem] text-center mb-4">Product</h2>
//       <div>
//         <div className=" text-center w-full max-w-3xl mx-auto p-4">
//           <label htmlFor="product-search" className="sr-only">
//             Search for products
//           </label>
//           <div className="flex items-center space-x-2 pt-5">
//             <input
//               type="text"
//               id="product_name"
//               className="w-full p-2 text-sm border border-gray-300 rounded-lg"
//               placeholder="Search for products"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//             <button
//               className="px-4 py-3 bg-[#C08261] text-sm text-white rounded-lg"
//               onClick={() => setIsAddProductFormVisible(true)}
//             >
//               Add product
//             </button>
//           </div>
//         </div>
//         <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ">
//           {" "}
//           {/* ml-80 */}
//           <div className="table-container" style={tableStyles}>
//             <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
//               <thead className="bg-[#C08261]">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium text-gray-900"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium text-gray-900"
//                   >
//                     Category
//                   </th>
//                   <th
//                     // scope="col"
//                     className="px-6 py-4  font-medium text-gray-900"
//                   >
//                     Description
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 font-medium text-gray-900"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
//                 {(searchResults.length > 0
//                   ? searchResults
//                   : products || []
//                 ).map((product, index) => (
//                   <tr
//                     key={product.id}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
//                     }`}
//                   >
//                     <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
//                       <div className="relative h-10 w-10">
//                         <img
//                           className="h-full w-full object-cover object-center"
//                           src={product.product_img}
//                           alt=""
//                         />
//                       </div>
//                       <div className="text-sm">
//                         <div className="font-medium text-gray-700">
//                           {product.product_name}
//                         </div>
//                       </div>
//                     </th>
//                     <td className="px-6 py-4">
//                       <div className="text-sm">
//                         <div className="font-medium text-gray-700">
//                           {product.category_id}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">{product.product_dis}</td>

//                     <td className="px-6 py-4 ">
//                       <div className="flex justify-end gap-4">
//                         <button
//                           className="text-grey-500 px-4 py-2 rounded"
//                           onClick={() =>
//                             handleDeleteProduct(product.product_id)
//                           }
//                         >
//                           {/* Delete SVG icon */}
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                             className="h-6 w-6"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                             />
//                           </svg>
//                           {/* End Delete SVG icon */}
//                         </button>
//                         <button
//                           className="text-grey-500 px-4 py-2 rounded"
//                           onClick={() => handleEditProduct(product)}
//                         >
//                           {/* Edit SVG icon */}
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                             className="h-6 w-6"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
//                             />
//                           </svg>
//                         </button>
//                         {/* Display pagination controls */}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-center mt-4">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`mx-2 px-4 py-2 rounded ${
//                   pageNumber === index + 1
//                     ? "bg-[#C08261] text-white"
//                     : "bg-white text-[#C08261] border border-[#C08261]"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//         {editingProduct && (
//           <ProductForm
//             product={editingProduct}
//             onEdit={handleSaveEdit}
//             onClose={handleEditFormClose}
//           />
//         )}
//         {isAddProductFormVisible && (
//           <AddProductForm
//             // onSave={handleAddProduct}
//             onClose={() => setIsAddProductFormVisible(false)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default Products;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import AddProductForm from "./AddProduct";
import Swal from "sweetalert";
import Statics from "./Statics";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isAddProductFormVisible, setIsAddProductFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setlimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const tableStyles = {
    overflowX: "auto",
  };
  console.log("vvvvvvvvvvvvvv", searchResults);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/products/${page}/${limit}`
        );
        const responses = await axios.get(
          `http://localhost:8000/Categorys`
        );
        const responsess = await axios.get(
          `http://localhost:8000/subCategorys`
        );
        setCategory(responses.data)
        setSubCategory(responsess.data)
        const { totalPages, pagination } = response.data;

        const result = response.data.result.rows;
        // const limit = response.data.pagination;
        // console.log("ssssssssssssssssssss", limit);

        setProducts(result);
        setTotalPages(totalPages);
        setlimit(response.data.limit);
        console.log("result", result);
        console.log("totalPages", totalPages);
        console.log("pagination", pagination);
        console.log("limit", limit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setPageNumber(1);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleEditFormClose = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = (editedProduct) => {
    console.log(editedProduct);
    axios
      .put(
        `http://localhost:8000/updateproduct/${editedProduct.product_id}`,
        editedProduct.formData
      )
      .then((response) => {
        console.log(response);
        Swal({
          title: "Success!",
          text: `Product ${response.data[0]?.product_name || ""
            } saved successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
        setEditingProduct(null);
      })
      .catch((error) => {
        // console.error("Error saving product:", error);
        Swal({
          title: "error!",
          text: "Failed to save the product. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const handleDeleteProduct = (product_id) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C08261",
      cancelButtonColor: "#B31312",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        await axios.put(`http://localhost:8000/deleteproduct/${product_id}`);
        Swal({
          title: "Deleted!",
          text: "Product has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#C08261",
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal({
          title: "Error!",
          text: "Failed to delete the product. Please try again.",
          icon: "error",
          confirmButtonColor: "#B31312",
        });
      }
    });
  };

  return (
    <>
      <Statics />
      <div>
        <div className=" text-center w-full max-w-3xl mx-auto p-4">
          <label htmlFor="product-search" className="sr-only text-[#C08261]">
            Search for products
          </label>
          <div className="flex items-center space-x-2 pt-5">
            <input
              type="text"
              id="product_name"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
              placeholder="Search for products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="px-3 py-1.5 bg-[#C08261] text-white rounded-lg text-sm"
              onClick={() => setIsAddProductFormVisible(true)}
            >
              Add product
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold pt-[3rem] text-center text-[#C08261] mb-4">
          Products
        </h2>
        <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ">
          {" "}
          <div className="table-container" style={tableStyles}>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-[#C08261]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    // scope="col"
                    className="px-6 py-4  font-medium text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
                {(searchResults.length > 0
                  ? searchResults
                  : products || []
                ).map((product, index) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 ${index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                      }`}
                  >
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={product.product_img}
                          alt=""
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {product.product_name}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {product.category_id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.product_dis}</td>

                    <td className="px-6 py-4 ">
                      <div className="flex justify-end gap-4">
                        <button
                          className="text-grey-500 px-4 py-2 rounded"
                          onClick={() =>
                            handleDeleteProduct(product.product_id)
                          }
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
                          {/* End Delete SVG icon */}
                        </button>
                        <button
                          className="text-grey-500 px-4 py-2 rounded"
                          onClick={() => handleEditProduct(product)}
                        >
                          {/* Edit SVG icon */}
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
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
                className={`mx-2 px-4 py-2 rounded ${pageNumber === index + 1
                  ? "bg-[#C08261] text-white"
                  : "bg-white text-[#C08261] border border-[#C08261]"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onEdit={handleSaveEdit}
            onClose={handleEditFormClose}
          />
        )}
        {isAddProductFormVisible && (
          <AddProductForm
            // onSave={handleSaveEdit}
            onClose={() => setIsAddProductFormVisible(false)}
            category={category} subcategory={subcategory} />
        )}
      </div>
    </>
  );
}

export default Products;
