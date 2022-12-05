import React, { useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Form, Checkbox, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import { useDeleteCommunity } from "./../../../features/community/communitySlice";
import toast, { Toaster } from "react-hot-toast";

const deleteSuccess = () =>
  toast.success("community deleted successfully!", {
    position: "top-center",
  });

const deleteError = () =>
  toast.error("Sorry. Error on deleting community!", {
    position: "top-center",
  });

const DeleteTab = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const deleteCommunity = useDeleteCommunity(["community", id], id, undefined, undefined);
  const ValidationSchema = Yup.object().shape({
    consent1: Yup.bool()
      .required()
      .oneOf([true], "Please confirm that you acknowledge that you understand the consequences of deleting this community."),
    consent2: Yup.bool()
      .required()
      .oneOf([true], "Please confirm that you acknowledge that all the discussions in this community will be delete also."),
  });

  const initialValues = {
    consent1: false,
    consent2: false,
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // eslint-disable-next-line no-restricted-globals
    let isConfirm = confirm("Do you want to delete this community?");
    if (!isConfirm) return setIsLoading(false);
    try {
      await deleteCommunity.mutateAsync();
      deleteSuccess();
      window.location.href = "../../groups";
    } catch (e) {
      console.log(e);
      deleteError();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Toaster />
      <div className="bg-white border border-gray-300 pt-6 pb-5 px-2 md:px-10 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold">{`Delete`}</h4>
        <div className="px-4 py-3 bg-white w-full border border-black rounded-2xl">
          <p className="text-black text-sm">{`WARNING: Deleting this community will completely remove ALL content associated with it. There is no way back. Please be careful with this option.`}</p>
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
          <div className="mt-5">
            <Submit
              data-testid="deleteGroup_btn"
              className="rounded-xl py-1 text-md w-fit px-4"
              title={isLoading ? <Loader /> : "Delete Group"}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default DeleteTab;
