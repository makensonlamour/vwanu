import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { differenceInYears } from "date-fns";
import { useQueryClient } from "react-query";

import { Field, Select, Telephone, Form, Submit } from "../../../../components/form";
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

const FormContactInfo = ({ user }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);

  const initialValues = {
    telephone: user ? user?.telephone : "",
    instagram: user ? user?.instagram : "",
    twitter: user ? user?.twitter : "",
    facebook: user ? user?.facebook : "",
    website: user ? user?.website : "",
    gender: user ? user?.gender : "",
    birthday: user ? user?.birthday : "",
    language: user ? user?.language : "",
    interestedBy: user ? user?.interestedBy : "",
  };

  const ValidationSchema = Yup.object().shape({
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
    telephone: Yup.string().nullable().label("Telephone"),
    instagram: Yup.string().nullable().label("Instagram"),
    facebook: Yup.string().nullable().label("Facebook"),
    twitter: Yup.string().nullable().label("Twitter"),
    website: Yup.string().nullable().label("Website"),
    language: Yup.string().nullable().label("Language"),
    about: Yup.string().nullable().label("About"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = {
      id: user?.id,
      telephone: dataObj?.telephone,
      instagram: dataObj?.instagram,
      twitter: dataObj?.twitter,
      website: dataObj?.website,
      gender: dataObj?.gender,
      birthday: dataObj?.birthday,
      language: dataObj?.language,
      interestedBy: dataObj?.interestedBy,
    };

    try {
      await updateUser.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries(["user", "me"]);
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
        <Toaster />
        <div className="pb-6">
          <h3 className="text-primary text-lg">Basic Info</h3>
          <Field
            autoCapitalize="none"
            label="Date of Birth"
            placeholder="Date of Birth"
            name="birthday"
            type="date"
            className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
          />
          <Select
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
            label="Language"
            placeholder="Language"
            name="language"
            className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
            options={[
              { id: 0, name: "Not Specified", value: "" },
              { id: 1, name: "English", value: "en" },
              { id: 2, name: "Espanol", value: "es" },
            ]}
          />
        </div>
        <h3 className="text-primary text-lg">Contact Info</h3>
        <Telephone
          label="Telephone"
          name="telephone"
          countryCode={user?.country}
          className="mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Field
          autoCapitalize="none"
          label="Facebook"
          placeholder="Facebook"
          name="facebook"
          type="text"
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Field
          autoCapitalize="none"
          label="Twitter"
          placeholder="Twitter"
          name="twitter"
          type="text"
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Field
          autoCapitalize="none"
          label="Instagram"
          placeholder="Instagram"
          name="instagram"
          type="text"
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Field
          autoCapitalize="none"
          label="Website"
          placeholder="Website"
          name="website"
          type="text"
          className="mr-1 mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Submit className="rounded-full text-base-100 text-md w-full ml-auto mt-2" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormContactInfo.propTypes = {
  user: Proptypes.object,
};

export default FormContactInfo;
