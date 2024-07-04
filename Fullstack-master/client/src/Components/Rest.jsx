import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Reset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/sendEmail',{email});

      if (response.data) {
        await sendOtp(email);
        navigate('/otp'); 
      } else {
        setError('Email not found. Please check your email address.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setError('An error occurred while checking email.');
    }
  };

  const sendOtp = async (email) => {
    try {
      await axios.post('/send-otp', { email });
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    }
  };

  return (
    <body className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#C08261] py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <h1 className="text-4xl font-medium text-[#C08261]">Reset password</h1>
        <p className="text-slate-500">Fill up the form to reset the password</p>

        <form onSubmit={handleResetPassword} className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>

            <button
              type="submit"
              className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#C08261] border-none text-white text-sm shadow-sm"
            >
              <span>Reset password</span>
            </button>

            <p className="text-center">
              Not registered yet?{' '}
              <Link to="/register" className="text-[#C08261] font-medium inline-flex space-x-1 items-center">
                <span>Register now </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </Link>
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </body>
  );
}

export default Reset;
