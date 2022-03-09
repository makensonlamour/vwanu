import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import routesPath from "../../routesPath";
import { getAlerts } from "../../store/alerts";

// Core components
import Alerts from "../../components/common/Alerts";
import { Field, Checkbox, Form, Submit } from "../../components/form";
import { createUser } from "../../store/auth";
import logo from "../../assets/images/Asset_3.png";
import WelcomeImg from "../../assets/images/welcome.png";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaGooglePlus } from "react-icons/fa";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  termOfUse: Yup.bool().oneOf([true], "You must accept the terms of use and the policy privacy"),
});

const initialValues = {
  email: "",
  password: "",
  termOfUse: false,
};

const LoginScreen = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(getAlerts);
  const handleRegister = (credentials) => dispatch(createUser(credentials));
  return (
    <>
      <div className="grid grid-cols-1 lg:mb-28 lg:grid-cols-2 lg:gap-4 xl:mx-36 2xl:mx-96">
        <div className="lg:justify-center">
          <div className="bg-gradient-to-tr from-blue-400 to-secondary h-96 z-0 lg:rounded-t-3xl lg:h-[70%] lg:m-6">
            <p className="text-center pt-14 text-base-100 text-2xl py-5">
              <img className="w-1/3 m-auto" src={logo} alt="logo_vwanu" />
            </p>
            <p className="text-5xl text-v-yellow-dark font-bold py-8 text-center">Hello</p>
            <p className="hidden lg:block text-base-100 text-xl font-semibold text-center pb-2">Share your Voice and Change</p>
            <p className="hidden lg:block text-base-100 text-xl font-semibold text-center">The Haitian Community!</p>
          </div>
          <div className="hidden lg:block bg-v-yellow rounded-b-3xl rounded-tr-[130px] h-[40%] -mt-[9rem] m-6"></div>
          <div className="hidden lg:block mr-20 z-50 -mt-[375px]">
            {" "}
            <img className="object-fit" src={WelcomeImg} alt="young_people" />
          </div>
        </div>

        <div className="place-items-center bg-base-100 shadow-t-2xl rounded-t-[30px] px-8 -mt-28 z-10 lg:mt-6 lg:mx-10 md:mx-36 2xl:px-24">
          <div className="lg:place-content-center lg:mt-8 lg:mb-5">
            <p className="text-center mt-10">
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
          <div className="hidden lg:block mb-8 text-center">
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
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={handleRegister}
            className="mt-4 lg:shadow-2xl lg:rounded-t-3xl"
          >
            <h1 className="card-title text-primary font-bold text-xl lg:text-2xl">Join the Vwanu Community</h1>
            <Alerts className="bg-red-200" alerts={alerts} />
            <div className="grid grid-cols-2">
              <Field
                autoCapitalize="none"
                placeholder="First Name"
                name="firstName"
                type="text"
                autoComplete="new-email"
                className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-error autofill:text-secondary autofill:bg-blue-200"
                testId="firstName-error-message"
              />
              <Field
                autoCapitalize="none"
                placeholder="Last Name"
                name="lastName"
                type="text"
                autoComplete="new-email"
                className="ml-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-error autofill:text-secondary autofill:bg-blue-200"
                testId="lastName-error-message"
              />
            </div>
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

            <Field
              autoCapitalize="none"
              autoCorrect="false"
              placeholder="Confirm Password"
              name="confirmPassword"
              autoComplete="new-email"
              className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-error autofill:text-secondary autofill:bg-blue-200"
              testId="confirmPassword-error-message"
              showPassword={true}
            />

            <Checkbox required name="termOfUse" label={`I Agree with Privacy and Policy`} className="" testId="termOfUse-error-message" />

            <Submit data-testid="registerBtn" className="rounded-full text-md btn-md" title="Sign Up" />
          </Form>
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
      <div className="bg-gray-100 shadow-lg rounded-t-lg lg:mx-6 px-6 py-6 mt-10">
        <span className="text-secondary font-semibold">Language:</span>
      </div>
    </>
  );
};

export default LoginScreen;
