import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import "react-tabs/style/react-tabs.css";
import FormUploadCover from "../../../features/user/Profile/component/FormUploadCover";
import { Form } from "../../../components/form";
import { updateGroupPicture } from "../../../features/community/communitySlice";

const uploadProfileSuccess = () =>
  toast.success("cover picture updated successfully!", {
    position: "top-center",
  });

const uploadProfileError = () =>
  toast.error("Sorry. Error on updating cover picture!", {
    position: "top-center",
  });

const CoverPhotoEdit = ({ data, setData }) => {
  const user = useOutletContext();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [img, getImg] = useState([]);

  const handleSave = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("coverPicture", img[0]);
    formData.append("id", data?.id || id);
    try {
      const res = await updateGroupPicture({ formData, id: data?.id || id });
      if (res?.data) {
        uploadProfileSuccess();
        // let result = await updateCommunity.mutateAsync(formData);
        setData(res?.data);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      uploadProfileError();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form className="w-full">
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
      </Form>
    </>
  );
};

CoverPhotoEdit.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default CoverPhotoEdit;
