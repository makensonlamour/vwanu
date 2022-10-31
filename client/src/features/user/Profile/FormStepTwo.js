/*eslint-disable*/
import React, { useState } from "react";
import * as Yup from "yup";
import routesPath from "../../../routesPath";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useUpdateUser } from "../../user/userSlice";
import { alertService } from "../../../components/common/Alert/Services";
import { Alert } from "../../../components/common/Alert";
import { useGetInterestList } from "../../interest/interestSlice";
import { useGetCountry, useGetState, useGetCity, useGetAddressType } from "../../address/addressSlice";
// import countries from "../../../data/countries.json";
// import states from "../../../data/states.json";
// import cities from "../../../data/cities.json";
import { assignValueCountries, assignValue } from "../../../helpers/index";

// Core components
import { Field, Select, MultiSelect, Form, Submit } from "../../../components/form";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect";
import Loader from "../../../components/common/Loader";
import { differenceInYears } from "date-fns";

const FormStepTwo = () => {
  const user = useOutletContext();
  const idUser = user?.id;
  const navigate = useNavigate();
  const [interest, setInterest] = useState([]);
  const [countryCode, setCountryCode] = useState(false);
  const [stateCode, setStateCode] = useState(false);
  const [cityCode, setCityCode] = useState(false);
  const [typeAddress, setTypeAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], user?.id, undefined, undefined);
  const { data: countryList } = useGetCountry(["country", "all"], true);
  const { data: addressTypesList } = useGetAddressType(["address-types", "all"], true);
  const { data: stateList } = useGetState(["state", "all", countryCode], countryCode ? true : false, countryCode);
  const { data: cityList } = useGetCity(["city", "all", stateCode], stateCode ? true : false, stateCode);
  const { data: interestList } = useGetInterestList(["interest", "all"]);

  const options = assignValue(interestList);
  const optionsCountry = assignValueCountries(countryList);
  // const stateList = jsonQuery(`[*country_code=${countryCode}]`, { data: states });
  const optionsState = assignValueCountries(stateList);
  const optionsCity = assignValueCountries(cityList);

  // console.log(addressTypesList, countryList, stateList, cityList);

  const initialValues = {
    country: "",
    states: "",
    city: "",
    // street: "",
    // zipCode: "",
    gender: "",
    // interestedBy: "",
    interest: "",
    birthday: "",
  };

  const ValidationSchema = Yup.object().shape({
    country: Yup.string().required().label("Country"),
    states: Yup.string().required().label("States"),
    city: Yup.string().required().label("City"),
    // street: Yup.string().label("Street"),
    // zipCode: Yup.string().label("Zip Code"),
    gender: Yup.string().required().label("Gender"),
    // interestedBy: Yup.string().required().label("Interest By"),
    interest: Yup.array().required().label("Interest"),
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
    try {
      setIsLoading(true);
      if (addressTypesList && addressTypesList?.total > 0) {
        addressTypesList?.data?.map((item) => {
          console.log(item, item?.description);
          if (item?.description === "Home") {
            setTypeAddress(item?.id);
          }
        });
      }

      const dataObj = {
        address: {
          country: countryCode,
          state: stateCode,
          city: cityCode,
          // street: "hg",
          // zip: "76",
          addressType: typeAddress,
        },
        gender: credentials?.gender,
        // interestedBy: credentials?.interestedBy,
        birthday: credentials?.birthday,
        interests: interest,
        id: idUser,
      };

      let result = await updateUser.mutateAsync(dataObj);
      console.log(result);
      navigate("../../" + routesPath.STEP_THREE);
    } catch (e) {
      console.log(e);
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
          required
          autoCapitalize="none"
          label="Date of Birth"
          placeholder="Date of Birth"
          name="birthday"
          type="date"
          className="mr-1 mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Select
          required
          label="Gender"
          placeholder="Gender"
          name="gender"
          className="mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="gender-error-message"
          options={[
            { id: 0, label: "Not Specified", value: "" },
            { id: 1, label: "male", value: "m" },
            { id: 2, label: "female", value: "f" },
          ]}
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
        {/* <CustomSelect label={"Country"} options={optionsCountry} value={countryCode} onChange={(o) => setCountryCode(o)} /> */}
        {/* <Select
          required
          label="Country"
          placeholder="Country"
          name="country"
          style={{ width: "100%" }}
          fn={setCountryCode}
          className="mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="country-error-message"
          options={optionsCountry}
        /> */}
        <Select
          required
          label="Country"
          placeholder="Country"
          name="country"
          className="mr-2 mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="state-error-message"
          fn={setCountryCode}
          byId={true}
          options={optionsCountry}
        />
        <div className="flex justify-center w-full">
          <Select
            required
            label="States"
            placeholder="States"
            name="states"
            className="mr-2 mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
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
            className="ml-2 mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
            testId="city-error-message"
            fn={setCityCode}
            options={optionsCity}
          />
        </div>
        {/* <div className="flex w-full">
          <Field
            label="Street"
            placeholder="Street Address"
            name="street"
            type="text"
            containerClassName="w-full"
            className="w-full mr-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Field
            label="Zip Code"
            placeholder="Zip Code"
            name="zipCode"
            type="text"
            containerClassName=""
            className="w-full ml-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
        </div> */}
        <div className="mt-6">
          <Submit className="rounded-xl py-2 text-base-100 text-md w-full ml-auto" title={isLoading ? <Loader /> : "Next"} />
        </div>
      </Form>
    </>
  );
};

export default FormStepTwo;
