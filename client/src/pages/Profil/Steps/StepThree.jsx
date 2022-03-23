import React from "react";
import Step from "./Step";
import FormStepThree from "../../../features/user/Profile/FormStepThree";

const StepThree = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div>
        <Step step={3} className="step-primary mb-4" />
        <div className="md:w-2/5 m-auto">
          <FormStepThree />
        </div>
      </div>
    </>
  );
};

export default StepThree;
