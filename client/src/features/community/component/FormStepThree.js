import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { FormGroup, Checkbox, FormControlLabel } from "@mui/material";
import { Form } from "../../../components/form";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const FormStepThree = ({ setStep, currentStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  //data
  const [isEnabled, setIsEnabled] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    const data = {
      isEnabled,
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
  const handlePrevious = () => {
    setStep(currentStep - 1);
  };
  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form className="w-full">
          <Toaster />

          {/*Privacy Options*/}
          <div className="mb-4">
            <p className="text-xl font-semibold">{"Group Forum"}</p>

            <p className="text-lg py-4">
              {"Create a discussion forum to allow members of this group to communicate in a structured, bulletin-board style fashion."}
            </p>
            <FormGroup>
              <FormControlLabel
                onChange={(e) => setIsEnabled(e.target.checked)}
                control={<Checkbox />}
                label="Yes, I want this group to have a discussion forum."
              />
            </FormGroup>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handlePrevious()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-full rounded-2xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Previous Step"}
            </button>
            <button
              onClick={() => handleNext()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-full rounded-2xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Next Step"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

FormStepThree.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
};

export default FormStepThree;
