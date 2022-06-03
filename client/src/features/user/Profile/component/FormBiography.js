import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";

import { Field, Form, Submit } from "../../../../components/form";
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

const FormBiography = ({ user }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const initialValues = {
    about: "",
  };

  const ValidationSchema = Yup.object().shape({
    about: Yup.string().label("Biography"),
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
        <Field
          autoCapitalize="none"
          placeholder="Biography"
          label="Biography"
          name="about"
          type="text"
          className="w-full mt-1 mb-4 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Submit className="w-full rounded-2xl text-base-100 text-md md:w-1/5 mt-4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormBiography.propTypes = {
  user: Proptypes.object,
};

export default FormBiography;
