import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import "react-tabs/style/react-tabs.css";
import FormUploadCover from "../../user/Profile/component/FormUploadCover";
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
  toast.success("cover picture updated successfully!", {
    position: "top-center",
  });

const uploadProfileError = () =>
  toast.error("Sorry. Error on updating cover picture!", {
    position: "top-center",
  });

const FormStepFive = ({ setStep, currentStep, data, setData }) => {
  const user = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [img, getImg] = useState([]);
  //data
  // const [isEnabled, setIsEnabled] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);

    try {
      updateSuccess();
      navigate("../../groups/" + data?.id + "/send-invites?tabs=invites");
      setIsLoading(false);
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
    formData.append("coverPicture", img[0]);
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

  // const handleDelete = async () => {
  //   const formData = new FormData();
  //   formData.append("coverPicture", null);
  //   formData.append("id", data?.id);
  //   try {
  //     const res = await updateGroupPicture({ formData, id: data?.id });
  //     if (res?.data) {
  //       uploadProfileSuccess();
  //       setData(res?.data);
  //       // window.location.reload();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     uploadProfileError();
  //   }
  // };

  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form className="w-full px-4 pb-2">
          <Toaster />

          <div className="px-4 pb-6 pt-4 w-full">
            <p className="text-center text-sm">{`The Cover Photo will be used to customize the header of your group.`}</p>
          </div>

          {img?.length > 0 && (
            <div className="flex flex-col md:flex-row">
              <div className="block mx-auto">
                <div className="mt-6 md:mt-0">
                  {img?.map((file) => {
                    return (
                      <div key={file?.path} className="mt-5 md:mt-0">
                        <div className="h-60 lg:w-[860px] mx-4 rounded-xl">
                          <img alt={user?.firstName} src={file?.preview} className="h-60 lg:w-[860px] object-cover rounded-xl" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-col justify-center">
                  <button
                    onClick={handleSave}
                    className="block mt-4 bg-primary px-5 py-2 border-0 text-base-100 hover:bg-secondary rounded-xl w-1/4 mx-auto"
                  >
                    {isLoading ? <Loader /> : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8 mt-10">
            <FormUploadCover getImg={getImg} hideViewer={true} user={user} />
          </div>
          <div className="px-4 py-3 bg-warning w-full border border-yellow-300 rounded-2xl">
            <p className="text-v-yellow-dark text-sm">{`For best results, upload an image that is 1950px by 450px or larger.`}</p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handlePrevious()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-fit rounded-xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Previous Step"}
            </button>
            <button
              onClick={() => handleNext()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-fit rounded-xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Finish"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

FormStepFive.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default FormStepFive;
