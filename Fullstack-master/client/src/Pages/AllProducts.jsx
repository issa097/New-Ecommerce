import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Components/CustomPagination";
import Card from "../Components/Card";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import PaginationComponent from "../Components/CustomPagination";

function AllProducts() {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredSubProduct, setFilteredSubProduct] = useState([]);
  const [filterProductName, setfilterProductName] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput)
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [cursorStyle, setCursorStyle] = useState('default');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(8);
  console.log(cursorStyle)
  const productss = async () => {
    setLoading(true);

    const response = await axios.get("http://localhost:8000/products");
    const productInfo = response.data;
    setProduct(productInfo);
    setFilteredProducts(productInfo);
    setFilteredSubProduct(productInfo);
    setfilterProductName(productInfo);
    setLoading(false);

  };

  useEffect(() => {
    productss();
  }, []);

  const filterProduct = (category_name) => {
    if (category_name === "All Categories") {
      setFilteredProducts(product);
      setFilteredSubProduct(product);
      setfilterProductName(product);
    } else {
      const filtered = product.filter(
        (item) =>
          item.category_name.toLowerCase().trim() === category_name.toLowerCase().trim()
      );
      setFilteredProducts(filtered);
      setFilteredSubProduct(filtered);
      setfilterProductName(filtered);
    }
  };

  const filterSubProducts = (sub_category_name) => {
    if (sub_category_name === "Sub Categories") {
      setFilteredSubProduct(filteredProducts);
      setfilterProductName(filteredProducts);
    } else {
      const filteredSub = filteredProducts.filter(
        (item) =>
          item.sub_category_name.toLowerCase().trim() === sub_category_name.toLowerCase().trim()
      );
      setFilteredSubProduct(filteredSub);
      setfilterProductName(filteredSub);
    }
  };

  const filterProductNames = (product_name) => {
    if (product_name === "product_name") {
      setfilterProductName(filteredSubProduct);
    } else {
      const filteredNmae = filteredSubProduct.filter(
        (item) => item.product_name.toLowerCase().trim() === product_name.toLowerCase().trim()
      );
      setfilterProductName(filteredNmae);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSortChange = (option) => {
    console.log(option)
    setSortOption(option);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const filteredItems = filterProductName.filter((item) =>
    item.product_name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const sortedProducts = [...filteredItems];
  if (sortOption === "priceLowToHigh") {
    sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === "priceHighToLow") {
    sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === "topRated") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  const handleMouseDown = () => {
    setCursorStyle('pointer'); // يمكنك تغيير الشكل هنا إلى الشكل الذي تريده
  };
  const handleMouseDowns = () => {
    setCursorStyle('help'); // يمكنك تغيير الشكل هنا إلى الشكل الذي تريده
  };
  const handleMouseUp = () => {
    setCursorStyle("default"); // يمكنك تغيير الشكل هنا إلى الشكل الذي تريده
  };

  const displayedData = sortedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  console.log(displayedData)

  const handlePageChange = (selectedItem) => {
    console.log(selectedItem)
    setCurrentPage(selectedItem.selected);
  };
  return (
    <>
      <Nav />
      <div className="lg:mx-32"  >
        <form className="mt-8"  >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div
              className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#C08261] focus:border-[#C08261]"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              required
            />

          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#C08261] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row mt-10 mx-4 sm:mx-20 justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="flex space-x-2 sm:space-x-4">
                  <Search
                    product={product}
                    filterProductName={filterProductName}
                    filterProduct={filterProduct}
                    filterSubProducts={filterSubProducts}
                    filterProductNames={filterProductNames}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    cursorStyle={cursorStyle}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <label className="block text-md font-medium text-gray-700   ">
                  <select onMouseOver={handleMouseDown} onMouseLeave={handleMouseUp} style={{ cursor: cursorStyle }}
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className=" w-full flex-col rounded-lg py-2 bg-[#C08261] text-md text-red-900 dark:text-gray-200 "
                  >
                    <option value="default">Default</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="topRated">Top Rated</option>
                  </select>
                </label>
              </div>
            </div>

            <div onMouseOver={handleMouseDowns} onMouseLeave={handleMouseUp} style={{ cursor: cursorStyle }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {displayedData.map((product) => (
                <Card
                  key={product.product_id}
                  id={product.product_id}
                  product_name={product.product_name}
                  category_name={product.category_name}
                  price={product.price}
                  image={product.product_img}
                  rating={product.product_rating}

                />

              ))}

            </div>

            < PaginationComponent
              pageCount={Math.ceil(sortedProducts.length / itemsPerPage)}
              onPageChange={handlePageChange}

            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AllProducts;
