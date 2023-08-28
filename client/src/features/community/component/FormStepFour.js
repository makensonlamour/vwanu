import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdGroup } from "react-icons/md";
import "react-tabs/style/react-tabs.css";
import FormUploadPhoto from "../../user/Profile/component/FormUploadPhoto";
import { Form } from "../../../components/form";
import { updateGroupPicture } from "../communitySlice";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const uploadProfileSuccess = () =>
  toast.success("profile picture updated successfully!", {
    position: "top-center",
  });

const uploadProfileError = () =>
  toast.error("Sorry. Error on updating profile picture!", {
    position: "top-center",
  });

const FormStepFour = ({ setStep, currentStep, data, setData }) => {
  const user = useOutletContext();
  // const updateCommunity = updateGroupPicture(["community", data?.id], data?.id, undefined, undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [img, getImg] = useState([]);
  //data
  // const [isEnabled, setIsEnabled] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);

    try {
      updateSuccess();
      setStep(currentStep + 1);
      //   window.location.reload();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };
  const handlePrevious = () => {
    setStep(currentStep - 1);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("profilePicture", img[0]);
    formData.append("id", data?.id);
    try {
      const res = await updateGroupPicture({ formData, id: data?.id });
      if (res?.data) {
        uploadProfileSuccess();
        // let result = await updateCommunity.mutateAsync(formData);
        setData(res?.data);
        // window.location.reload();
      }
    } catch (e) {
      console.log(e);
      uploadProfileError();
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("profilePicture", null);
    formData.append("id", data?.id);
    try {
      const res = await updateGroupPicture({ formData, id: data?.id });
      if (res?.data) {
        uploadProfileSuccess();
        setData(res?.data);
        // window.location.reload();
      }
    } catch (e) {
      console.log(e);
      uploadProfileError();
    }
  };

  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form className="w-full px-4 pb-2">
          <Toaster />

          {console.log(img)}

          {/*Privacy Options*/}
          {img?.length <= 0 ? (
            <div className="mx-auto mask mask-squircle my-6 flex justify-center items-center bg-gray-50 text-center text-gray-300 w-36 h-36">
              <MdGroup size={"96px"} className="" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="block mx-auto">
                <div className="mt-6 md:mt-0">
                  <div className="h-36 w-36">
                    <img
                      alt={user?.firstName}
                      src={img[0]?.preview}
                      className="h-36 w-36 mask mask-squircle object-cover"
                      // Revoke data uri after image is loaded
                      onLoad={() => {
                        URL.revokeObjectURL(img[0]);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="mt-2 flex flex-col justify-center">
                  <button
                    onClick={handleSave}
                    className="block mt-4 bg-primary px-5 py-2 border-0 text-base-100 hover:bg-secondary rounded-xl"
                  >
                    {isLoading ? <Loader /> : "Save"}
                  </button>
                </div> */}
              </div>
            </div>
          )}
          <div className="px-4 py-3 w-full">
            <p className="text-center text-sm">{`Upload a photo that represents this group. The image will be shown on the main group page, and in search results.`}</p>
            <p className="text-center text-sm py-2">{`To skip the group photo upload process select "Next Step".`}</p>
          </div>
          <div className="mb-8 mt-10">
            <Tabs>
              <TabList>
                <Tab>Upload</Tab>
                {/*} <Tab>Take Photo</Tab>{*/}
                <Tab>Delete</Tab>
              </TabList>

              <TabPanel className="mt-8">
                <FormUploadPhoto getImg={getImg} hideViewer={true} user={user} />
              </TabPanel>
              {/*<TabPanel>
              <h2>Any content 2</h2>
  </TabPanel>*/}
              <TabPanel>
                {user?.profilePicture?.original !== "null" ? (
                  <div className="mt-8">
                    <p className="">{`If you'd like to delete your current Profile Picture, use the delete Profile Picture button`}.</p>
                    <div className="mt-6">
                      <button onClick={handleDelete} className="px-6 py-3 bg-red-600 text-base-100 hover:bg-secondary rounded-xl">
                        Delete My Profile Picture
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <p className="bg-info text-secondary font-semibold px-6 py-4 rounded-xl">
                      {`You already delete your profile picture. Add a picture to your profile for a better experience`}.
                    </p>
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handlePrevious()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-fit rounded-xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Previous Step"}
            </button>
            <button
              onClick={() => {
                handleSave();
                handleNext();
              }}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-fit rounded-xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Next Step"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

FormStepFour.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default FormStepFour;
