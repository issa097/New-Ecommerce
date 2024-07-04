

import React, { useState, useEffect } from "react";
import axios from "axios";

const Counter = ({ cart_id, initialQuantity, onQuantityChange, fetchData }) => {
  const [count, setCount] = useState(initialQuantity || 1);

  useEffect(() => {
    // Update the count if the initial quantity changes
    setCount(initialQuantity || 1);
  }, [initialQuantity]);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
      updateCart(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
    updateCart(count + 1);
  };

  const updateCart = async (newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/updateCart/${cart_id}`,
        {
          quantity: newQuantity,
        }
      );

      console.log("The cart has been updated successfully", response.data);
      fetchData()
      // Notify the parent component about the quantity change
      if (onQuantityChange) {
        onQuantityChange(newQuantity);
      }
    } catch (error) {
      console.error("An error occurred while updating the cart", error);
    }
  };

  return (
    <div className="sm:order-1">
      <div className="mx-auto flex h-8 items-stretch text-grey-400">
        <button
          className="flex items-center justify-center rounded-l-md bg-[#C08261] px-4 transition hover:text-white"
          onClick={decreaseCount}
        >
          -
        </button>
        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
          {count}
        </div>
        <button
          className="flex items-center justify-center rounded-r-md bg-[#C08261] px-4 transition hover:text-white"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
