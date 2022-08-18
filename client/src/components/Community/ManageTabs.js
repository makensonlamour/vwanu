import React, { Fragment, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useGetCommunity } from "../../features/community/communitySlice";
import DetailsTab from "./ManageTab/DetailsTab";
import SettingsTab from "./ManageTab/SettingsTab";
import ProfilePhotoTab from "./ManageTab/ProfilePhotoTab";
import CoverPhotoTab from "./ManageTab/CoverPhotoTab";
import MembersTab from "./ManageTab/MembersTab";
import ForumTab from "./ManageTab/ForumTab";
import DeleteTab from "./ManageTab/DeleteTab";

const ManageTabs = () => {
  const user = useOutletContext();
  const { id } = useParams();
  const { data: communityData } = useGetCommunity(["community", id], id !== "undefined" ? true : false, id);

  const [value, setValue] = useState("1");
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="">
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
                    style={{ heigth: "150px", alignItems: "self-start", justifyContent: "flex-start" }}
                    sx={{
                      textTransform: "capitalize",
                      textAlign: "left",
                      heigth: "150px",
                    }}
                    label={
                      <Fragment>
                        {value === "1" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Details</div>
                        ) : (
                          <div className="flex">Details</div>
                        )}
                      </Fragment>
                    }
                    value="1"
                  />
                  <Tab
                    sx={{ textTransform: "capitalize" }}
                    style={{ alignItems: "self-start", justifyContent: "flex-start " }}
                    label={
                      <Fragment>
                        {value === "2" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Settings</div>
                        ) : (
                          <div className="flex">Settings</div>
                        )}
                      </Fragment>
                    }
                    value="2"
                  />
                  <Tab
                    style={{ alignItems: "self-start", justifyContent: "flex-sta rt" }}
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "3" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Photo</div>
                        ) : (
                          <div className="flex">Photo</div>
                        )}
                      </Fragment>
                    }
                    value="3"
                  />
                  <Tab
                    style={{ alignItems: "self-start", justifyContent: "flex-start" }}
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "4" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Cover Photo</div>
                        ) : (
                          <div className="flex">Cover Photo</div>
                        )}
                      </Fragment>
                    }
                    value="4"
                  />
                  <Tab
                    style={{ alignItems: "self-start", justifyContent: "flex-start" }}
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "5" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Members</div>
                        ) : (
                          <div className="flex">Members</div>
                        )}
                      </Fragment>
                    }
                    value="5"
                  />
                  <Tab
                    style={{ alignItems: "self-start", justifyContent: "flex-start" }}
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "6" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Forum</div>
                        ) : (
                          <div className="flex">Forum</div>
                        )}
                      </Fragment>
                    }
                    value="6"
                  />
                  <Tab
                    style={{ alignItems: "self-start", justifyContent: "flex-start" }}
                    sx={{ textTransform: "capitalize" }}
                    label={
                      <Fragment>
                        {value === "7" ? (
                          <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Delete</div>
                        ) : (
                          <div className="flex">Delete</div>
                        )}
                      </Fragment>
                    }
                    value="7"
                  />
                </TabList>
              </div>
            </div>
            <div className="basis-[80%]">
              <TabPanel value="1">
                <DetailsTab user={user} communityData={communityData?.data} />
              </TabPanel>
              <TabPanel value="2">
                <SettingsTab user={user} communityData={communityData?.data} />
              </TabPanel>
              <TabPanel value="3">
                <ProfilePhotoTab user={user} communityData={communityData?.data} />
              </TabPanel>
              <TabPanel value="4">
                <CoverPhotoTab user={user} communityData={communityData?.data} />
              </TabPanel>
              <TabPanel value="5">
                <MembersTab user={user} communityData={communityData?.data} />
              </TabPanel>
              <TabPanel value="6">
                <ForumTab user={user} communityData={communityData?.data} />
              </TabPanel>
              <TabPanel value="7">
                <DeleteTab user={user} communityData={communityData?.data} />
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </>
  );
};

export default ManageTabs;
