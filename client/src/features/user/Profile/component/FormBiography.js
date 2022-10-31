import React, { useState, useEffect } from "react";
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
  const [textBio, setTextBio] = useState("");

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const initialValues = {
    about: user ? user?.about : "",
  };

  const ValidationSchema = Yup.object().shape({
    about: Yup.string().label("Biography"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);

    const data = { id: user?.id, about: dataObj?.about };
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

  useEffect(() => {
    if (user && user?.about) setTextBio(user?.about);
  }, [user]);

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
          fn={setTextBio}
          showLength={true}
          length={70 - textBio?.length || 0}
          maxLength="70"
          className="w-full mt-1 mb-4 mx-auto border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
        />
        <Submit className="w-full mx-2 rounded-xl px-4 py-1 text-base-100 text-md md:w-fit mt-4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormBiography.propTypes = {
  user: Proptypes.object,
};

export default FormBiography;
