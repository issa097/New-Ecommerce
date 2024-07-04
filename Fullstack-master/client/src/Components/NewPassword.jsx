import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert';

function NewPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (inputPassword) => {
    const minLength = 8;

    if (inputPassword.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    if (!uppercaseRegex.test(inputPassword)) {
      return 'Password must contain at least one uppercase letter.';
    }

    if (!lowercaseRegex.test(inputPassword)) {
      return 'Password must contain at least one lowercase letter.';
    }

    if (!digitRegex.test(inputPassword)) {
      return 'Password must contain at least one digit.';
    }

    return ''; 
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult) {
      setError(passwordValidationResult);
      return;
    }

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please check and try again.');
        return;
      }

      const response = await axios.put('http://localhost:8000/updatepasswordmailer', { email, password });

      if (response.data) {
        await Swal({
          icon: 'success',
          title: 'Password Changed!',
          text: 'Your password has been changed successfully.',
          confirmButtonText: 'OKAY',
          customClass: {
            confirmButton: 'bg-[#C08261]',
          },
        });
      } else {
        setError('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing the password.');
    }
  };


  return (
    <section className="bg-[#C08261] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-[#C08261] md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form onSubmit={handleChangePassword} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            {/* <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sajida@gmail.com" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div> */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-[#C08261] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Change Password
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewPassword;
