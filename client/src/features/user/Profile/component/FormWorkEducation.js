/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Proptypes from "prop-types";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";

import { Field, Form, Submit } from "../../../../components/form";
import Loader from "../../../../components/common/Loader";
import { useUpdateUser } from "../../userSlice";
import { getElementById, removeElementArray } from "../../../../helpers";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const FormWorkEducation = ({ user, idWork }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // dummy data
  const objectWorkplaces = [
    {
      id: 1,
      description: "Developer",
      name: "Vwanu",
      from: "2021-08",
      to: "2023-06",
      view: true,
    },
    {
      id: 2,
      description: "Fullstack developer",
      name: "Collabo",
      from: "2023-08",
      to: "2023-10",
      view: true,
    },
    {
      id: 3,
      description: "Freelancer",
      name: "Upwork",
      from: "2017-07",
      to: "2020-02",
      view: true,
    },
  ];

  let editData = getElementById(objectWorkplaces, idWork);

  console.log("editData", editData);

  const updateUser = useUpdateUser(["user", "me"], undefined, undefined);
  const initialValues = {
    name: editData ? editData?.name : "",
    description: editData ? editData?.description : "",
    from: editData ? editData?.from : "",
    to: editData ? editData?.to : "",
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().label("Company's Name").required(),
    description: Yup.string().label("Description"),
    from: Yup.date().label("From"),
    to: Yup.date().label("To"),
  });

  const handleSubmit = async (dataObj) => {
    setIsLoading(true);
    let workPlaces = user?.WorkPlaces;
    if (idWork) {
      workPlaces = removeElementArray(workPlaces, idWork);
    }
    let dataTemp = { name: dataObj.name, description: dataObj.description, from: dataObj.from, to: dataObj.to };
    workPlaces.push(dataTemp);
    const data = { id: user?.id, workPlaces };

    console.log(data);

    // try {
    //   await updateUser.mutateAsync(data);
    //   updateSuccess();
    //   queryClient.invalidateQueries();
    //   window.location.href = "../../profile/" + user?.id;
    // } catch (e) {
    //   console.log(e);
    //   updateError();
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
        <Toaster />
        <div className="flex w-full justify-between gap-x-6">
          <div className="w-full">
            <Field
              required
              autoCapitalize="none"
              placeholder="Company's Name"
              label="Company's Name"
              name="name"
              type="text"
              className="w-full mt-1 mb-4 font-semibold rounded-xl input-secondary border-gray-200 border invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
            />
            <Field
              autoCapitalize="none"
              label="From"
              placeholder="From"
              name="from"
              type="month"
              className="mr-1 mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
            />
          </div>
          <div className="w-full">
            <Field
              autoCapitalize="none"
              placeholder="Position"
              label="Position"
              name="description"
              type="text"
              className="w-full mt-1 mb-4 font-semibold rounded-xl input-secondary border-gray-200 border invalid:text-red-500 autofill:text-secondary autofill:bg-blue-200"
            />
            <Field
              autoCapitalize="none"
              label="To"
              placeholder="To"
              name="to"
              type="month"
              className="mr-1 mt-1 lg:mt-2 border border-gray-200 font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
            />
          </div>
        </div>
        <Submit className="w-full rounded-xl text-base-100 text-md md:w-fit px-6 py-2 mt-4" title={isLoading ? <Loader /> : "Save"} />{" "}
      </Form>
    </>
  );
};

FormWorkEducation.propTypes = {
  user: Proptypes.object,
  idWork: Proptypes.string,
};

export default FormWorkEducation;
