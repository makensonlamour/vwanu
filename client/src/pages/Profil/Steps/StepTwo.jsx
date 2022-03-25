import React from "react";
// Core components
import Step from "./Step";
import FormStepTwo from "../../../features/user/Profile/FormStepTwo";

const StepTwo = () => {
  /*
  if (!(dataUser.user.birthday && dataUser.user.gender && dataUser.user.interestedBy && dataUser.user.country)) {
    navigate("../../" + routesPath.STEP_TWO);
  }
  */
  return (
    <>
      <div>
        <Step step={2} className="step-primary mb-4" />
        <div className="lg:w-2/5 m-auto px-2 lg:px-0">
          <FormStepTwo />
        </div>
      </div>
    </>
  );
};

export default StepTwo;
