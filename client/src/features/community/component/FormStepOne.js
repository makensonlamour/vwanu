import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { Field, TextArea, Form, Submit } from "../../../components/form";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Community created successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on creating community!", {
    position: "top-center",
  });

const FormStepOne = ({ setStep, currentStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    communityName: "",
    communityDescription: "",
  };

  const ValidationSchema = Yup.object().shape({
    communityName: Yup.string().required().label("Community Name"),
    communityDescription: Yup.string().label("Community Description"),
  });
  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = {
      communityName: dataObj?.communityName,
      communityDescription: dataObj?.communityDescription,
    };

    try {
      console.log(data);
      updateSuccess();
      setStep(currentStep + 1);
      //   window.location.reload();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
          <Toaster />
          <Field
            autoCapitalize="none"
            label="Community Name (required)"
            name="communityName"
            type="text"
            className="w-full mt-1 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <TextArea
            autoCapitalize="none"
            label="Community Description"
            name="communityDescription"
            type="text"
            maxRows="5"
            minRows="5"
            style={{ width: "100%" }}
            className="p-4 mt-1 mb-4 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Submit
            className="w-full rounded-2xl text-base-100 text-md md:w-[30%]"
            title={isLoading ? <Loader /> : "Create Community and Continue"}
          />{" "}
        </Form>
      </div>
    </>
  );
};

FormStepOne.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
};

export default FormStepOne;
