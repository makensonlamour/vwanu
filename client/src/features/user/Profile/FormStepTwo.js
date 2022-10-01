/*eslint-disable*/
import React, { useState } from "react";
import * as Yup from "yup";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useUpdateUser } from "../../user/userSlice";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { useGetInterestList } from "../../interest/interestSlice";
import countries from "../../../data/countries.json";
import states from "../../../data/states.json";
// import cities from "../../../data/cities.json";
import { assignValueCountries, assignValueStates, assignValue } from "../../../helpers/index";
import jsonQuery from "json-query";

// Core components
import { Field, Select, MultiSelect, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { differenceInYears } from "date-fns";

const FormStepTwo = () => {
  const user = useOutletContext();
  const idUser = user?.id;
  const navigate = useNavigate();
  const updateUser = useUpdateUser(["user", "me"], user?.id, undefined, undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { data: interestList } = useGetInterestList(["interest", "all"]);
  const options = assignValue(interestList);
  const [interest, setInterest] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const optionsCountry = assignValueCountries(countries);
  const stateList = jsonQuery(`[*country_code=${countryCode}]`, { data: states });
  const optionsState = assignValueStates(stateList?.value);

  console.log(stateList);

  const initialValues = {
    country: "",
    states: "",
    city: "",
    street: "",
    zipCode: "",
    gender: "",
    interestedBy: "",
    interest: "",
    birthday: "",
  };

  const ValidationSchema = Yup.object().shape({
    country: Yup.string().required().label("Country"),
    states: Yup.string().label("States"),
    city: Yup.string().label("City"),
    street: Yup.string().label("Street"),
    zipCode: Yup.string().label("Zip Code"),
    gender: Yup.string().required().label("Gender"),
    interestedBy: Yup.string().required().label("Interest By"),
    interest: Yup.array().label("Interest"),
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
      interests: interest,
      id: idUser,
    };

    try {
      let result = await updateUser.mutateAsync(dataObj);
      console.log("result profile", result);
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value?.split(",") : value
    );
  };

  return (
    <>
      <Form
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={handleStepTwo}
        className="p-4 mt-4 lg:shadow-2xl border bg-white border-gray-300 lg:rounded-t-3xl md:px-24 lg:px-10"
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
            { id: 0, label: "Not Specified", value: "" },
            { id: 1, label: "male", value: "m" },
            { id: 2, label: "female", value: "f" },
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
            { id: 0, label: "Not Specified", value: "" },
            { id: 1, label: "male", value: "m" },
            { id: 2, label: "female", value: "f" },
          ]}
        />
        <MultiSelect
          label="Interest"
          className="w-full mt-1 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 autofill:text-secondary autofill:bg-placeholder-color invalid:text-red-500 "
          placeholder={"Select the category..."}
          multiple
          options={options}
          fn={handleChange}
          val={interest}
          name="interest"
        />
        <Select
          required
          label="Country"
          placeholder="Country"
          name="country"
          style={{ width: "100%" }}
          fn={setCountryCode}
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="country-error-message"
          options={optionsCountry}
        />
        <div className="flex justify-center w-full">
          <Select
            required
            label="States"
            placeholder="States"
            name="states"
            className="mr-2 mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
            testId="state-error-message"
            fn={setStateCode}
            options={optionsState}
          />
          <Select
            required
            label="City"
            placeholder="City"
            name="city"
            style={{ width: "100%" }}
            className="ml-2 mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
            testId="city-error-message"
            options={[
              { id: 0, label: "Not Specified", value: "" },
              { id: 1, label: "United States Of America", value: "usa" },
              { id: 2, label: "Dominican Republic", value: "do" },
            ]}
          />
        </div>
        <div className="flex w-full">
          <Field
            label="Street"
            placeholder="Street Address"
            name="street"
            type="text"
            containerClassName="w-full"
            className="w-full mr-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Field
            label="Zip Code"
            placeholder="Zip Code"
            name="zipCode"
            type="text"
            containerClassName=""
            className="w-full ml-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
        </div>
        <div className="mt-6">
          <Submit className="rounded-xl py-2 text-base-100 text-md w-full ml-auto" title={isLoading ? <Loader /> : "Next"} />
        </div>
      </Form>
    </>
  );
};

export default FormStepTwo;
