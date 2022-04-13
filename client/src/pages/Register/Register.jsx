import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";

// Core components
import FormRegister from "../../features/auth/Register/FormRegister";
import logo from "../../assets/images/Vwanu_logo.svg";
import Shape_up from "../../assets/images/Shape_up.svg";
import Home_pic from "../../assets/images/Home_pic.jpg";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaGooglePlus } from "react-icons/fa";

const RegisterScreen = () => {
  return (
    <>
      <div className="mx-0 md:mx-0 lg:h-screen ">
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
              <p className="text-5xl text-v-yellow-dark font-bold py-10 mt-10 text-center align-middle">Welcome</p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2 align-middle">Together We are Stronger</p>
            </div>
            <img
              src={Shape_up}
              alt="_shape_down"
              className="hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180"
            />
          </div>

          <div className="inline lg:hidden">
            <div className="bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78] h-96 z-0 lg:h-screen">
              <img src={Shape_up} alt="_shape_up" className="hidden lg:block w-[22%] lg:absolute right-0 z-30 -mt-8 object-fit" />
              <p className="text-center pt-14 text-base-100 text-2xl py-5">
                <img className="w-[30%] m-auto" src={logo} alt="logo_vwanu" />
              </p>
              <p className="text-5xl text-v-yellow-dark font-bold py-10 mt-10 text-center">Welcome</p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2">Together We are Stronger</p>
            </div>
            <img
              src={Shape_up}
              alt="_shape_down"
              className="hidden lg:block w-[23%] lg:absolute left-0 z-30 bottom-0 object-fit rotate-180"
            />
          </div>

          <div className="place-items-center bg-base-100 shadow-t-2xl rounded-t-[30px] lg:rounded-none px-4 md:px-8 -mt-28 z-10 md:mx-36 lg:mt-0 lg:mx-0 lg:h-screen">
            <div className="lg:place-content-center lg:mt-6 lg:mb-3">
              <p className="text-center mt-4 lg:mt-0">
                <span className="text-md text-primary font-semibold md:text-xl">Already have an account ?</span>{" "}
                <Link
                  data-testid="loginBtn"
                  to={routesPath.LOGIN}
                  className="btn btn-primary btn-sm rounded-full normal-case hover:btn-secondary hover:text-base-100 md:px-8 ml-1 text-base-100"
                >
                  Sign In
                </Link>
              </p>
            </div>
            <div className="hidden lg:block mb-8 lg:mb-4 text-center">
              <span className="text-blue-600 text-center inline text-md md:text-lg">
                {` Or sign in with `}
                <Link className="text-blue-500 ml-2" to={"#"}>
                  <BsFacebook className="text-2xl inline mx-1" />
                </Link>
                <Link className="text-sky-400" to={"#"}>
                  <BsTwitter className="text-2xl inline mx-1" />
                </Link>
                <Link className="text-red-600" to={"#"}>
                  <FaGooglePlus className="text-2xl inline mx-1" />
                </Link>
              </span>
            </div>
            <FormRegister />
            <div className="lg:hidden mb-8 text-center">
              <span className="text-blue-600 text-center inline text-md md:text-lg">
                {` Or sign in with `}
                <Link className="text-blue-500 ml-2" to={"#"}>
                  <BsFacebook className="text-2xl inline mx-1" />
                </Link>
                <Link className="text-sky-400" to={"#"}>
                  <BsTwitter className="text-2xl inline mx-1" />
                </Link>
                <Link className="text-red-600" to={"#"}>
                  <FaGooglePlus className="text-2xl inline mx-1" />
                </Link>
              </span>
            </div>
          </div>
        </div>
        {/*}
        <div className="bg-gray-100 shadow-lg rounded-t-lg lg:mx-6 px-6 py-6 mt-10">
          <span className="text-secondary font-semibold">Language:</span>
        </div>
          {*/}
      </div>
    </>
  );
};

export default RegisterScreen;
