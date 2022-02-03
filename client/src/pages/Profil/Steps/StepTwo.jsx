import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// Core components
import { Field, Form, Submit } from "../../../components/form";
import Step from "./Step";
//import StepThree from "./StepThree";
import routesPath from "../../../routesPath";

const StepTwo = () => {
  const navigate = useNavigate();
  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required().min(3).label("First Name"),
    lastName: Yup.string().required().min(3).label("Last Name"),
    dateOfBirth: Yup.date().required().label("Date of Birth")
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: ""
  };
  return (
    <>
      <div>
        <Step step={2} className="step-primary" />
        <div className="w-1/2 m-auto">
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={() => {
              navigate("../../" + routesPath.STEP_THREE);
            }}
            className="shadow-lg rounded-3xl"
          >
            <h1 className="card-title text-orange-500">Create your profile</h1>
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
            <Field
              autoCapitalize="none"
              placeholder="Date of Birth"
              name="dateOfBirth"
              type="date"
              className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none"
            />
            <Submit className="rounded-full text-base-200 text-md w-1/5 ml-auto" title="Next" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
