import React from "react";
import Card from "../Components/Card";

const SearchResults = ({ displayedProducts }) => {
  return (
    <div className="mt-8">
      {displayedProducts && displayedProducts.length === 0 ? (
        <div className="flex justify-center items-center text-gray-700 dark:text-white w-full">
          <svg
            className="w-32 h-32 mb-4 text-[#C08261] dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            1
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5-5M11 5a6 6 0 100 12 6 6 0 000-12zM15 5a3 3 0 100 6 3 3 0 000-6z"
            ></path>
          </svg>
          <p className="text-lg text-[#C08261]">No results was found.</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchResults;
