import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import routesPath from "../../routesPath";
import { getAlerts } from "../../store/alerts";

// Core components
import Alerts from "../../components/common/Alerts";
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
  const alerts = useSelector(getAlerts);

  const handleResetPasword = (credentials) => dispatch(forgotPassword(credentials));
  return (
    <>
      <div className="">
        <div className="mt-10 mx-10">
          {/*logo for responsive mobile*/}
          <div className="mt-4 mb-6 lg:mb-10">
            <img className="w-2/5 lg:w-1/5 m-auto" src={logo_mobile} alt="logo_vwanu" />
          </div>
          <div className="justify-center m-auto md:px-16 lg:px-0 md:w-2/3 lg:w-1/3">
            <Form
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              onSubmit={handleResetPasword}
              className="shadow-lg rounded-3xl my-10"
            >
              <h1 className="card-title text-secondary text-md text-center">Forgot your password?</h1>
              <p className="text-sky-600">{`Enter your email and we'll send you a link to reset your password.`}</p>
              <Alerts className="bg-error mt-4" alerts={alerts} />
              <Field
                required
                autoCapitalize="none"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="new-email"
                className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-600 autofill:text-secondary autofill:bg-blue-200"
                testId="email-error-message"
              />

              <Submit data-testid="forgotPasswordBtn" className="rounded-full text-md" title="Reset Password" />
              <div className="divider">OR</div>
              <Link className="text-primary font-bold mb-10 text-center" to={routesPath.REGISTER}>
                Create New Account
              </Link>
              <Link className="text-primary font-bold mt-10 text-center" to={routesPath.LOGIN}>
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
