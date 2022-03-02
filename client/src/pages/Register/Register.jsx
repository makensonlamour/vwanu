import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import routesPath from "../../routesPath";

// Core components
import { Field, Checkbox, Form, Submit } from "../../components/form";
import { createUser } from "../../store/auth";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  termOfUse: Yup.bool().oneOf([true], "You must accept the terms of use and the policy privacy")
});

const initialValues = {
  email: "",
  password: "",
  termOfUse: false
};

const LoginScreen = () => {
  const dispatch = useDispatch();
  const handleRegister = (credentials) => dispatch(createUser(credentials));
  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-4">
          <div className="justify-center">
            <div className="bg-yellow-400 rounded-br-[300px] h-screen">
              <div className="bg-blue-600 h-4/6 rounded-br-full rounded-bl-[5000px]">
                <p className="text-center text-white text-2xl py-5">Logo VWANU</p>
                <p className="text-5xl text-yellow-500 font-bold py-10 text-center">Welcome</p>
                <p className="text-white text-xl font-semibold text-center">Share your Voice and Change</p>
                <p className="text-white text-xl font-semibold text-center">The Haitian Community!</p>
              </div>
            </div>
          </div>

          <div className="place-items-center mx-20">
            <div className="place-content-end my-8">
              <p className="text-right">
                <span className="text-orange-500 text-lg font-semibold">Already have an account ?</span>{" "}
                <Link
                  data-testid="loginBtn"
                  to={routesPath.LOGIN}
                  className="btn btn-sm btn-primary px-8 ml-1 rounded-full text-base-200 normal-case"
                >
                  Login
                </Link>
              </p>
            </div>
            <Form
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              onSubmit={handleRegister}
              className="shadow-lg rounded-3xl"
            >
              <h1 className="card-title text-orange-500">Register to Vwanu</h1>
              <Field
                required
                autoCapitalize="none"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
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
                className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
                testId="password-error-message"
              />

              <Checkbox
                required
                name="termOfUse"
                label="I accept the terms of use and the policy privacy"
                className=""
                testId="termOfUse-error-message"
              />

              <Submit data-testid="registerBtn" className="rounded-full text-base-200 text-md" title="Register" />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
