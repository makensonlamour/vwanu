import React from "react";
import * as Yup from "yup";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import routesPath from "../../../routesPath";
import Step from "./Step";
import { Form, UploadAvatar, Submit } from "../../../components/form";

const StepThree = () => {
  const navigate = useNavigate();
  const ValidationSchema = Yup.object().shape({
    profilePhoto: Yup.mixed().required().label("Profile Photo")
  });

  const initialValues = {
    profilePhoto: ""
  };

  return (
    <>
      <div>
        {" "}
        <Step step={3} className="step-primary mb-4" />
        <div className="w-2/5 m-auto">
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={() => {
              navigate("../../" + routesPath.STEP_FOUR);
            }}
            className="shadow-lg rounded-3xl"
          >
            <h1 className="card-title text-orange-500 pb-3 text-center">Change your profile photo</h1>
            <UploadAvatar
              autoCapitalize="none"
              placeholder="Avatar"
              name="profilePhoto"
              id="img"
              accept="image/png,image/jpg,image/jpeg"
              icon={<FaUserCircle size="150px" className="m-auto text-gray-500" />}
              autoComplete="new-file"
              className="bg-blue-200 text-blue-500 font-semibold rounded-full px-6 input-primary border-none w-1/2 ml-auto hidden"
            />
            <div className="ml-auto px-2">
              <Link className="link link-primary pr-2" to={"../../" + routesPath.STEP_FOUR}>
                Skip
              </Link>
              <Submit className="rounded-full text-base-200 text-md" title="Next" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default StepThree;
