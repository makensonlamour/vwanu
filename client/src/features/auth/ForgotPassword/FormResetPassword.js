import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import routesPath from "../../../routesPath";

//RTK query
import { useResetPasswordMutation } from "../../api/apiSlice";
import { getAlerts, setAlert, removeAlert } from "../../alert/alertSlice";

// Core components
import Alerts from "../../../components/common/Alerts";
import { Field, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";

const ValidationSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label("Password"),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must be match"),
});

const FormResetPassword = () => {
  const { idUser, resetPasswordKey } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    passwordConfirmation: "",
    idUser,
    resetPasswordKey,
  };

  const alerts = useSelector(getAlerts);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const id = uuidv4();

  const handleResetPasword = async (credentials) => {
    try {
      const data = await resetPassword(credentials).unwrap();
      if (data) {
        navigate(routesPath.LOGIN);
      }
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
        <h1 className="card-title text-secondary text-md text-center">Create New password</h1>
        <Alerts className="bg-error mt-4" alerts={alerts} />
        <Field
          required
          autoCapitalize="none"
          autoCorrect="false"
          placeholder="New Password"
          name="password"
          autoComplete="new-email"
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
          className="mr-1 mt-1 mb-2 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="passwordConfirmation-error-message"
          showPassword={true}
        />

        <Submit data-testid="forgotPasswordBtn" className="rounded-full text-md" title={isLoading ? <Loader /> : "Change Password"} />
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

export default FormResetPassword;
