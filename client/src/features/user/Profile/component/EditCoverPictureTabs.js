import React from "react";
import PropTypes from "prop-types";
import "react-tabs/style/react-tabs.css";
import FormUploadCover from "./FormUploadCover";
import toast, { Toaster } from "react-hot-toast";
import { updateProfilePicture } from "../../../../features/user/userSlice";

const uploadCoverSuccess = () =>
  toast.success("Cover picture updated successfully!", {
    position: "top-center",
  });

const uploadCoverError = () =>
  toast.error("Sorry. Error on updating Cover picture!", {
    position: "top-center",
  });

const EditCoverPictureTabs = ({ user }) => {
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("coverPicture", null);
    formData.append("UserId", user?.id);
    try {
      const res = await updateProfilePicture({ formData, id: user?.id });
      if (res?.data) {
        uploadCoverSuccess();
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      uploadCoverError();
    }
  };
  return (
    <>
      <Toaster />
      <div className="bg-white border border-gray-300 py-10 px-4 md:px-16 rounded-xl">
        <h4 className="text-center md:text-left mb-8 text-xl font-semibold text-primary">{`Change Cover Picture`}</h4>
        <div className="px-4 py-3 bg-white w-full border border-placeholder-color rounded-xl">
          <span className="text-black text-sm">{`Your Cover Photo will be used to customize the header of your profile.`}</span>
        </div>
        <div className="mb-8 mt-10">
          <FormUploadCover user={user} />
        </div>
        <div className="px-4 py-3 bg-white w-full border border-placeholder-color rounded-xl">
          <p className="text-black text-sm">{`For best results, upload an image that is 640px by 320px or larger.`}</p>
        </div>
        {user?.coverPicture?.original !== "null" ? (
          <div className="mt-8">
            <p className="">{`If you'd like to delete your current cover photo, use the delete Cover Photo button`}.</p>
            <div className="mt-6">
              <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-base-100 hover:bg-secondary rounded-xl">
                Delete My Cover Picture
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

EditCoverPictureTabs.propTypes = { user: PropTypes.object };

export default EditCoverPictureTabs;
