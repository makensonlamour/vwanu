import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";

import { Field, Telephone, Form, Submit } from "../../../../components/form";
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
  };

  const ValidationSchema = Yup.object().shape({
    telephone: Yup.string().nullable().label("Telephone"),
    instagram: Yup.string().nullable().label("Instagram"),
    facebook: Yup.string().nullable().label("Facebook"),
    twitter: Yup.string().nullable().label("Twitter"),
    website: Yup.string().nullable().label("Website"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = {
      id: user?.id,
      telephone: dataObj?.telephone,
      instagram: dataObj?.instagram,
      twitter: dataObj?.twitter,
      website: dataObj?.website,
    };

    try {
      await updateUser.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries(["user", "me"]);
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
      <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
        <Toaster />
        <Telephone
          label="Telephone"
          name="telephone"
          countryCode={user?.country}
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Facebook"
          placeholder="Facebook"
          name="facebook"
          type="text"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Twitter"
          placeholder="Twitter"
          name="twitter"
          type="text"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Instagram"
          placeholder="Instagram"
          name="instagram"
          type="text"
          className="mt-1 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Website"
          placeholder="Website"
          name="website"
          type="text"
          className="mt-1 mb-4 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Submit className="w-full rounded-2xl text-base-100 text-md md:w-1/5 mt-2" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormContactInfo.propTypes = {
  user: Proptypes.object,
};

export default FormContactInfo;
