import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { assignValue } from "../../../helpers/index";
import Loader from "../../common/Loader";
import { useGetInterestList } from "../../../features/interest/interestSlice";
import { Field, TextArea, Select, Form, Submit } from "../../form";

const updateSuccess = () =>
  toast.success("Community update successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating community!", {
    position: "top-center",
  });

const DetailsTab = ({ communityData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: interestList } = useGetInterestList(["interest", "all"]);
  const options = assignValue(interestList?.data);
  const initialValues = {
    communityName: communityData?.name || "",
    interest: communityData?.interests || "",
    communityDescription: communityData?.description || "",
  };

  const ValidationSchema = Yup.object().shape({
    communityName: Yup.string().required().label("Community Name"),
    interest: Yup.string().required().label("Interest"),
    communityDescription: Yup.string().label("Community Description"),
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      updateSuccess();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 py-4 px-2 md:px-6 rounded-xl w-full">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
          <Toaster />
          <Field
            autoCapitalize="none"
            label="Community Name (required)"
            name="communityName"
            type="text"
            className="w-full mt-1 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Select
            label="Interest"
            name="interest"
            options={options}
            className="w-full mt-1 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <TextArea
            autoCapitalize="none"
            label="Community Description"
            name="communityDescription"
            type="text"
            maxRows="5"
            minRows="3"
            style={{ width: "100%" }}
            className="p-4 mt-1 mb-4 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-0 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Submit className="w-full rounded-2xl text-base-100 text-md md:w-[30%]" title={isLoading ? <Loader /> : "Save changes"} />{" "}
        </Form>
      </div>
    </>
  );
};

DetailsTab.propTypes = {
  communityData: PropTypes.object.isRequired,
};

export default DetailsTab;
