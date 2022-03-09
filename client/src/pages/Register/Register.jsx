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
import logo_mobile from "../../assets/images/Asset_2.png";

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
      <div className="">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="hidden lg:justify-center lg:block">
            <div className="bg-blue-600 rounded-t-3xl h-[90%] m-6">
              <p className="text-center text-white text-2xl py-5">
                <img className="w-1/3 m-auto" src={logo} alt="logo_vwanu" />
              </p>
              <p className="text-5xl text-yellow-500 font-bold py-8 text-center">Welcome</p>
              <p className="text-white text-xl font-semibold text-center pb-2">Share your Voice and Change</p>
              <p className="text-white text-xl font-semibold text-center">The Haitian Community!</p>
            </div>
            <div className="bg-yellow-400 rounded-b-3xl rounded-tr-[130px] h-[50%] -mt-[9rem] m-6"></div>
          </div>

          <div className="place-items-center mx-10 md:mx-20">
            {/*logo for responsive mobile*/}
            <div className="mt-4 mb-6 lg:hidden">
              <img className="w-2/5 m-auto" src={logo_mobile} alt="logo_vwanu" />
            </div>
            <div className="place-content-end my-8">
              <p className="text-center mt-4">
                <span className="text-md text-orange-500 font-semibold md:text-2x">Already have an account ?</span>{" "}
                <Link
                  data-testid="loginBtn"
                  to={routesPath.LOGIN}
                  className="btn btn-primary btn-sm rounded-full text-base-200 normal-case md:px-8 ml-1"
                >
                  Login
                </Link>
              </p>
            </div>
            <Form
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              onSubmit={handleRegister}
              className="shadow-2xl rounded-3xl"
            >
              <h1 className="card-title text-orange-500">Register to Vwanu</h1>
              <Alerts className="bg-red-200" alerts={alerts} />
              <Field
                required
                autoCapitalize="none"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                className="bg-blue-200 text-blue-600 font-semibold rounded-full input-primary border-none lg:input-lg"
                testId="email-error-message"
              />
              <Field
                required
                autoCapitalize="none"
                autoCorrect="false"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="new-email"
                className="mt-2 bg-blue-200 text-blue-600 font-semibold rounded-full input-primary border-none md:px-6 lg:input-lg"
                testId="password-error-message"
              />

              <Checkbox
                required
                name="termOfUse"
                label="I accept the terms of use and the policy privacy"
                className=""
                testId="termOfUse-error-message"
              />

              <Submit data-testid="registerBtn" className="rounded-full text-base-200 text-md btn-sm lg:btn-md" title="Register" />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
