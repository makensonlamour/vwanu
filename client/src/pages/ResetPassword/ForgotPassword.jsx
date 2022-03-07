import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import routesPath from "../../routesPath";

// Core components
import { Field, Form, Submit } from "../../components/form";
import { forgotPassword } from "../../store/auth";
import logo_mobile from "../../assets/images/Asset_2.png";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).email().label("Email"),
});

const initialValues = {
  email: "",
};
const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();

  const handleResetPasword = (credentials) => dispatch(forgotPassword(credentials));
  return (
    <>
      <div className="">
        <div className="mt-10 mx-10">
          {/*logo for responsive mobile*/}
          <div className="mt-4 mb-6 lg:mb-10">
            <img className="w-2/5 lg:w-1/5 m-auto" src={logo_mobile} alt="logo_vwanu" />
          </div>
          <div className="justify-center m-auto lg:w-1/3">
            <Form
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              onSubmit={handleResetPasword}
              className="shadow-lg rounded-3xl my-10"
            >
              <h1 className="card-title text-orange-500 text-md text-center">Forgot your password?</h1>
              <p className="text-gray-600">{`Enter your email and we'll send you a link to reset your password.`}</p>
              <Field
                required
                autoCapitalize="none"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                className="bg-blue-200 text-blue-600 font-semibold rounded-full px-6 input-primary border-none"
                testId="email-error-message"
              />

              <Submit data-testid="forgotPasswordBtn" className="rounded-full text-base-200 text-md" title="Reset Password" />
              <div className="divider">OR</div>
              <Link className="text-orange-500 font-bold mb-10 text-center" to={routesPath.REGISTER}>
                Create New Account
              </Link>
              <Link className="text-orange-500 font-bold mt-10 text-center" to={routesPath.LOGIN}>
                Back to Login
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;
