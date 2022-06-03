import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormUploadPhoto from "./FormUploadPhoto";
import toast, { Toaster } from "react-hot-toast";
import { updateProfilePicture } from "../../../../features/user/userSlice";

const uploadProfileSuccess = () =>
  toast.success("profile picture updated successfully!", {
    position: "top-center",
  });

const uploadProfileError = () =>
  toast.error("Sorry. Error on updating profile picture!", {
    position: "top-center",
  });

const EditProfilePictureTabs = ({ user }) => {
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("profilePicture", null);
    formData.append("UserId", user?.id);
    try {
      const res = await updateProfilePicture({ formData, id: user?.id });
      if (res?.data) {
        uploadProfileSuccess();
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      uploadProfileError();
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-white border border-gray-300 py-10 px-4 md:px-16 rounded-xl">
        <h4 className="text-center md:text-left mb-8 text-2xl font-semibold">{`Change Profile Picture`}</h4>
        <div className="px-4 py-3 bg-info w-full border border-sky-300 rounded-2xl">
          <span className="text-secondary text-sm">{`Your profile photo will be used on your profile and throughout the site.`}</span>
        </div>
        <div className="mb-8 mt-10">
          <Tabs>
            <TabList>
              <Tab>Upload</Tab>
              {/*} <Tab>Take Photo</Tab>{*/}
              <Tab>Delete</Tab>
            </TabList>

            <TabPanel className="mt-8">
              <FormUploadPhoto user={user} />
            </TabPanel>
            {/*<TabPanel>
              <h2>Any content 2</h2>
  </TabPanel>*/}
            <TabPanel>
              {user?.profilePicture?.original !== "null" ? (
                <div className="mt-8">
                  <p className="">{`If you'd like to delete your current Profile Picture, use the delete Profile Picture button`}.</p>
                  <div className="mt-6">
                    <button onClick={handleSubmit} className="px-6 py-3 bg-red-600 text-base-100 hover:bg-secondary rounded-xl">
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
      </div>
    </>
  );
};

EditProfilePictureTabs.propTypes = { user: PropTypes.object };

export default EditProfilePictureTabs;
