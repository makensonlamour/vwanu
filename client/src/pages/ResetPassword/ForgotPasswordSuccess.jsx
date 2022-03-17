import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";

// Core components
import logo_mobile from "../../assets/images/Asset_2.png";
import { MdMarkEmailRead } from "react-icons/md";

const ForgotPasswordSuccessScreen = () => {
  return (
    <>
      <div className="">
        <div className="mt-10 mx-10">
          {/*logo for responsive mobile*/}
          <Link to={routesPath.NEWSFEED}>
            <div className="mt-4 mb-6 lg:mb-10">
              <img className="w-2/5 lg:w-1/5 m-auto" src={logo_mobile} alt="logo_vwanu" />
            </div>
          </Link>
          <div className="bg-success shadow-3xl rounded-3xl px-2 md:px-4  py-16 justify-center m-auto md:w-2/3 lg:w-2/5">
            <p className="">
              <MdMarkEmailRead size="48" className="m-auto text-green-600" />
            </p>
            <p className="text-green-600 text-center font-semibold mt-4">
              {"Your request has been approved. We send you a link to reset your password on your email."}
            </p>
          </div>
          <div className="m-auto text-center mt-10 hover:text-secondary">
            <Link to={routesPath.NEWSFEED} className="text-primary font-bold mt-10 text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordSuccessScreen;
