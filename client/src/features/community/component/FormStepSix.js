import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import SendInvites from "../../../components/Community/SendInvitesTabs/SendInvites";

//Functions for notification after actions

const FormStepSix = ({ setStep, currentStep, data }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    navigate("../../groups/" + data?.id + "?tabs=invites");
    setIsLoading(false);
  };
  const handlePrevious = () => {
    setIsLoading(true);
    setStep(currentStep - 1);
    setIsLoading(false);
  };

  return (
    <>
      <div className="my-4 mx-24">
        <SendInvites />
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
            {isLoading ? <Loader /> : "Finish"}
          </button>
        </div>
      </div>
    </>
  );
};

FormStepSix.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default FormStepSix;
