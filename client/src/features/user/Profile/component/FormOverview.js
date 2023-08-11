import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { differenceInYears } from "date-fns";
import { Field, Select, MultiSelect, Form, Submit } from "../../../../components/form";
import Loader from "../../../../components/common/Loader";
import { useUpdateUser } from "../../userSlice";
import { assignValue } from "./../../../../helpers/index";
import { useGetInterestList } from "./../../../interest/interestSlice";

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
  const [interest, setInterest] = useState([]);
  let removeInterest = [];

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const { data: interestList } = useGetInterestList(["interest", "all"]);

  const options = assignValue(interestList);

  const initialValues = {
    firstName: user ? user?.firstName : "",
    lastName: user ? user?.lastName : "",
    gender: user ? user?.gender : "",
    birthday: user ? user?.birthday : "",
    language: user ? user?.language : "",
    interestedBy: user ? user?.interestedBy : "",
    interest: "",
    about: user ? user?.about : "",
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    gender: Yup.string().nullable().required().label("Gender"),
    interest: Yup.array().label("Interest"),
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
    try {
      let result = user?.Interests.length > 0 && user?.Interests?.filter((item) => !interest?.includes(item?.name));
      result?.length > 0 &&
        result?.map((itemI) => {
          return removeInterest.push(itemI?.name);
        });

      const data = {
        id: user?.id,
        firstName: dataObj?.firstName,
        lastName: dataObj?.lastName,
        birthday: dataObj?.birthday,
        gender: dataObj?.gender,
        removeInterest: removeInterest,
        interests: interest,
        language: dataObj?.language,
      };

      await updateUser?.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries();
      // window.location.reload();
      window.location.href = "../../profile/" + user?.id + "/about";
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value?.split(",") : value
    );
  };

  useEffect(() => {
    if (user?.Interests?.length > 0) {
      user?.Interests?.map((item) => {
        return setInterest((oldData) => [...oldData, item?.name]);
      });
    }
  }, [user]);

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
          className="w-full mt-1 border border-gray-200 font-semibold rounded-xl input-secondary  invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          placeholder="First Name"
          label="Last Name"
          name="lastName"
          type="text"
          className="w-full mt-1 border border-gray-200 font-semibold rounded-xl input-secondary  invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Date of Birth"
          placeholder="Date of Birth"
          name="birthday"
          type="date"
          className="w-full mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary  invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <MultiSelect
          required
          label="Interest"
          className="w-full mt-1 border-0 border-gray-200 font-semibold rounded-xl input-secondary autofill:text-secondary autofill:bg-placeholder-color invalid:text-red-500 "
          placeholder={"Select the category..."}
          multiple
          options={options}
          fn={handleChange}
          val={interest}
          name="interest"
        />
        <Select
          label="Gender"
          placeholder="Gender"
          name="gender"
          className="mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary  invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="gender-error-message"
          options={[
            { id: 0, label: "Not Specified", value: "" },
            { id: 1, label: "male", value: "m" },
            { id: 2, label: "female", value: "f" },
          ]}
        />
        <Select
          label="Language"
          placeholder="Language"
          name="language"
          className="mt-1 lg:mt-2 mb-4 border border-gray-200 font-semibold rounded-xl input-secondary  invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          options={[
            { id: 0, label: "Not Specified", value: "" },
            { id: 1, label: "English", value: "en" },
            { id: 2, label: "Espanol", value: "es" },
          ]}
        />
        <Submit className="w-full px-6 py-2 rounded-xl text-base-100 text-md md:w-fit" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormOverview.propTypes = {
  user: Proptypes.object,
};

export default FormOverview;
