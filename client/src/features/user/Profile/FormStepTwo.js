import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext } from "react-router-dom";

//RTK query
import { useUpdateUserMutation } from "../../api/apiSlice";
import { getAlerts, setAlert, removeAlert } from "../../alert/alertSlice";

// Core components
import Alerts from "../../../components/common/Alerts";
import { Field, Select, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { differenceInYears } from "date-fns";

const FormStepTwo = () => {
  const dataUser = useOutletContext();
  const idUser = dataUser.user.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alerts = useSelector(getAlerts);
  const [updateUser, { isLoading, data, isSuccess }] = useUpdateUserMutation();
  const id = uuidv4();

  const initialValues = {
    country: "",
    gender: "",
    interestedBy: "",
    birthday: "",
    idUser,
  };

  const ValidationSchema = Yup.object().shape({
    country: Yup.string().required().label("Country"),
    gender: Yup.string().required().label("Gender"),
    interestedBy: Yup.string().required().label("Interest By"),
    birthday: Yup.date()
      .test(
        "birthday",
        "You should have 13 years old minimum to have an account on Vwanu ",
        (val) => differenceInYears(new Date(), val) >= 13
      )
      .required()
      .label("Date of Birth"),
  });

  const handleStepTwo = async (credentials) => {
    console.log(credentials);
    try {
      await updateUser(credentials).unwrap();
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

  if (isSuccess) {
    navigate("../../" + routesPath.STEP_THREE, { state: data });
  }

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleStepTwo}
        className="mt-4 lg:shadow-2xl lg:rounded-t-3xl md:px-24 lg:px-10"
      >
        <h1 className="card-title text-secondary text-center">Create your profile</h1>
        <Alerts className="bg-error" alerts={alerts} />
        <Field
          autoCapitalize="none"
          label="Date of Birth"
          placeholder="Date of Birth"
          name="birthday"
          type="date"
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Select
          required
          label="Gender"
          placeholder="Gender"
          name="gender"
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="gender-error-message"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "male", value: "m" },
            { id: 2, name: "female", value: "f" },
          ]}
        />
        <Select
          required
          label="Interest By"
          placeholder="Interest By"
          name="interestedBy"
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="interestBy-error-message"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "male", value: "m" },
            { id: 2, name: "female", value: "f" },
          ]}
        />
        <Select
          required
          label="Country"
          placeholder="Country"
          name="country"
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          testId="country-error-message"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "United States Of America", value: "usa" },
            { id: 2, name: "Dominican Republic", value: "do" },
          ]}
        />
        <Submit className="rounded-full text-base-100 text-md w-2/5 ml-auto" title={isLoading ? <Loader /> : "Next"} />{" "}
      </Form>
    </>
  );
};

export default FormStepTwo;
