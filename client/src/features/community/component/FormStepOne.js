/*eslint-disable */
import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { Field, TextArea, MultiSelect, Form, Submit } from "../../../components/form";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
import { assignValue } from "../../../helpers/index";
import { useGetInterestList } from "../../interest/interestSlice";
import { useCreateCommunity } from "../communitySlice";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Community created successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on creating community!", {
    position: "top-center",
  });

const FormStepOne = ({ setStep, currentStep, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [interest, setInterest] = useState([]);
  const { data: interestList } = useGetInterestList(["interest", "all"]);
  const createCommunity = useCreateCommunity(["community", "create"], undefined, undefined);
  const options = assignValue(interestList);

  // const animatedComponents = makeAnimated();

  const initialValues = {
    communityName: "",
    interest: "",
    communityDescription: "",
  };

  const ValidationSchema = Yup.object().shape({
    communityName: Yup.string().required().label("Community Name"),
    interest: Yup.array().label("Interest"),
    communityDescription: Yup.string().label("Community Description"),
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    const data = {
      name: dataObj?.communityName,
      interests: interest,
      privacyType: "public",
      description: dataObj?.communityDescription,
    };
    try {
      let result = await createCommunity.mutateAsync(data);
      updateSuccess();
      setData(result?.data);
      setStep(currentStep + 1);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full px-4 pb-2">
          <Toaster />
          <Field
            autoCapitalize="none"
            label="Community Name (required)"
            name="communityName"
            type="text"
            className="w-full mt-1 mb-4 placeholder:text-secondary font-semibold rounded-xl input-secondary border border-gray-200 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <MultiSelect
            label="Interest"
            className="w-full mt-1 placeholder:text-secondary font-semibold rounded-xl input-secondary border-0 autofill:text-secondary autofill:bg-placeholder-color invalid:text-red-500 "
            placeholder={"Select the category..."}
            multiple
            options={options}
            fn={handleChange}
            val={interest}
            name="interest"
          />
          <TextArea
            autoCapitalize="none"
            label="Community Description"
            name="communityDescription"
            type="text"
            maxRows="5"
            minRows="3"
            style={{ width: "100%" }}
            className="p-4 mt-1 mb-4 placeholder:text-secondary font-semibold rounded-xl input-secondary border border-gray-200 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Submit
            className="mt-4 py-3 px-4 w-full rounded-2xl text-base-100 text-md md:w-[30%]"
            title={isLoading ? <Loader /> : "Create Community and Continue"}
          />
        </Form>
      </div>
    </>
  );
};

FormStepOne.propTypes = {
  setStep: PropTypes.func.isRequired,
  setData: PropTypes.func,
  data: PropTypes.object,
  currentStep: PropTypes.number,
};

export default FormStepOne;
