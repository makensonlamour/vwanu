import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import routesPath from "../../../routesPath";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { useForgotPassword } from "../../auth/authSlice";
import { FormattedMessage } from "react-intl";

// Core components
import { Field, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";

const FormForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPassword = useForgotPassword(["forgot", "password"], undefined, undefined);
  const [isLoading, setIsLoading] = useState(false);
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required().min(6).email().label("Email"),
  });

  const initialValues = {
    email: "",
  };

  const handleForgotPasword = async (credentials) => {
    setIsLoading(true);
    try {
      await forgotPassword.mutateAsync({ action: "sendResetPwd", value: { email: credentials?.email } });
      navigate(routesPath.FORGOT_PASSWORD_SUCCESS, { state: forgotPassword.data, email: credentials.email });
    } catch (e) {
      if (e?.response?.status === 400) {
        alertService.error(e?.response?.data?.errors[0]?.message, { autoClose: true });
      } else {
        alertService.error("An unknown network error has occurred on Vwanu. Try again later.", { autoClose: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleForgotPasword}
        className="shadow-lg rounded-3xl my-10 bg-white"
      >
        <div className="flex justify-center">
          <h1 className="card-title text-secondary text-md text-center pb-2">
            {" "}
            <FormattedMessage id="forgotPassword.forgotPaswordText" defaultMessage="Forgot your password?" description="" />
          </h1>
        </div>
        <p className="">
          <FormattedMessage
            id="forgotPassword.forgotPaswordText"
            defaultMessage="Enter your email and we'll send you a link to reset your password."
            description=""
          />
        </p>
        <Alert />
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          type="email"
          autoComplete="new-email"
          containerClassName="my-4"
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-600 autofill:text-secondary autofill:bg-blue-200"
          testId="email-error-message"
        />

        <Submit
          disabled={isLoading ? true : false}
          data-testid="forgotPasswordBtn"
          className="rounded-full text-md py-2"
          title={
            isLoading ? (
              <div className="flex justify-center">
                <Loader color="black" />
              </div>
            ) : (
              <FormattedMessage id="forgotPassword.resetPaswordBtn" defaultMessage="Reset Password" description="" />
            )
          }
        />
        <div className="divider">
          <FormattedMessage id="general.orText" defaultMessage="OR" description="" />
        </div>
        <Link className="hover:text-primary font-semibold mb-10 text-center" to={routesPath.REGISTER}>
          <FormattedMessage id="forgotPassword.createAccount" defaultMessage="Create New Account" description="" />
        </Link>
        <Link className="text-primary font-bold mt-10 text-center" to={routesPath.LOGIN}>
          <FormattedMessage id="forgotPassword.backToLogin" defaultMessage="Back to Login" description="" />
        </Link>
      </Form>
    </>
  );
};

export default FormForgotPassword;
