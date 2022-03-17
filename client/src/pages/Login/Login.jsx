import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";

// Core components
import FormLogin from "../../features/auth/Login/FormLogin";
import logo from "../../assets/images/Asset_3.png";
import WelcomeImg from "../../assets/images/welcome.png";

//rtk query

const LoginScreen = () => {
  return (
    <>
      <div className="mx-0 md:mx-0 lg:lg:mx-16 xl:mx-32">
        <div className="grid grid-cols-1 lg:mb-48 lg:grid-cols-2 lg:gap-4">
          <div className="lg:justify-center">
            <div className="bg-gradient-to-tr from-blue-400 to-secondary  h-96 z-0 lg:rounded-t-3xl lg:h-[90%] lg:m-6">
              <p className="text-center pt-14 text-base-100 text-2xl py-5">
                <img className="w-1/3 m-auto" src={logo} alt="logo_vwanu" />
              </p>
              <p className="text-5xl text-v-yellow-dark font-bold py-8 text-center">Welcome</p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2">Share your Voice and Change</p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center">The Haitian Community!</p>
            </div>
            <div className="hidden lg:block bg-v-yellow rounded-b-3xl rounded-tr-[130px] h-[40%] -mt-[38%] m-6 lg:h-[50%] xl:h-[48%]"></div>
            <div className="hidden lg:block mr-20 z-50 -mt-[61%]">
              {" "}
              <img className="object-fit" src={WelcomeImg} alt="young_people" />
            </div>
          </div>

          <div className="place-items-center bg-base-100 shadow-t-2xl rounded-t-[30px] px-4 md:px-8 -mt-28 z-10 md:mx-36 lg:mt-6 lg:mx-0 xl:mx-0">
            <div className="hidden lg:block lg:place-content-center lg:my-8">
              <p className="text-center mt-4">
                <span className="text-md text-primary font-semibold md:text-xl">Not a member ?</span>{" "}
                <Link
                  data-testid="registerBtn"
                  to={routesPath.REGISTER}
                  className="btn btn-secondary btn-sm rounded-full normal-case hover:bg-primary hover:text-base-100 md:px-8 ml-1 text-base-100"
                >
                  Register
                </Link>
              </p>
            </div>
            <FormLogin />
          </div>
        </div>
        <div className="bg-gray-100 shadow-lg rounded-t-lg lg:mx-6 px-6 py-6">
          <span className="text-secondary font-semibold">Language:</span>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
