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
    phone: user ? user?.telephone : "",
    instagram: user ? user?.instagram : "",
    twitter: user ? user?.twitter : "",
    facebook: user ? user?.facebook : "",
    tiktok: user ? user?.tiktok : "",
    linkedin: user ? user?.linkedin : "",
    youtube: user ? user?.youtube : "",
    website: user ? user?.website : "",
  };

  const ValidationSchema = Yup.object().shape({
    phone: Yup.string().nullable().label("Telephone"),
    instagram: Yup.string().nullable().label("Instagram"),
    facebook: Yup.string().nullable().label("Facebook"),
    twitter: Yup.string().nullable().label("Twitter"),
    tiktok: Yup.string().nullable().label("Tiktok"),
    linkedin: Yup.string().nullable().label("Linkedin"),
    youtube: Yup.string().nullable().label("Youtube"),
    website: Yup.string().nullable().label("Website"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = {
      id: user?.id,
      phone: dataObj?.phone,
      instagram: dataObj?.instagram,
      facebook: dataObj?.facebook,
      twitter: dataObj?.twitter,
      tiktok: dataObj?.tiktok,
      linkedin: dataObj?.linkedin,
      youtube: dataObj?.youtube,
      website: dataObj?.website,
    };

    try {
      await updateUser.mutateAsync(data);
      updateSuccess();
      queryClient.invalidateQueries(["user", "me"]);
      // window.location.reload();
      window.location.href = "../../profile/" + user?.id + "/about";
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full gap-y-2 gap-x-2">
        <Toaster />
        <Telephone
          label="Telephone"
          name="phone"
          countryCode={user?.country}
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Facebook"
          placeholder="Facebook"
          name="facebook"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Twitter"
          placeholder="Twitter"
          name="twitter"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Instagram"
          placeholder="Instagram"
          name="instagram"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Youtube"
          placeholder="Youtube"
          name="youtube"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Linkedin"
          placeholder="Linkedin"
          name="linkedin"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Tiktok"
          placeholder="Tiktok"
          name="tiktok"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Field
          autoCapitalize="none"
          label="Website"
          placeholder="Website"
          name="website"
          type="text"
          containerClassName=""
          className="mt-1 lg:mt-2 mx-2 border-gray-200 border font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
        />
        <Submit
          className="w-full mx-2 rounded-lg py-2 text-base-100 md:px-6 text-md md:w-fit mt-2"
          title={isLoading ? <Loader /> : "Save"}
        />{" "}
      </Form>
    </>
  );
};

FormContactInfo.propTypes = {
  user: Proptypes.object,
};

export default FormContactInfo;
