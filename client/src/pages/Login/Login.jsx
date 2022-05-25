import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";
import { FormattedMessage } from "react-intl";

// Core components
import FormLogin from "../../features/auth/Login/FormLogin";
import logo from "../../assets/images/Vwanu_logo.svg";
import Shape_up from "../../assets/images/Shape_up.svg";
import Home_pic from "../../assets/images/Home_pic.jpg";

//rtk query

const LoginScreen = () => {
  return (
    <>
      <div className="mx-0 md:mx-0 ">
        <div className="grid grid-cols-1 lg:mb:0 lg:grid-cols-2">
          <div
            style={{
              backgroundImage: `url(${Home_pic})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="hidden lg:inline lg:relative lg:justify-center"
          >
            <div className="bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-96 z-0 lg:h-screen">
              <img src={Shape_up} alt="_shape_up" className="hidden lg:block w-[22%] lg:absolute right-0 z-30 -mt-8 object-fit" />
              <p className="text-center pt-14 text-base-100 text-2xl py-5">
                <img className="w-[30%] m-auto" src={logo} alt="logo_vwanu" />
              </p>
              <p className="text-5xl text-v-yellow-dark font-bold py-10 mt-10 text-center">
                {" "}
                <FormattedMessage id="login.welcome" defaultMessage="Welcome" description="This is the welcome message in the login page" />
              </p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2">
                <FormattedMessage
                  id="login.together"
                  defaultMessage="Together We are Stronger"
                  description="This is the message after the welcome message"
                />
              </p>
            </div>
            <img
              src={Shape_up}
              alt="_shape_down"
              className="hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180"
            />
          </div>

          <div className="inline lg:hidden">
            <div className="bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-96 z-0 lg:h-screen xl:h-full 2xl:h-full">
              <img src={Shape_up} alt="_shape_up" className="hidden lg:block w-[22%] lg:absolute right-0 z-30 -mt-8 object-fit" />
              <p className="text-center pt-14 text-base-100 text-2xl py-5">
                <img className="w-[30%] m-auto" src={logo} alt="logo_vwanu" />
              </p>
              <p className="text-5xl text-v-yellow-dark font-bold py-10 mt-10 text-center">
                <FormattedMessage id="login.welcome" defaultMessage="Welcome" description="This is the welcome message in the login page" />
              </p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2">
                <FormattedMessage
                  id="login.together"
                  defaultMessage="Together We are Stronger"
                  description="This is the message after the welcome message"
                />
              </p>
            </div>
            <img
              src={Shape_up}
              alt="_shape_down"
              className="hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180"
            />
          </div>

          <div className="place-items-center bg-base-100 shadow-t-2xl rounded-t-[30px] lg:rounded-none px-4 md:px-8 -mt-28 z-10 md:mx-36 lg:mt-0 lg:mx-0 lg:h-screen xl:h-full 2xl:h-full ">
            <div className="hidden lg:block lg:place-content-center lg:my-8">
              <p className="text-center mt-8">
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
        {/*}
        <div className="bg-white lg:px-12 py-6">
          <span className="text-secondary font-semibold">Language:</span>
        </div>
  {*/}
      </div>
    </>
  );
};

export default LoginScreen;
