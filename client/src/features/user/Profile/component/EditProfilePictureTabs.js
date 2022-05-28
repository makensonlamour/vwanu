import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormUploadPhoto from "./FormUploadPhoto";

const EditProfilePictureTabs = ({ user }) => {
  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-16 rounded-xl">
        <h4 className="mb-8 text-2xl font-semibold">{`Change Profile Picture`}</h4>
        <div className="px-4 py-3 bg-info w-full border border-sky-300 rounded-2xl">
          <span className="text-secondary text-sm">{`Your profile photo will be used on your profile and throughout the site.`}</span>
        </div>
        <div className="mb-8 mt-10">
          <Tabs>
            <TabList>
              <Tab>Upload</Tab>
              <Tab>Take Photo</Tab>
              <Tab>Delete</Tab>
            </TabList>

            <TabPanel className="mt-8">
              <FormUploadPhoto user={user} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
        </div>
        <div className="px-4 py-3 bg-warning w-full border border-yellow-300 rounded-2xl">
          <p className="text-v-yellow-dark text-sm">{`For best results, upload an image that is 300px by 300px or larger.`}</p>
          <p className="text-v-yellow-dark text-sm">{`If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab.`}</p>
        </div>
      </div>
    </>
  );
};

EditProfilePictureTabs.propTypes = { user: PropTypes.object };

export default EditProfilePictureTabs;
