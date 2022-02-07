import React from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import routesPath from "../../../routesPath";
import Step from "./Step";
import { Form, Field, Submit } from "../../../components/form";

const StepThree = () => {
  const navigate = useNavigate();
  const ValidationSchema = Yup.object().shape({
    profilePhoto: Yup.mixed().required().label("profilePhoto")
  });

  const initialValues = {
    profilePhoto: null
  };
  return (
    <>
      <div>
        {" "}
        <Step step={3} className="step-primary" />
        <div className="w-1/2 m-auto">
          <h1 className="card-title text-orange-500">Change your profil photo</h1>
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={() => {
              navigate("../../" + routesPath.STEP_FOUR);
            }}
            className="shadow-lg rounded-3xl"
          >
            <Field
              autoCapitalize="none"
              placeholder="Avatar"
              name="profilePhoto"
              type="file"
              autoComplete="new-file"
              className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none w-1/2 ml-auto"
            />
            <div className="flex-auto justify-end">
              <Link className="mr-6" to={"../../" + routesPath.STEP_FOUR}>
                Skip
              </Link>
              <Submit className="rounded-full text-base-200 text-md w-1/5 ml-auto" title="Next" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default StepThree;
