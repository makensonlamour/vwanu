import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";

import { Select, Form, Submit } from "../../../../components/form";
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

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const initialValues = {
    country: "",
    livingCountry: "",
  };

  const ValidationSchema = Yup.object().shape({
    country: Yup.string().label("Country From"),
    livingCountry: Yup.string().label("Living Country"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = { id: user?.id, country: dataObj?.country, livingCountry: dataObj?.livingCountry };

    try {
      await updateUser.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries();
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
        <Select
          required
          label="Country From"
          placeholder="Country From"
          name="country"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="country-error-message"
          isSearchable={true}
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "United States Of America", value: "us" },
            { id: 2, name: "Dominican Republic", value: "do" },
            { id: 2, name: "Haiti", value: "ht" },
          ]}
        />
        <Select
          required
          label="Living Country"
          placeholder="Living Country"
          name="livingCountry"
          className="mt-1 lg:mt-2 mb-4 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          testId="livingCountry-error-message"
          isSearchable={true}
          options={[
            { id: 0, name: "Not Specified", value: "" },
            { id: 1, name: "United States Of America", value: "us" },
            { id: 2, name: "Dominican Republic", value: "do" },
            { id: 2, name: "Haiti", value: "ht" },
          ]}
        />
        <Submit className="w-full rounded-2xl text-base-100 text-md md:w-1/5 mt-4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormPlaceLived.propTypes = {
  user: Proptypes.object,
};

export default FormPlaceLived;
