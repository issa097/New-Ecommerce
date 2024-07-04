import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
import StarRating from "./StarRating";
import Cookies from "js-cookie";

function Cards() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          console.log("eeeee", response.data);
        } else {
          console.error("Invalid data format. Expected an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleAddToCart = async (product_id) => {
    // const count = quantity;
    axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`


    await axios
      .post(`http://localhost:8000/items`, {
        product_id: product_id,
        quantity: quantity,
      })
      .then((response) => {
        Swal("Done!", "Product has been added to cart", "success");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        Swal("Error", "Failed to add product to cart", "error");
      });
  };
  // const addToCart = (productId) => {
  //   const selectedProduct = products.find(product => product.product_id === productId);

  //   if (selectedProduct) {
  //     setCart(prevCart => [...prevCart, selectedProduct]);
  //     Swal({
  //       icon: 'success',
  //       title: 'Added to Cart!',
  //       showConfirmButton: false,
  //       timer: 2000

  //     });
  //   } else {
  //     // console.error('Product not found with ID:', product_id);
  //   }
  // };

  // const dataapi = {

  //   product_id: products.product_id,

  // };
  const addToWishlist = (productId) => {
    const selectedProduct = products.find(
      (product) => product.product_id === productId
    );

    if (selectedProduct) {
      axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

      axios
        .post("http://localhost:8000/AddWishlist", { product_id: productId })
        .then((response) => {
          console.log("Added to wishlist:", response.data);

          setWishlist((prevWishlist) => [...prevWishlist, selectedProduct]);
          Swal({
            icon: "success",
            title: "Added to WishList!",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              background: "#C08261", // Change this to the desired background color
            },
          });
        })
        .catch((error) => {
          console.error("Error adding to wishlist:", error);
          Swal({
            icon: "error",
            title: "Failed to add to Wishlist",
            text: "Please register or login!",
          });
        });
    } else {
      console.error("Product not found with ID:", productId);
    }
  };

  return (
    <div className="text-center mt-16 p-10 flex flex-col items-center text-[#C08261]">
      <h1 className="font-bold text-4xl mb-4">New In</h1>
      <h1 className="text-lg">Explore our new collection</h1>

      <div className="p-24 flex flex-wrap items-center justify-center text-black">
        {products.slice(0, 3).map((product) => (
          <div
            key={product.product_id}
            className="w-72 bg-white shadow-md rounded-lg mx-4 my-8"
          >
            <div
              style={{
                height: "200px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                className="object-cover rounded-tl-lg rounded-tr-lg absolute h-full w-full"
                src={product.product_img}
                alt={product.product_name}
              />
            </div>
            <div className="px-5 py-3 space-y-2 flex flex-col justify-between h-48">
              <h3 className="text-md overflow-ellipsis overflow-hidden whitespace-nowrap">
                {product.product_name}
              </h3>
              <p className="text-2xl font-semibold">{`${product.price} JOD`}</p>
              <StarRating rating={product.product_rating} />
              <div className="flex justify-between items-center pt-3 pb-2">
                <button
                  onClick={() => handleAddToCart(product.product_id)}
                  className="px-4 py-2 bg-[#C08261] hover:bg-[#E2C799] text-center text-sm text-white rounded duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(product.product_id)}
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
    </div>
  );
}

export default Cards;
