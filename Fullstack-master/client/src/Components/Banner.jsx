import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function Banner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [Coupon1, setCoupon1] = useState(0);
  const [Coupon2, setCoupon2] = useState(0);
  const [Coupon3, setCoupon3] = useState(0);
  console.log("object", Coupon1);
  console.log("object", Coupon2);
  console.log("object", Coupon3);
  // const { id } = useParams;
  const hideBanner = () => {
    setIsBannerVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await axios.get(`http://localhost:8000/getCoupons`);
        setCoupon1(response.data[0]);
        setCoupon2(response.data[1]);
        setCoupon3(response.data[2]);
        // Handle the response data
        console.log("😉", response);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isBannerVisible && (
        <div className="bg-[#E2C799] text-[#C08261]">
          <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-0 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <p className="ml-3 text-center font-medium leading-5 sm:text-left">
                  <span className="">
                    <span className="rounded-md bg-[#C08261] px-2 text-white">
                      Save
                    </span>
                    {Coupon1.code} upto {Coupon1.discount_percentage}% with the
                    summer coupons
                  </span>
                </p>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  className="m-2 -mr-1 flex rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={hideBanner}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
