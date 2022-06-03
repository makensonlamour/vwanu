/*eslint-disable */
import React, { useState } from "react";
import * as Yup from "yup";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useUpdateUser } from "../../user/userSlice";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";

// Core components
import { Field, Select, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { differenceInYears } from "date-fns";

const FormStepTwo = () => {
  const user = useOutletContext();
  const idUser = user?.id;
  const navigate = useNavigate();
  const updateUser = useUpdateUser(["user", "me"], user?.id, undefined, undefined);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    country: "",
    gender: "",
    interestedBy: "",
    birthday: "",
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
    setIsLoading(true);
    const dataObj = {
      country: credentials?.country,
      gender: credentials?.gender,
      interestedBy: credentials?.interestedBy,
      birthday: credentials?.birthday,
      id: idUser,
    };

    try {
      await updateUser.mutateAsync(dataObj);
      navigate("../../" + routesPath.STEP_THREE);
    } catch (e) {
      let customMessage = "An unknown network error has occurred on Vwanu. Try again later.";
      if (e?.response?.status === 400) {
        alertService.error(e?.response?.data?.errors[0]?.message, { autoClose: true });
      } else if (e?.response?.status === 401) {
        customMessage = "Your session has expired. Please login again.";
        alertService.error(customMessage, { autoClose: true });
      } else {
        alertService.error(customMessage, { autoClose: true });
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
        onSubmit={handleStepTwo}
        className="mt-4 lg:shadow-2xl border bg-white border-gray-300 lg:rounded-t-3xl md:px-24 lg:px-10"
      >
        <h1 className="card-title text-black text-center">Create your profile</h1>
        <Alert />
        <Field
          autoCapitalize="none"
          label="Date of Birth"
          placeholder="Date of Birth"
          name="birthday"
          type="date"
          className="mr-1 mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Select
          required
          label="Gender"
          placeholder="Gender"
          name="gender"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
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
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
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
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="country-error-message"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "United States Of America", value: "usa" },
            { id: 2, name: "Dominican Republic", value: "do" },
          ]}
        />
        <Submit className="rounded-2xl text-base-100 text-md w-full ml-auto" title={isLoading ? <Loader /> : "Next"} />{" "}
      </Form>
    </>
  );
};

export default FormStepTwo;
