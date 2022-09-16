import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Checkbox, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";

const DeleteTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const ValidationSchema = Yup.object().shape({
    consent1: Yup.bool().required().oneOf([true], "You must tell us that you understand the consequences of deleting this group."),
    consent2: Yup.bool().oneOf([true], "You must accept the terms of use and the policy privacy"),
  });

  const initialValues = {
    consent1: false,
    consent2: false,
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log("");
    setIsLoading(false);
  };
  return (
    <>
      <div className="bg-white border border-gray-300 pt-10 pb-5 px-2 md:px-16 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold">{`Delete`}</h4>
        <div className="px-4 py-3 bg-warning w-full border border-yellow-300 rounded-2xl">
          <p className="text-v-yellow-dark text-sm">{`WARNING: Deleting this group will completely remove ALL content associated with it. There is no way back. Please be careful with this option.`}</p>
        </div>
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="">
          <Checkbox
            required
            name="consent1"
            label={`I understand the consequences of deleting this group.`}
            className=""
            testId="consent-1-error-message"
          />

          <Checkbox
            required
            name="consent2"
            label={`I also want to delete the discussion forum.`}
            className=""
            testId="consent-2-error-message"
          />

          <Submit
            data-testid="deleteGroup_btn"
            className="rounded-xl py-1 text-md w-fit px-4"
            title={isLoading ? <Loader /> : "Delete Group"}
          />
        </Form>
      </div>
    </>
  );
};

export default DeleteTab;
