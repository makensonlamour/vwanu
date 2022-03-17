import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import routesPath from "../../../routesPath";
import { useNavigate } from "react-router-dom";

//RTK query
import { useRegisterMutation } from "../../api/apiSlice";
import { logged } from "../authSlice";
import { getAlerts, setAlert, removeAlert } from "../../alert/alertSlice";

// Core components
import Alerts from "../../../components/common/Alerts";
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

const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alerts = useSelector(getAlerts);
  const [login, { isLoading }] = useRegisterMutation();
  const id = uuidv4();

  const handleRegister = async (credentials) => {
    try {
      const data = await login(credentials).unwrap();
      if (data) {
        dispatch(logged(data));
        navigate(routesPath.STEP_TWO, { state: data });
      }
    } catch (e) {
      let customMessage = [
        "This email is already existed. Try with a different one",
        "An unknown network error has occurred on Vwanu. Try again later.",
      ];

      if (e.status === 400) {
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
        initialValues={initialValues}
        onSubmit={handleRegister}
        className="mt-4 lg:shadow-2xl lg:rounded-t-3xl"
      >
        <h1 className="card-title text-primary font-bold text-xl lg:text-2xl">Join the Vwanu Community</h1>
        <Alerts className="bg-error" alerts={alerts} />
        <div className="grid grid-cols-2">
          <Field
            required
            autoCapitalize="none"
            placeholder="First Name"
            name="firstName"
            type="text"
            autoComplete="new-email"
            className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
            testId="firstName-error-message"
          />
          <Field
            required
            autoCapitalize="none"
            placeholder="Last Name"
            name="lastName"
            type="text"
            autoComplete="new-email"
            className="ml-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
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
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="passwordConfirmation-error-message"
          showPassword={true}
        />

        <Checkbox required name="termOfUse" label={`I Agree with Privacy and Policy`} className="" testId="termOfUse-error-message" />

        <Submit data-testid="registerBtn" className="rounded-full text-md btn-md" title={isLoading ? <Loader /> : "Sign Up"} />
      </Form>
    </>
  );
};

export default FormRegister;
