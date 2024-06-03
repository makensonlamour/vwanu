import React, { useEffect } from "react";
import * as Yup from "yup";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { Field, Form, Submit } from "../../../components/form";
// import { BsFacebook, BsTwitter } from "react-icons/bs";
// import { FaGooglePlus } from "react-icons/fa";
import Loader from "../../../components/common/Loader";
import useAuth from "../../../hooks/useAuth";

const FormLockscreen = () => {
  const { isLoading, error, login } = useAuth();
  console.log(error);

  const ValidationSchema = Yup.object().shape({
    // email: Yup.string().required().min(6).email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
    // rememberMe: Yup.bool(),
  });

  const handleLogin = async (credentials) => {
    // localStorage.setItem("rememberMe", credentials.rememberMe);
    const saveEmail = localStorage.getItem("email");
    const obj = { email: saveEmail, password: credentials.password };
    await login(obj);
  };

  useEffect(() => {
    if (error !== null) alertService.error(error, { autoClose: true });
  }, [error]);

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          //   email: "",
          password: "",
          //   rememberMe: false,
        }}
        onSubmit={handleLogin}
        className=""
      >
        <Alert />

        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="Password"
          name="password"
          autoComplete="new-email"
          containerClassName="my-3"
          className="mt-2 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="password-error-message"
          showPassword={true}
        />

        <Submit
          disabled={isLoading ? true : false}
          data-testid="loginBtn"
          className="mt-2 rounded text-md btn-md"
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
      </Form>
    </>
  );
};

export default FormLockscreen;
