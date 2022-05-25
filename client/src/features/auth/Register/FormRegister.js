import React from "react";
import * as Yup from "yup";
// import routesPath from "../../../routesPath";
// import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
// import { register } from "../authSlice";
import useAuth from "../../../hooks/useAuth";

// Core components
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { Field, Form, Checkbox, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { saveToken } from "../../../helpers/index";

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
  const queryClient = useQueryClient();
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading, error, signup } = useAuth();

  // const navigate = useNavigate();

  function reloadPage() {
    window.location.reload();
  }

  const handleRegister = async (credentials) => {
    // setIsLoading(true);
    try {
      const res = await signup(credentials);
      alertService.error(error, { autoClose: true });

      if (res?.data?.data) {
        saveToken(res.data.data.token);
        reloadPage();
        // navigate("../" + routesPath.LOGIN, { state: res.data.data.user });
        queryClient.invalidateQueries();
      } else {
        alertService.error("This email is already existed. Try with a different one", { autoClose: true });
      }
    } catch (e) {
      if (e.response.status === 400) {
        alertService.error("This email is already existed. Try with a different one", { autoClose: true });
      } else {
        alertService.error("An unknown network error has occurred on Vwanu. Try again later.", { autoClose: true });
      }
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleRegister}
        className="mt-4 lg:mt-0 lg:mx-2 xl:mx-14 3xl:mx-64"
      >
        <h1 className="card-title text-primary font-bold text-xl lg:text-2xl">Join the Vwanu Community</h1>
        <Alert />
        <div className="grid grid-cols-2">
          <Field
            required
            autoCapitalize="none"
            placeholder="First Name"
            name="firstName"
            type="text"
            autoComplete="new-email"
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
          className="mr-1 mt-1 lg:mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
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
