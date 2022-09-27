import React, { useState, Fragment, useEffect } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { useGetCommunityList, useGetMyCommunityList } from "../../features/community/communitySlice";
import CommunityList from "../../features/community/component/CommunityList";
import InvitationTabs from "./../../components/Community/Invitation/InvitationTabs";

const Community = () => {
  const user = useOutletContext();
  const [value, setValue] = useState("1");
  const [searchParams] = useSearchParams();
  const tabsUrl = searchParams.get("tabs");
  let run = true;

  const { data: communityList, isLoading, fetchNextPage, hasNextPage, isError } = useGetCommunityList(["community", "all"], true);
  const { data: myCommunityList } = useGetMyCommunityList(["community", "me"], user?.id !== undefined ? true : false, user?.id);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUrlChange = () => {
    if (tabsUrl === "myCommunity" && run) {
      run = false;
      setValue("2");
    }
  };

  useEffect(() => {
    if (tabsUrl && run) {
      handleUrlChange();
    }
    if (!run) {
      return () => {
        // cancel the subscription
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabsUrl]);

  return (
    <>
      <div className="max-w-[1450px]">
        <div className="bg-white border border-gray-300 w-full rounded-lg p-2 md:p-4 my-2">
          <div className="flex justify-between items-center pb-4">
            <p className="font-bold text-lg md:text-3xl">Community</p>
            <Link
              to={"../../groups/add"}
              className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-1 md:py-2 px-4 md:px-6 font-semibold"
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
                scrollButtons={true}
                allowScrollButtonsMobile
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
                <div className="lg:mt-0 w-full">
                  <CommunityList
                    communityList={communityList}
                    isLoading={isLoading}
                    isError={isError}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="lg:mt-0 w-full">
                  <CommunityList
                    communityList={myCommunityList}
                    isLoading={isLoading}
                    isError={isError}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="mt-0 w-full">
                  <div className="flex">
                    <InvitationTabs />
                  </div>
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
