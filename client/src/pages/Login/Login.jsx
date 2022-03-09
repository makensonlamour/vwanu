import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import routesPath from "../../routesPath";
import { getAlerts } from "../../store/alerts";

// Core components
import Alerts from "../../components/common/Alerts";
import { Field, Form, Checkbox, Submit } from "../../components/form";
import { Login } from "../../store/auth";
import logo from "../../assets/images/Asset_3.png";
import WelcomeImg from "../../assets/images/welcome.png";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaGooglePlus } from "react-icons/fa";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(getAlerts);
  const handleLogin = (credentials) => dispatch(Login(credentials));
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 lg:mb-48 lg:grid-cols-2 lg:gap-4 xl:mx-36 2xl:mx-96">
          <div className="lg:justify-center">
            <div className="bg-gradient-to-tr from-blue-400 to-secondary  h-96 z-0 lg:rounded-t-3xl lg:h-[90%] lg:m-6">
              <p className="text-center pt-14 text-base-100 text-2xl py-5">
                <img className="w-1/3 m-auto" src={logo} alt="logo_vwanu" />
              </p>
              <p className="text-5xl text-v-yellow-dark font-bold py-8 text-center">Welcome</p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2">Share your Voice and Change</p>
              <p className="hidden lg:block text-base-100 text-xl font-semibold text-center">The Haitian Community!</p>
            </div>
            <div className="hidden lg:block bg-v-yellow rounded-b-3xl rounded-tr-[130px] h-[50%] -mt-[9rem] m-6"></div>
            <div className="hidden lg:block mr-20 z-50 -mt-[375px]">
              {" "}
              <img className="object-fit" src={WelcomeImg} alt="young_people" />
            </div>
          </div>

          <div className="place-items-center bg-base-100 shadow-t-2xl rounded-t-[30px] px-8 -mt-28 z-10 lg:mt-6 lg:mx-10 md:mx-36 2xl:px-24">
            <div className="hidden lg:block lg:place-content-center lg:my-8">
              <p className="text-center mt-4">
                <span className="text-md text-primary font-semibold md:text-xl">Not a member ?</span>{" "}
                <Link
                  data-testid="registerBtn"
                  to={routesPath.REGISTER}
                  className="btn btn-secondary btn-sm rounded-full normal-case hover:btn-primary hover:text-base-100 md:px-8 ml-1 text-base-100"
                >
                  Register
                </Link>
              </p>
            </div>
            <Form
              validationSchema={ValidationSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleLogin}
              className="mt-4 lg:shadow-2xl lg:rounded-t-3xl"
            >
              <h1 className="card-title text-primary font-bold text-xl lg:text-2xl">Sign in to Vwanu</h1>
              <Alerts className="bg-red-200" alerts={alerts} />
              <Field
                required
                autoCapitalize="none"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-error autofill:text-secondary autofill:bg-blue-200"
                testId="email-error-message"
              />
              <Field
                required
                autoCapitalize="none"
                autoCorrect="false"
                placeholder="Password"
                name="password"
                autoComplete="new-email"
                className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-error autofill:text-secondary autofill:bg-blue-200"
                testId="password-error-message"
                showPassword={true}
              />
              <Checkbox
                name="remmberMe"
                label="Remember me"
                link={
                  <Link className="text-primary font-bold hover:text-secondary" to={routesPath.FORGOT_PASSWORD}>
                    Forgot password
                  </Link>
                }
                className=""
              />

              <Submit data-testid="loginBtn" className="rounded-full text-md btn-md" title="Login" />
              <div className="mt-9 text-center">
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
              <div className="mt-8 lg:hidden">
                <p className="text-center mt-4">
                  <span className="text-md text-primary font-semibold md:text-xl">Not a member ?</span>{" "}
                  <Link
                    to={routesPath.REGISTER}
                    className="btn btn-secondary btn-sm rounded-full text-base-100 normal-case md:px-8 ml-1 hover:bg-primary"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </Form>
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
