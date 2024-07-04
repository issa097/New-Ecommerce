import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import Swal from "sweetalert";
import Cookies from "js-cookie";

const CustomPrevArrow = (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      borderRight: "20px solid #C08261",
    }}
  />
);

const CustomNextArrow = (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      borderLeft: "20px solid #C08261",
    }}
  />
);

function Courses() {
  const [workshops, setWorkshops] = useState([]);
  const [showAllWorkshops, setShowAllWorkshops] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(showAllWorkshops)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllShop");
        setWorkshops(response.data);
        setWorkshops(response.data);
        console.log("objectsssssa", response.data.workshop_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedworkshop = showAllWorkshops
    ? workshops
    : workshops.slice(0, 4);
  console.log("dddddddd", displayedworkshop);
  const handleReadMoreClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClick = async (workshop_id) => {
    closeModal();

    // Retrieve the token from local storage
    // Replace with your actual token key

    try {
      axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`

      // Send a request to your server to validate the token
      const response = await axios.post(
        "http://localhost:8000/Newworkshop_bookings",
        { workshop_id: workshop_id }
      );

      if (response.data) {
        // Show sweet alert for registered users
        Swal({
          icon: "success",
          title: "Success!",
          text: "Your seat has been successfully saved!",
        });
      } else {
        // Show sweet alert for unregistered users
        Swal({
          icon: "warning",
          title: "You're not logged in!",
          text: "To save your seat, please sign up or log in.",
          showCancelButton: true,
          confirmButtonText: "Sign Up",
          cancelButtonText: "Login Now",
        });

        // if (result.isConfirmed) {
        //   // Redirect to the sign-up page
        //   navigate("/signup");
        // } else if (result.dismiss === Swal.DismissReason.cancel) {
        //   // Redirect to the login page
        //   navigate("/login");
        // }
      }
    } catch (error) {
      console.error("Error validating token:", error);
      // Handle error (e.g., redirect to login page)
      Swal({
        icon: "warning",
        title: "You're not logged in!",
        text: "To save your seat, please sign up or log in.",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        cancelButtonText: "Login Now",
      });
      navigate("/login");
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // return (
  //   <div className="flex justify-center items-center h-screen">
  //     <div className="w-3/4">
  //       {/* Slider */}
  //       <Slider {...settings}>
  //         {displayedworkshop.map((workshop, index) => (
  //           <div
  //             key={index}
  //             className="bg-white h-[450px] text-[#C08261] rounded-xl"
  //           >
  //             <div className="h-56 bg-[#C08261] flex justify-center items-center rounded-t-xl">
  //               <img
  //                 src={workshop.workshop_img}
  //                 alt=""
  //                 className="h-44 w-44 rounded-full"
  //               />
  //             </div>

  //             <div className="flex flex-col items-center justify-center gap-4 p-4">
  //               <p className="text-xl font-semibold">
  //                 {workshop.workshop_name}
  //               </p>
  //               <p className="text-center">{workshop.workshop_dis}</p>
  //               <p className="text-center text-[#C08261]">
  //                 Time-start: {workshop.workshop_start} <br />
  //                 Time-end : {workshop.workshop_end}
  //               </p>
  //               <button
  //                 onClick={() => {
  //                   handleReadMoreClick(workshop);
  //                 }}
  //                 className="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
  //               >
  //                 <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
  //                 <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
  //                 <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
  //                 <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
  //                 <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
  //                 <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
  //                   Save A Seat
  //                 </span>
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </Slider>

  //       {/* Added modal */}
  //       <AnimatePresence>
  //         {isModalOpen && (
  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             exit={{ opacity: 0 }}
  //             onClick={closeModal}
  //             className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
  //           >
  //             <motion.div
  //               initial={{ scale: 0, rotate: "12.5deg" }}
  //               animate={{ scale: 1, rotate: "0deg" }}
  //               exit={{ scale: 0, rotate: "0deg" }}
  //               onClick={(e) => e.stopPropagation()}
  //               className="bg-[#C08261] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
  //             >
  //               <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
  //               <div className="relative z-10">
  //                 <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-[#C08261] grid place-items-center mx-auto">
  //                   <FiAlertCircle />
  //                 </div>
  //                 <h3 className="text-3xl font-bold text-center mb-2">
  //                   One more thing!
  //                 </h3>
  //                 <p className="text-center mb-6">
  //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
  //                   aperiam vitae, sapiente ducimus eveniet in velit.
  //                 </p>
  //                 <div className="flex gap-2">
  //                   <button
  //                     onClick={closeModal}
  //                     className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
  //                   >
  //                     Nah, go back
  //                   </button>
  //                   <button
  //                     onClick={handleConfirmClick}
  //                     className="bg-white hover:opacity-90 transition-opacity text-[#C08261] font-semibold w-full py-2 rounded"
  //                   >
  //                     Understood!
  //                   </button>
  //                 </div>
  //               </div>
  //             </motion.div>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <h1 className="mt-16 flex justify-center font-bold text-4xl   text-[#C08261]">
        {" "}
        Our Latest Workshops
      </h1>
      <div
        className="flex flex-wrap justify-center items-center min-h-screen p-4 sm:p-8"
        data-aos="fade-up" // Set the AOS animation attribute
        data-aos-offset="200" // Optional: Set the offset
        data-aos-duration="1000" // Optional: Set the duration
      >
        {displayedworkshop.map((workshop) => (
          <div
            key={workshop.workshop_id}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-40 object-cover"
                  src={workshop.workshop_img}
                  alt=""
                />
              </a>
              <div className="p-4">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {workshop.workshop_name}
                  </h5>
                </a>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {workshop.workshop_dis}
                </p>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {workshop.workshop_end}
                </p>
                {Cookies.get("Token")
                  ? (
                    <button
                      onClick={() => handleConfirmClick(workshop.workshop_id)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#C08261]"
                    >
                      Save a seat
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href="#"
                      onClick={() => handleReadMoreClick(workshop)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#C08261]"
                    >
                      Log in to save a seat
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        path stroke="currentColor" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9
                        1m4 4L9 9"
                      </svg>
                    </a>
                  )}
              </div>
            </div>
          </div>
        ))}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0, rotate: "12.5deg" }}
                animate={{ scale: 1, rotate: "0deg" }}
                exit={{ scale: 0, rotate: "0deg" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#C08261] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
              >
                <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                <div className="relative z-10">
                  <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-[#C08261] grid place-items-center mx-auto">
                    <FiAlertCircle />
                  </div>
                  <h3 className="text-3xl font-bold text-center mb-2">
                    One more thing!
                  </h3>
                  <p className="text-center mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    aperiam vitae, sapiente ducimus eveniet in velit.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={closeModal}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Nah, go back
                    </button>
                    <button
                      onClick={handleConfirmClick}
                      className="bg-white hover:opacity-90 transition-opacity text-[#C08261] font-semibold w-full py-2 rounded"
                    >
                      Understood!
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Courses;
