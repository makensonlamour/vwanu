import React from "react";
import logo from "../../assets/images/Asset_2.png";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import routesPath from "../../routesPath";
import FormLockscreen from "../../features/auth/Login/FormLockscreen";

const Lockscreen = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const profilePicture = localStorage.getItem("profilePicture");
  const email = localStorage.getItem("email");

  if (!email || email === "undefined") {
    console.log("email", email);
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <div className="basis-[28%] md:basis-[12%] ml-2 md:pl-6 lg:pl-10 xl:px-6">
        <Link className="" to={routesPath?.NEWSFEED}>
          <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10 py-2 flex">
            {" "}
            <img className="mx-auto justify-center" src={logo} alt="logo_vwanu" />
          </div>
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto object-cover object-center w-16 h-16 rounded-[14px]" src={profilePicture} alt="vwanu" />
            <p className="mt-3 text-center mx-auto font-semibold">{email}</p>
            <p className="mt-2 text-center text-sm text-gray-600">You have been logged out due to inactivity. Please log in again.</p>
          </div>
          <div className="mt-8 space-y-6">
            <FormLockscreen />
          </div>
          <div className="flex items-center justify-center">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Return to login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lockscreen;
