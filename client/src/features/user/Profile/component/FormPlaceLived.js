import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useGetCountry, useGetState, useGetCity, useGetAddressType } from "../../../address/addressSlice";
import { Select, Form, Submit } from "../../../../components/form";
import { assignValueCountries } from "../../../../helpers/index";
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

const FormPlaceLived = ({ user }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState(false);
  const [stateCode, setStateCode] = useState(false);
  const [cityCode, setCityCode] = useState(false);
  let typeAddress = "";

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const { data: countryList } = useGetCountry(["country", "all"], true);
  const { data: addressTypesList } = useGetAddressType(["address-types", "all"], true);
  const { data: stateList } = useGetState(["state", "all", countryCode], countryCode ? true : false, countryCode);
  const { data: cityList } = useGetCity(["city", "all", stateCode], stateCode ? true : false, stateCode);

  const optionsCountry = assignValueCountries(countryList);
  const optionsState = assignValueCountries(stateList);
  const optionsCity = assignValueCountries(cityList);

  const initialValues = {
    country: "",
    states: "",
    city: "",
  };

  const ValidationSchema = Yup.object().shape({
    country: Yup.string().required().label("Country"),
    states: Yup.string().required().label("States"),
    city: Yup.string().required().label("City"),
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (addressTypesList && addressTypesList?.total > 0) {
        addressTypesList?.data?.map((item) => {
          console.log(item, item?.description);
          if (item?.description === "Home") {
            typeAddress = item?.id;
          }
        });
      }

      const data = {
        id: user?.id,
        address: {
          country: countryCode,
          state: stateCode,
          city: cityCode,
          addressType: typeAddress,
        },
      };

      await updateUser.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries();
      window.location.href = "../../profile/" + user?.id;
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
        <label className="text-md py-4">Places Lived</label>
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
            byId={true}
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
            byId={true}
            options={optionsCity}
          />
        </div>
        <Submit className="w-full rounded-lg text-base-100 text-md md:w-fit px-6 py-1 mt-4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormPlaceLived.propTypes = {
  user: Proptypes.object,
};

export default FormPlaceLived;
