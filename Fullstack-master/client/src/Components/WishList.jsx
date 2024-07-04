import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]); // Make sure you have cart state and setCart function defined

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

        const response = await axios.get("http://localhost:8000/getWishlist");
        setWishlist(response.data);
        console.log("Wishlist data:", response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const handleAddToCartClick = (productId) => {
    try {
      const selectedProduct = wishlist.find(
        (product) => product.product_id === productId
      );

      if (selectedProduct) {
        const newCart = [...cart, selectedProduct];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));

        console.log("Item added to cart:", selectedProduct);
      } else {
        console.error("Product not found with ID:", productId);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  return (
    <div className="sm:grid  sm:justify-center sm:ml-0 lg:flex justify-center gap-4 lg:ml-20 pt-10 ">
      {wishlist.map((product) => (
        <div
          key={product.product_id}
          className="w-72 h-96 bg-white shadow-md rounded-lg mx-4 mb-16 flex flex-col"
        >
          <img
            className="object-cover rounded-tl-lg rounded-tr-lg h-48"
            src={product.product_img}
            alt="Product"
          />
          <div className="px-5 py-3 space-y-2 flex flex-col justify-between h-48">
            <h3 className="text-md overflow-ellipsis overflow-hidden whitespace-nowrap">
              {product.product_name}
            </h3>
            <p className="text-2xl font-semibold">{`${product.price} JOD`}</p>
            <div className="flex justify-between items-center pt-3 pb-2">
              <button
                onClick={() => handleAddToCartClick(product.product_id)}
                className="px-4 py-2 bg-[#C08261] hover:bg-[#E2C799] text-center text-sm text-white rounded duration-300"
              >
                Add to Cart
              </button>
              <button
                title="Add to Favorites"
                className="text-2xl text-gray-300 hover:text-red-500 duration-300"
              >
                &hearts;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
