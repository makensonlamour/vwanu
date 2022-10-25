import React, { useState, Fragment, useEffect } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { TabPanel, TabContext, TabList } from "@mui/lab";
// import { makeStyles } from "@mui/material";
import { Tab } from "@mui/material";
import { useGetCommunityList, useGetMyCommunityList, useGetCommunityIn } from "../../features/community/communitySlice";
import CommunityList from "../../features/community/component/CommunityList";
import InvitationTabs from "./../../components/Community/Invitation/InvitationTabs";

// const useStyles = makeStyles({
//   tabPanelRoot: {
//     padding: 0,
//   },
// });

const Community = () => {
  const user = useOutletContext();
  const [value, setValue] = useState("1");
  const [searchParams] = useSearchParams();
  const tabsUrl = searchParams.get("tabs");
  let run = true;
  // const classes = useStyles();

  const { data: communityList, isLoading, fetchNextPage, hasNextPage, isError } = useGetCommunityList(["community", "all"], true);
  const { data: myCommunityList } = useGetMyCommunityList(["community", "me"], user?.id !== undefined ? true : false, user?.id);
  const {
    data: CommunityListIn,
    isError: CommunityInError,
    isLoading: CommunityInLoading,
    hasNextPage: CommunityInhasNextPage,
    fetchNextPage: CommunityInfetchNextPage,
  } = useGetCommunityIn(["community", "particular"], user?.id !== null ? true : false, user?.id);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUrlChange = () => {
    if (tabsUrl === "myCommunity" && run) {
      run = false;
      setValue("3");
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
                TabIndicatorProps={{ style: { background: "inherit", width: "10px" } }}
                sx={{ justifyContent: "start" }}
                style={{ padding: 0 }}
                orientation="horizontal"
                variant="scrollable"
                onChange={handleChange}
                aria-label="scrollable force tabs example"
                scrollButtons
                allowScrollButtonsMobile={true}
              >
                <Tab
                  style={{ height: "0px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", height: "0px" }}
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
                  style={{ heigth: "0px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", heigth: "0px", padding: 0 }}
                  label={
                    <Fragment>
                      {value === "2" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Community Created</div>
                      ) : (
                        <div className="flex">Community Created</div>
                      )}
                    </Fragment>
                  }
                  value="2"
                />
                <Tab
                  style={{ heigth: "150px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", heigth: "150px" }}
                  label={
                    <Fragment>
                      {value === "3" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">My Community</div>
                      ) : (
                        <div className="flex">My Community</div>
                      )}
                    </Fragment>
                  }
                  value="3"
                />
                <Tab
                  sx={{ textTransform: "capitalize" }}
                  label={
                    <Fragment>
                      {value === "4" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Invitations</div>
                      ) : (
                        <div className="flex">Invitations</div>
                      )}
                    </Fragment>
                  }
                  value="4"
                />
              </TabList>
              <TabPanel value="1" style={{ padding: 0 }}>
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
              <TabPanel value="2" style={{ padding: 0 }}>
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
              <TabPanel value="3" style={{ padding: 0 }}>
                <div className="lg:mt-0 w-full">
                  <CommunityList
                    communityList={CommunityListIn}
                    isLoading={CommunityInLoading}
                    isError={CommunityInError}
                    hasNextPage={CommunityInhasNextPage}
                    fetchNextPage={CommunityInfetchNextPage}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4" style={{ padding: 0 }}>
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
