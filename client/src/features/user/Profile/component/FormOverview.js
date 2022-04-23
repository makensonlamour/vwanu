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

const FormOverview = ({ user }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);

  const initialValues = {
    firstName: user ? user?.firstName : "",
    lastName: user ? user?.lastName : "",
    about: user ? user?.about : "",
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    about: Yup.string().nullable().label("About"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = { id: user?.id, firstName: dataObj?.firstName, lastName: dataObj?.lastName, about: dataObj?.about };

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
          placeholder="First Name"
          label="First Name"
          name="firstName"
          type="text"
          className="w-full mr-1 mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Field
          autoCapitalize="none"
          placeholder="First Name"
          label="Last Name"
          name="lastName"
          type="text"
          className="w-full mr-1 mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Field
          autoCapitalize="none"
          placeholder="About"
          label="About"
          name="about"
          type="text"
          className="w-full mr-1 mt-1 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Submit className="rounded-full text-base-100 text-md w-2/3 ml-auto" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormOverview.propTypes = {
  user: Proptypes.object,
};

export default FormOverview;
