import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
import { FiUser, FiEdit } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import EditProfileTabs from "../../features/user/Profile/component/EditProfileTabs";
import EditProfilePictureTabs from "../../features/user/Profile/component/EditProfilePictureTabs";
import EditCoverPictureTabs from "../../features/user/Profile/component/EditCoverPictureTabs";

const EditProfile = () => {
  const user = useOutletContext();

  const [value, setValue] = useState("1");
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mt-8 mb-6 px-2">
        <div className="flex justify-between mb-2">
          <h4 className="text-3xl font-bold">Edit Profile</h4>
          <Link
            to={"../../profile/" + user?.id}
            className="btn align-middle btn-sm bg-gray-300 border-0 hover:bg-primary hover:text-base-100 px-5 py-2 capitalize"
          >
            <FiUser size={"18px"} className="mr-1" /> View My Profile
          </Link>
        </div>
        <div className="flex flex-col md:flex-row mt-8 mb-4">
          <TabContext value={value}>
            <div className="basis-[20%]">
              <div className="">
                <TabList
                  TabIndicatorProps={{ style: { background: "inherit" } }}
                  sx={{ justifyContent: "start" }}
                  orientation={`${mediaQuery.matches ? "horizontal" : "vertical"}`}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    style={{ heigth: "150px" }}
                    sx={{ textTransform: "capitalize", textAlign: "left", heigth: "150px" }}
                    label={
                      <Fragment>
                        {value === "1" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">
                            <FiEdit size={"18px"} className="mr-1" /> Edit
                          </div>
                        ) : (
                          <div className="flex">
                            <FiEdit size={"18px"} className="mr-3" />
                            Edit
                          </div>
                        )}
                      </Fragment>
                    }
                    value="1"
                  />
                  <Tab
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "2" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">
                            <ImProfile size={"18px"} className="mr-1" /> Profile Photo
                          </div>
                        ) : (
                          <div className="flex">
                            <ImProfile size={"18px"} className="mr-3" />
                            Profile Photo
                          </div>
                        )}
                      </Fragment>
                    }
                    value="2"
                  />
                  <Tab
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "3" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">
                            <BsCardImage size={"18px"} className="mr-1" /> Cover Picture
                          </div>
                        ) : (
                          <div className="flex">
                            <BsCardImage size={"18px"} className="mr-2" />
                            Cover Picture
                          </div>
                        )}
                      </Fragment>
                    }
                    value="3"
                  />
                </TabList>
              </div>
            </div>
            <div className="basis-[80%]">
              <TabPanel value="1">
                <EditProfileTabs user={user} />
              </TabPanel>
              <TabPanel value="2">
                <EditProfilePictureTabs user={user} />
              </TabPanel>
              <TabPanel value="3">
                <EditCoverPictureTabs user={user} />
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object,
};

export default EditProfile;
