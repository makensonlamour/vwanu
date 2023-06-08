import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import routesPath from "../../../routesPath";
import { useResetPassword } from "../../auth/authSlice";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { Field, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { FormattedMessage } from "react-intl";

const ValidationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must be match"),
});

const FormResetPassword = () => {
  const { idUser, resetPasswordKey } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    password: "",
    passwordConfirmation: "",
    idUser,
    resetPasswordKey,
  };

  const resetPassword = useResetPassword(["reset", "password"], { idUser, resetPasswordKey }, undefined, undefined);

  const handleResetPasword = async (credentials) => {
    setIsLoading(true);
    try {
      const data = await resetPassword.mutateAsync(credentials);
      if (data) {
        navigate(routesPath.LOGIN);
      }
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
        onSubmit={handleResetPasword}
        className="shadow-lg rounded-3xl my-10"
      >
        <h1 className="card-title text-secondary text-md text-center">
          <FormattedMessage id="resetPassword.createNewPassword" defaultMessage="Create New password" description="" />
        </h1>
        <Alert />
        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="New Password"
          name="password"
          autoComplete="new-email"
          containerClassName="my-4"
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="password-error-message"
          showPassword={true}
        />

        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="Password Confirmation"
          name="passwordConfirmation"
          autoComplete="new-email"
          containerClassName="my-4"
          className="mr-1 mt-1 mb-2 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="passwordConfirmation-error-message"
          showPassword={true}
        />

        <Submit
          data-testid="forgotPasswordBtn"
          className="rounded-full text-md"
          title={
            isLoading ? (
              <Loader />
            ) : (
              <FormattedMessage id="resetPassword.createNewPassword" defaultMessage="Change Password" description="" />
            )
          }
        />
        <div className="divider">
          {" "}
          <FormattedMessage id="general.orText" defaultMessage="OR" description="" />
        </div>
        <Link className="text-primary font-bold mb-10 text-center" to={routesPath.REGISTER}>
          <FormattedMessage id="forgotPassword.createAccount" defaultMessage="Create New Account" description="" />
        </Link>
        <Link className="text-primary font-bold mt-10 text-center" to={routesPath.LOGIN}>
          <FormattedMessage id="forgotPassword.backToLogin" defaultMessage="Back to Login" description="" />
        </Link>
      </Form>
    </>
  );
};

export default FormResetPassword;
