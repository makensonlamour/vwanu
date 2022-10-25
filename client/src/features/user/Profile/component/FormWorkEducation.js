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

const FormWorkEducation = ({ user }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const initialValues = {
    work: "",
    education: "",
  };

  const ValidationSchema = Yup.object().shape({
    education: Yup.string().label("Education"),
    work: Yup.string().label("Work place"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = { id: user?.id, country: dataObj?.country, livingCountry: dataObj?.livingCountry };

    try {
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
        <Field
          autoCapitalize="none"
          placeholder="Work place"
          label="Work place"
          name="work"
          type="text"
          className="w-full mt-1 mb-4 font-semibold rounded-xl input-secondary border-gray-200 border invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Submit className="w-full rounded-xl text-base-100 text-md md:w-fit px-6 py-2 mt-4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormWorkEducation.propTypes = {
  user: Proptypes.object,
};

export default FormWorkEducation;
