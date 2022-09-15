import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { FormGroup, Checkbox, FormControlLabel } from "@mui/material";
import { Form } from "../../../components/form";
import { useUpdateCommunity } from "../communitySlice";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const FormStepThree = ({ setStep, currentStep, data, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const updateCommunity = useUpdateCommunity(["community", data?.id], data?.id, undefined, undefined);
  //data
  const [isEnabled, setIsEnabled] = useState(data?.haveDiscussionForum);

  const handleNext = async () => {
    setIsLoading(true);
    const dataObj = {
      haveDiscussionForum: isEnabled,
    };

    try {
      let result = await updateCommunity.mutateAsync(dataObj);
      setData(result?.data);
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
    setData(data);
    setStep(currentStep - 1);
  };
  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form className="w-full px-4 pb-2">
          <Toaster />

          {/*Privacy Options*/}
          <div className="mb-4">
            <p className="text-lg lg:text-xl font-semibold">{"Group Forum"}</p>

            <p className="text-md lg:text-lg py-4">
              {"Create a discussion forum to allow members of this group to communicate in a structured, bulletin-board style fashion."}
            </p>
            <FormGroup>
              <FormControlLabel
                onChange={(e) => setIsEnabled(e.target.checked)}
                control={<Checkbox defaultChecked={data?.haveDiscussionForum} />}
                label="Yes, I want this group to have a discussion forum."
              />
            </FormGroup>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handlePrevious()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-fit rounded-xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Previous Step"}
            </button>
            <button
              onClick={() => handleNext()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-fit rounded-xl text-base-100 py-1 text-md md:w-1/5"
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
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default FormStepThree;
