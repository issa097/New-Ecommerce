import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert";
import Cookies from "js-cookie";
import StarRating from "./StarRating";
import PaginationComponent from "./CustomPagination";

function Card({ id, product_name, category_name, price, image, rating }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Actions to perform on mount/unmount or when `id` changes
  }, [id]);

  const handleAddToCartClick = async (id) => {
    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`;

    try {
      await axios.post(`http://localhost:8000/items`, {
        product_id: id,
        quantity: quantity,
      });
      Swal("Done!", "Product has been added to cart", "success");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Swal("Error", "Failed to add product to cart", "error");
    }
  };

  const handleAddToWishlist = async (id) => {
    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`;

    try {
      await axios.post(`http://localhost:8000/AddWishlist`, { product_id: id });
      Swal("Done!", "Product has been added to Wishlist", "success");
    } catch (error) {
      console.error("Error adding product to Wishlist:", error);
      Swal("Error", "Failed to add product to Wishlist", "error");
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mb-6">
      <div className="relative">
        <img src={image} className="h-72 w-full" alt="Card Image" />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => handleAddToWishlist(id)}
            title="Add to Favorites"
            className="text-2xl text-black-300 hover:text-red-500 duration-300"
          >
            &hearts;
          </button>
        </div>
      </div>

      <div className="px-4 py-3 w-full">
        <Link to={`/details/${id}`}>
          <p className="text-lg font-medium text-black truncate block capitalize">
            {product_name}
          </p>
        </Link>
        <div className="flex w-full justify-between items-center">
          <p className="text-sm text-gray-500 mb-2 w-full">{category_name}</p>
          <p className="text-sm flex justify-end text-gray-500 mb-2 w-full"><StarRating rating={rating} />      </p>

        </div>

        <div className="flex items-center justify-end">
          <p className="text-lg font-medium text-black cursor-auto my-3">
            {price} JOD
          </p>

          <div className="ml-auto z-50">
            <button onClick={() => handleAddToCartClick(id)}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>

        </div>
      </div>

    </div >

  );
}

export default Card;
