import React, { useState } from "react";
import Step from "./../../components/Community/Steps/Step";
import FormStepOne from "../../features/community/component/FormStepOne";
import FormStepTwo from "../../features/community/component/FormStepTwo";
import FormStepThree from "../../features/community/component/FormStepThree";
import FormStepFour from "../../features/community/component/FormStepFour";
import FormStepFive from "../../features/community/component/FormStepFive";
import FormStepSix from "../../features/community/component/FormStepSix";

const AddCommunity = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Details", "Settings", "Forum", "Photo", "Cover Photo", "Invites"];
  const StepComponents = [
    <FormStepOne key={"0_element"} setStep={setCurrentStep} currentStep={currentStep} />,
    <FormStepTwo key={"1_element"} setStep={setCurrentStep} currentStep={currentStep} />,
    <FormStepThree key={"2_element"} setStep={setCurrentStep} currentStep={currentStep} />,
    <FormStepFour key={"3_element"} setStep={setCurrentStep} currentStep={currentStep} />,
    <FormStepFive key={"4_element"} setStep={setCurrentStep} currentStep={currentStep} />,
    <FormStepSix key={"5_element"} setStep={setCurrentStep} currentStep={currentStep} />,
  ];
  return (
    <>
      <div className="mt-10 mx-10 mb-10">
        <div className="bg-white rounded-xl border border-gray-300 w-full">
          <p className="text-3xl text-center font-bold pt-12 pb-6">Create A New Community</p>
          <div className="bg-placeholder-color border-b border-t  border-gray-300 w-full">
            <Step steps={steps} currentStep={currentStep} />
          </div>
          <div className="">{StepComponents[currentStep - 1]}</div>
        </div>
      </div>
    </>
  );
};

export default AddCommunity;
