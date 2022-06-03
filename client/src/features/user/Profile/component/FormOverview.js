import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { differenceInYears } from "date-fns";
import { Field, Select, Form, Submit } from "../../../../components/form";
import Loader from "../../../../components/common/Loader";
import { useUpdateUser } from "../../userSlice";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const FormOverview = ({ user }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);

  const initialValues = {
    firstName: user ? user?.firstName : "",
    lastName: user ? user?.lastName : "",
    gender: user ? user?.gender : "",
    birthday: user ? user?.birthday : "",
    language: user ? user?.language : "",
    interestedBy: user ? user?.interestedBy : "",
    about: user ? user?.about : "",
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    gender: Yup.string().nullable().required().label("Gender"),
    interestedBy: Yup.string().nullable().label("Interest By"),
    birthday: Yup.date()
      .test(
        "birthday",
        "You should have 13 years old minimum to have an account on Vwanu ",
        (val) => differenceInYears(new Date(), val) >= 13
      )
      .required()
      .label("Date of Birth"),
    language: Yup.string().nullable().label("Language"),
    about: Yup.string().nullable().label("About"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = {
      id: user?.id,
      firstName: dataObj?.firstName,
      lastName: dataObj?.lastName,
      birthday: dataObj?.birthday,
      gender: dataObj?.gender,
      interestedBy: dataObj?.interestedBy,
      language: dataObj?.language,
    };

    try {
      await updateUser?.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries();
      window.location.reload();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full -px-4">
        <Toaster />
        <Field
          autoCapitalize="none"
          placeholder="First Name"
          label="First Name"
          name="firstName"
          type="text"
          className="w-full mt-1 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          placeholder="First Name"
          label="Last Name"
          name="lastName"
          type="text"
          className="w-full mt-1 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Date of Birth"
          placeholder="Date of Birth"
          name="birthday"
          type="date"
          className="w-full mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Select
          label="Gender"
          placeholder="Gender"
          name="gender"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="gender-error-message"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "male", value: "m" },
            { id: 2, name: "female", value: "f" },
          ]}
        />
        <Select
          label="Interest By"
          placeholder="Interest By"
          name="interestedBy"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="interestBy-error-message"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "male", value: "m" },
            { id: 2, name: "female", value: "f" },
          ]}
        />
        <Select
          label="Language"
          placeholder="Language"
          name="language"
          className="mt-1 lg:mt-2 mb-4 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "English", value: "en" },
            { id: 2, name: "Espanol", value: "es" },
          ]}
        />
        {/*}
        <Field
          autoCapitalize="none"
          placeholder="About"
          label="About"
          name="about"
          type="text"
          className="w-full mt-1 mb-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
  {*/}
        <Submit className="w-full rounded-2xl text-base-100 text-md md:w-1/4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormOverview.propTypes = {
  user: Proptypes.object,
};

export default FormOverview;
