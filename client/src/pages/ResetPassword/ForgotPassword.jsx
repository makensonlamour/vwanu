import React from "react";
import * as Yup from "yup";
//import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import routesPath from "../../routesPath";

// Core components
import { Field, Form, Submit } from "../../components/form";
import { forgotPassword } from "../../store/auth";

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
        <div className="grid grid-cols-2 gap-4">
          <div className="place-items-center mx-20">
            <Form
              validationSchema={ValidationSchema}
              initialValues={initialValues}
              onSubmit={handleResetPasword}
              className="shadow-lg rounded-3xl"
            >
              <h1 className="card-title text-orange-500 text-md">Enter your email to reset your password</h1>
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

              <Submit data-testid="forgotPasswordBtn" className="rounded-full text-base-200 text-md" title="Reset Password" />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;
