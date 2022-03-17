import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import routesPath from "../../../routesPath";

//RTK query
import { useLoginMutation } from "../../api/apiSlice";
import { logged } from "../../auth/authSlice";
import { getAlerts, setAlert, removeAlert } from "../../alert/alertSlice";

// Core components
import Alerts from "../../../components/common/Alerts";
import { Field, Form, Checkbox, Submit } from "../../../components/form";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaGooglePlus } from "react-icons/fa";
import Loader from "../../../components/common/Loader";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const FormLogin = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(getAlerts);
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const id = uuidv4();

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials).unwrap();
      if (isError || error) {
        dispatch(logged(false));
        console.log("error:" + error + "| isError:" + isError);
      } else {
        dispatch(logged(data));
      }
    } catch (e) {
      let customMessage = ["Your email or password is incorrect", "An unknown network error has occurred on Vwanu. Try again later."];
      if (e.data === "Unauthorized") {
        dispatch(
          setAlert({
            msg: customMessage[0],
            id,
            type: "error",
          })
        );

        // Setting a sec for each 10 words
        setTimeout(() => dispatch(removeAlert(id)), customMessage[0].length * 200);
      } else {
        dispatch(
          setAlert({
            msg: customMessage[1],
            id,
            type: "error",
          })
        );

        // Setting a sec for each 10 words
        setTimeout(() => dispatch(removeAlert(id)), customMessage[1].length * 200);
      }
    }
  };
  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
        className="mt-4 lg:shadow-2xl lg:rounded-t-3xl"
      >
        <h1 className="card-title text-primary font-bold text-xl lg:text-2xl">Sign in to Vwanu</h1>
        <Alerts className="bg-error" alerts={alerts} />
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          type="email"
          autoComplete="new-email"
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="email-error-message"
        />
        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="Password"
          name="password"
          autoComplete="new-email"
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="password-error-message"
          showPassword={true}
        />
        <Checkbox
          name="rememberMe"
          label="Remember me"
          link={
            <Link className="text-primary font-bold hover:text-secondary" to={routesPath.FORGOT_PASSWORD}>
              Forgot password
            </Link>
          }
          className=""
        />

        <Submit data-testid="loginBtn" className="rounded-full text-md btn-md" title={isLoading ? <Loader /> : "Login"} />
        <div className="mt-9 text-center">
          <span className="text-blue-600 text-center inline text-md md:text-lg">
            {` Or sign in with `}
            <Link className="text-blue-500 ml-2" to={"#"}>
              <BsFacebook className="text-2xl inline mx-1" />
            </Link>
            <Link className="text-sky-400" to={"#"}>
              <BsTwitter className="text-2xl inline mx-1" />
            </Link>
            <Link className="text-red-600" to={"#"}>
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
