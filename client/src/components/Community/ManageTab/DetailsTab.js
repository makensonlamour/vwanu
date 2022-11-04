import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { assignValue } from "../../../helpers/index";
import Loader from "../../common/Loader";
import { useGetInterestList } from "../../../features/interest/interestSlice";
import { useUpdateCommunity } from "../../../features/community/communitySlice";
import { Field, TextArea, MultiSelect, Form, Submit } from "../../form";

const updateSuccess = () =>
  toast.success("Community update successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating community!", {
    position: "top-center",
  });

const DetailsTab = ({ communityData }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { data: interestList } = useGetInterestList(["interest", "all"], true);
  const updateCommunity = useUpdateCommunity(["community", id], id, undefined, undefined);
  const [interest, setInterest] = useState([]);
  let removeInterest = [];
  const options = assignValue(interestList);
  const initialValues = {
    communityName: communityData?.name || "",
    interest: communityData?.Interests || "",
    communityDescription: communityData?.description || "",
  };

  const ValidationSchema = Yup.object().shape({
    communityName: Yup.string().required().label("Community Name"),
    interest: Yup.array().required().label("Interest"),
    communityDescription: Yup.string().label("Community Description"),
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      let resultInt = data?.Interests.length > 0 && data?.Interests?.filter((item) => !interest?.includes(item?.name));
      resultInt?.length > 0 &&
        resultInt?.map((itemI) => {
          return removeInterest.push(itemI?.name);
        });
      const dataObj = {
        name: data?.communityName,
        interests: interest,
        removeInterest: removeInterest,
        description: data?.communityDescription,
      };
      console.log(dataObj);

      let result = await updateCommunity.mutateAsync(dataObj);
      console.log(result);
      updateSuccess();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (communityData?.Interests?.length > 0) {
      communityData?.Interests?.map((item) => {
        return setInterest((oldData) => [...oldData, item?.name]);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityData]);

  return (
    <>
      <div className="bg-white border border-gray-300 py-4 px-2 md:px-6 rounded-xl w-full">
        <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full px-2">
          <Toaster />
          <Field
            autoCapitalize="none"
            label="Community Name (required)"
            name="communityName"
            type="text"
            className="w-full mt-1 font-semibold rounded-xl border input-secondary border-gray-200 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <MultiSelect
            label="Interest"
            className="w-full mt-1 font-semibold border-gray-50 border rounded-xl input-secondary autofill:text-secondary autofill:bg-placeholder-color invalid:text-red-500 "
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
            className="p-4 mt-1 mb-4 font-semibold rounded-xl border input-secondary border-gray-200 invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
          />
          <Submit className="w-full rounded-xl text-base-100 text-md md:w-[30%] py-2" title={isLoading ? <Loader /> : "Save changes"} />{" "}
        </Form>
      </div>
    </>
  );
};

DetailsTab.propTypes = {
  communityData: PropTypes.object.isRequired,
};

export default DetailsTab;
