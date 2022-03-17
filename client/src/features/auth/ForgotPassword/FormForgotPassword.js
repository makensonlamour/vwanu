import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import routesPath from "../../../routesPath";

//RTK query
import { useForgotPasswordMutation } from "../../api/apiSlice";
import { getAlerts, setAlert, removeAlert } from "../../alert/alertSlice";

// Core components
import Alerts from "../../../components/common/Alerts";
import { Field, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().min(6).email().label("Email"),
});

const initialValues = {
  email: "",
};

const FormForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alerts = useSelector(getAlerts);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const id = uuidv4();

  const handleResetPasword = async (credentials) => {
    try {
      const data = await forgotPassword(credentials).unwrap();
      navigate(routesPath.FORGOT_PASSWORD_SUCCESS, { state: data, email: credentials.email });
    } catch (e) {
      console.log();
      let customMessage = "An unknown network error has occurred on Vwanu. Try again later.";
      if (e.status === 400) {
        dispatch(
          setAlert({
            msg: e.data.errors[0].message,
            id,
            type: "error",
          })
        );

        // Setting a sec for each 10 words
        setTimeout(() => dispatch(removeAlert(id)), e.data.errors[0].message.length * 200);
      } else {
        dispatch(
          setAlert({
            msg: customMessage,
            id,
            type: "error",
          })
        );

        // Setting a sec for each 10 words
        setTimeout(() => dispatch(removeAlert(id)), customMessage.length * 200);
      }
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

        <Submit data-testid="forgotPasswordBtn" className="rounded-full text-md" title={isLoading ? <Loader /> : "Reset Password"} />
        <div className="divider">OR</div>
        <Link className="text-primary font-bold mb-10 text-center" to={routesPath.REGISTER}>
          Create New Account
        </Link>
        <Link className="text-primary font-bold mt-10 text-center" to={routesPath.LOGIN}>
          Back to Login
        </Link>
      </Form>
    </>
  );
};

export default FormForgotPassword;
