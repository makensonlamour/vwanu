import React from "react";
// Core components
import Step from "./Step";
import FormStepTwo from "../../../features/user/Profile/FormStepTwo";

const StepTwo = () => {
  return (
    <>
      <div>
        <Step step={2} className="step-primary mb-4" />
        <div className="lg:w-2/5 m-auto px-2 lg:px-0">
          <FormStepTwo />
          {/*}
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={() => {
              navigate("../../" + routesPath.STEP_THREE);
            }}
            className="shadow-lg rounded-3xl"
          >
            <h1 className="card-title text-secondary">Create your profile</h1>
            <Field
              autoCapitalize="none"
              placeholder="First Name"
              name="firstName"
              type="text"
              className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
            />
            <Field
              autoCapitalize="none"
              placeholder="Last Name"
              name="lastName"
              type="text"
              className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
            />

            <span className="label-text-alt -mb-3 mt-2 ml-3 text-blue-300">Enter your Date of Birth</span>
            <Field
              autoCapitalize="none"
              placeholder="Date of Birth"
              name="dateOfBirth"
              type="date"
              className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
            />
            <Submit className="rounded-full text-base-100 text-md w-2/5 ml-auto" title="Next" />
          </Form>
          {*/}
        </div>
      </div>
    </>
  );
};

export default StepTwo;
