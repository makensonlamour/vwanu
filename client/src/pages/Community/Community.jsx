import React, { useState, Fragment } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { useGetCommunityList, useGetMyCommunityList } from "../../features/community/communitySlice";
import CommunityList from "../../features/community/component/CommunityList";

const Community = () => {
  const user = useOutletContext();
  const [value, setValue] = useState("1");
  const { data: communityList } = useGetCommunityList(["community", "all"]);
  const { data: myCommunityList } = useGetMyCommunityList(["community", "me"], user?.id !== undefined ? true : false, user?.id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="">
        <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
          <div className="flex justify-between items-center pb-4">
            <p className="font-bold text-3xl">Community</p>
            <Link
              to={"../../groups/add"}
              className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-2 px-6 font-semibold"
            >
              Create Community
            </Link>
          </div>
          <TabContext value={value}>
            <div className="">
              <TabList
                TabIndicatorProps={{ style: { background: "inherit" } }}
                sx={{ justifyContent: "start" }}
                orientation="horizontal"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  style={{ heigth: "150px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", heigth: "150px" }}
                  label={
                    <Fragment>
                      {value === "1" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Community</div>
                      ) : (
                        <div className="flex">Community</div>
                      )}
                    </Fragment>
                  }
                  value="1"
                />
                <Tab
                  style={{ heigth: "150px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", heigth: "150px" }}
                  label={
                    <Fragment>
                      {value === "2" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">My Community</div>
                      ) : (
                        <div className="flex">My Community</div>
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
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Invitations</div>
                      ) : (
                        <div className="flex">Invitations</div>
                      )}
                    </Fragment>
                  }
                  value="3"
                />
              </TabList>
              <TabPanel value="1">
                <div className="mt-8 w-full">
                  <CommunityList communityList={communityList} />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="mt-8 w-full">
                  <CommunityList communityList={myCommunityList} />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="mt-4">
                  <div className="flex">Invitations</div>
                </div>
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </>
  );
};

export default Community;
