import React, { useEffect } from "react";
import * as Yup from "yup";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { Field, Form, Checkbox, Submit } from "../../../components/form";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaGooglePlus } from "react-icons/fa";
import Loader from "../../../components/common/Loader";
import { Link } from "react-router-dom";
import routesPath from "../../../routesPath";
// import { login } from "../authSlice";
import useAuth from "../../../hooks/useAuth";

const FormLogin = () => {
  const { isLoading, error, login } = useAuth();
  console.log(error);

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required().min(6).email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
  });

  const handleLogin = async (credentials) => {
    await login(credentials);
  };

  useEffect(() => {
    if (error !== null) alertService.error(error, { autoClose: true });
  }, [error]);

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
        className="px-2 mt-4 lg:mt-4 lg:mx-2 xl:mx-14 3xl:mx-64"
      >
        <h1 className="card-title pb-2 text-primary font-bold text-xl lg:text-2xl">Sign in to Vwanu</h1>
        <Alert />
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          type="email"
          autoComplete="new-email"
          containerClassName="my-3"
          className="mt-2 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="email-error-message"
        />
        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="Password"
          name="password"
          autoComplete="new-email"
          containerClassName="my-3"
          className="mt-2 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="password-error-message"
          showPassword={true}
        />
        <Checkbox
          name="rememberMe"
          label="Remember me"
          link={
            <Link className="font-semibold hover:text-primary" to={routesPath.FORGOT_PASSWORD}>
              Forgot password
            </Link>
          }
          className=""
        />
        <Submit
          disabled={isLoading ? true : false}
          data-testid="loginBtn"
          className="mt-2 rounded-full text-md btn-md"
          title={
            isLoading ? (
              <div className="flex justify-center">
                <Loader color="black" />
              </div>
            ) : (
              "Login"
            )
          }
        />
        <div className="mt-9 text-center">
          <span className="text-blue-600 text-center inline text-md md:text-lg">
            {` Or sign in with `}
            <Link className="text-blue-500 ml-2" to={"#"}>
              <BsFacebook className="text-2xl inline mx-1" />
            </Link>
            <Link className="text-sky-400" to={"#"}>
              <BsTwitter className="text-2xl inline mx-1" />
            </Link>
            <Link className="text-red-600" to={"/api/oauth/google"}>
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
    </>
  );
};

export default FormLogin;
