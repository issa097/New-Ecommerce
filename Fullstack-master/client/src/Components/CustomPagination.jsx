// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const renderPageNumbers = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <li key={i}>
//           <a
//             href="#"
//             className={`px-3 py-2 text-lg font-medium ${
//               currentPage === i
//                 ? "text-white bg-[#C08261]"
//                 : "hover:text-[#E2C799]"
//             }`}
//             onClick={(e) => {
//               e.preventDefault();
//               onPageChange(i);
//             }}
//           >
//             {i}
//           </a>
//         </li>
//       );
//     }
//     return pages;
//   };

//   return (
//     <nav
//       aria-label="Page Navigation"
//       className="flex items-center justify-center my-5"
//     >
//       <ul className="flex space-x-2">
//         {currentPage > 1 && (
//           <li>
//             <a
//               href="#"
//               className="px-3 py-2 text-lg font-medium hover:text-[#E2C799]"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onPageChange(currentPage - 1);
//               }}
//             >
//               &laquo; Prev
//             </a>
//           </li>
//         )}
//         {renderPageNumbers()}
//         {currentPage < totalPages && (
//           <li>
//             <a
//               href="#"
//               className="px-3 py-2 text-lg font-medium hover:text-[#E2C799]"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onPageChange(currentPage + 1);
//               }}
//             >
//               Next &raquo;
//             </a>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;

import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#"
            className={`px-3 py-2 text-lg font-medium ${
              currentPage === i ? "text-white bg-[#C08261]" : "hover:text-[#E2C799]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav aria-label="Page Navigation" className="flex items-center justify-center my-5">
      <ul className="flex space-x-2">
        {currentPage > 1 && (
          <li>
            <a
              href="#"
              className="px-3 py-2 text-lg font-medium hover:text-[#E2C799]"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
            >
              &laquo; Prev
            </a>
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <li>
            <a
              href="#"
              className="px-3 py-2 text-lg font-medium hover:text-[#E2C799]"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
            >
              Next &raquo;
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
