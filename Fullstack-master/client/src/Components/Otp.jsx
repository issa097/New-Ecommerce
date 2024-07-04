import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Otp() {
  const [otp, setOtp] = useState(['','','','','','']); 
  const [error, setError] = useState('');

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/verificationCode', { verificationCode:otp });
      console.log(response.data)
      if (response.data) {
        window.location.href = '/newpassword';
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('An error occurred while verifying OTP.');
    }
  };

  // const handleResend = async () => {
  //   try {
  //     const newOtp = generateNewOtp();
  //     await sendOtpToEmail(newOtp);
  //     setOtp(newOtp);
  //     setError('');
  //   } catch (error) {
  //     console.error('Error resending OTP:', error);
  //     setError('An error occurred while resending OTP.');
  //   }
  // };

  // const generateNewOtp = () => {
  //   return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10).toString());
  // };

  // const sendOtpToEmail = async (verificationCode) => {
  //   try {
  //     await axios.post('http://localhost:8000/verificationCode', { verificationCode });
  //   } catch (error) {
  //     throw new Error('Error sending OTP to email:', error);
  //   }
  // };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#C08261] py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-[#C08261]">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                        type="text"
                        value={digit}
                        onChange={(e) => {
                          const updatedOtp = [...otp];
                          updatedOtp[index] = e.target.value;
                          setOtp(updatedOtp);
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                      onClick={handleVerification}
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#C08261] border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p>
                      <button
                        type="button"
                        // onClick={handleResend}
                        className="flex flex-row items-center text-[#C08261] cursor-pointer"
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;