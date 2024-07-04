import React from "react";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AllProducts from "./Pages/AllProducts";
import Contact from "./Pages/ContactUs";
import Categories from "./Components/Categories";
import LoginForm from "./Pages/Login";
import RegisterForm from "./Pages/Regestier";
import Payment from "./Pages/Payment";
import Cart from "./Pages/Cart";
import UserProfile from "./Pages/UserProfile";
import YourComponent from "./admin/Sidebar";
import NotFound from "./Pages/NotFound";
import AllBlogs from "./Pages/AllBlogs";
import BlogsDetails from "./Pages/BlogsDetails";
import { OrderProvider } from "./OrderContext/OrderContext";
import AboutUs from "../src/Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Side from "./Components/Side";
import Chat from "./Components/Chat";
import Reset from "./Components/Rest";
import Otp from "./Components/Otp";
import NewPassword from "./Components/NewPassword";
import FAQ from "./Pages/Faq";
import Cookies from "js-cookie";

const App = () => {
  const isAuthenticated = !!Cookies.get("Token");


  return (
    <Router>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/side"
            element={<Side />}
          />
          <Route
            path="/payment"
            element={isAuthenticated ? <Payment /> : <Navigate to="*" />}
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="*" />}
          />


          <Route path="/admin" element={<YourComponent />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/blogsdetails/:id" element={<BlogsDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/rest" element={<Reset />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/Faq" element={<FAQ />} />
        </Routes>
      </OrderProvider>
    </Router>
  );
};

export default App;
