import React, { Fragment, useEffect } from "react";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";

// Core components
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { Field, Form, Checkbox, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label("First Name"),
  lastName: Yup.string().required().min(3).label("Last Name"),
  email: Yup.string().required().min(6).email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must be match"),
  termOfUse: Yup.bool().oneOf([true], "You must accept the terms of use and the policy privacy"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  termOfUse: false,
};

let trigger = false;

const FormRegister = () => {
  const { isLoading, error, signup } = useAuth();

  function reloadPage() {
    window.location.reload();
  }

  const handleRegister = async (credentials) => {
    trigger = true;
    try {
      await signup(credentials);
      // alertService.error(error, { autoClose: true });
      reloadPage();
    } catch (e) {
      console.log("error", e);
      // if (e.response.status === 400) {
      //   alertService.error("This email is already existed. Try with a different one", { autoClose: true });
      // } else {
      //   alertService.error("An unknown network error has occurred on Vwanu. Try again later.", { autoClose: true });
      // }
    }
  };

  useEffect(() => {
    if (error !== null) {
      alertService.error(error, { autoClose: true });
      if (error && error.includes("400")) {
        alertService.error("This email is already existed. Try with a different one", { autoClose: true });
      } else {
        alertService.error("An unknown network error has occurred on Vwanu. Try again later.", { autoClose: true });
      }
    }
    if (trigger && error === null) window.location.reload();
  }, [error]);

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleRegister}
        className="mt-4 lg:mt-0 lg:mx-2 xl:mx-14 3xl:mx-64"
      >
        <h1 className="card-title pb-4 text-primary font-bold text-xl lg:text-2xl">Join the Vwanu Community</h1>
        <Alert />
        <div className="grid grid-cols-2">
          <Field
            required
            autoCapitalize="none"
            placeholder="First Name"
            name="firstName"
            type="text"
            autoComplete="new-email"
            containerClassName="my-4"
            className="mr-1 mt-1 lg:mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
            testId="firstName-error-message"
          />
          <Field
            required
            autoCapitalize="none"
            placeholder="Last Name"
            name="lastName"
            type="text"
            autoComplete="new-email"
            containerClassName="my-4"
            className="ml-1 mt-1 lg:mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
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
          containerClassName="my-4"
          className="mt-1 lg:mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="email-error-message"
        />
        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="Password"
          name="password"
          autoComplete="new-email"
          containerClassName="my-4"
          className="mr-1 mt-1 lg:mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
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
          className="mr-1 mt-1 lg:mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="passwordConfirmation-error-message"
          showPassword={true}
        />

        <Checkbox
          required
          name="termOfUse"
          label={
            <Fragment>
              <span>
                {"I Agree with the"}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="../../terms-conditions" className="font-semibold hover:text-primary">
                  {" terms and conditions "}
                </a>
                {" , "}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="../../privacy-policy" className="font-semibold hover:text-primary">
                  {" privacy policy "}
                </a>

                {" & "}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="../../community-guidelines" className="font-semibold hover:text-primary">
                  {" Community Guidelines. "}
                </a>
              </span>
            </Fragment>
          }
          className=""
          testId="termOfUse-error-message"
        />

        <Submit
          disabled={isLoading ? true : false}
          data-testid="registerBtn"
          className="rounded-full text-md btn-md"
          title={
            isLoading ? (
              <div className="flex justify-center">
                <Loader color="black" />
              </div>
            ) : (
              "Sign Up"
            )
          }
        />
      </Form>
    </>
  );
};

export default FormRegister;
