import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";

// Core components
import FormResetPassword from "../../features/auth/ForgotPassword/FormResetPassword";
import logo_mobile from "../../assets/images/Asset_2.png";

const ResetPasswordScreen = () => {
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
          <div className="justify-center m-auto md:px-16 lg:px-0 md:w-2/3 lg:w-1/3">
            <FormResetPassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordScreen;
