import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import routesPath from "../../routesPath";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import CommunityList from "../../features/community/component/CommunityList";
import { useGetMyCommunityList, useGetCommunityIn } from "../../features/community/communitySlice";
import InvitationTabs from "./../Community/Invitation/InvitationTabs";

const CommunityTab = ({ user }) => {
  const { id } = useParams();
  const myUser = useOutletContext();
  const [value, setValue] = useState("1");
  const {
    data: communityList,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetMyCommunityList(["community", "all"], user?.id !== null ? true : false, user?.id);

  const {
    data: myCommunityList,
    isError: myCommunityError,
    isLoading: myCommunityLoading,
    hasNextPage: myCommunityhasNextPage,
    fetchNextPage: myCommunityfetchNextPage,
  } = useGetCommunityIn(["community", "particular"], user?.id !== null ? true : false, user?.id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="">
        <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
          <div className="flex justify-between items-center pb-4">
            <p className="font-bold text-lg text-primary">Community</p>
            {myUser?.id?.toString() === id?.toString() && (
              <Link
                to={"../.." + routesPath.ADD_GROUPS}
                className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-2 px-6 font-semibold"
              >
                Create Community
              </Link>
            )}
          </div>
          <TabContext value={value}>
            <div className="">
              {id?.toString() === myUser?.id?.toString() && (
                <TabList
                  TabIndicatorProps={{ style: { background: "inherit" } }}
                  sx={{ justifyContent: "start" }}
                  orientation="horizontal"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {/* <Tab
                  style={{ heigth: "150px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", heigth: "150px" }}
                  label={
                    <Fragment>
                      {value === "1" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">Community created</div>
                      ) : (
                        <div className="flex text-primary">Community created</div>
                      )}
                    </Fragment>
                  }
                  value="1"
                /> */}
                  {user?.id === myUser?.id && (
                    <Tab
                      sx={{ textTransform: "capitalize" }}
                      label={
                        <Fragment>
                          {value === "2" ? (
                            <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">My Community</div>
                          ) : (
                            <div className="flex text-primary">My Community</div>
                          )}
                        </Fragment>
                      }
                      value="2"
                    />
                  )}
                  {user?.id === myUser?.id && (
                    <Tab
                      sx={{ textTransform: "capitalize" }}
                      label={
                        <Fragment>
                          {value === "3" ? (
                            <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">Invitations</div>
                          ) : (
                            <div className="flex text-primary">Invitations</div>
                          )}
                        </Fragment>
                      }
                      value="3"
                    />
                  )}
                </TabList>
              )}
              <TabPanel value="1">
                <div className=" w-full">
                  <CommunityList
                    communityList={communityList}
                    isLoading={isLoading}
                    isError={isError}
                    hasNextPage={myCommunityhasNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className=" w-full">
                  <CommunityList
                    communityList={myCommunityList}
                    isLoading={myCommunityLoading}
                    isError={myCommunityError}
                    hasNextPage={hasNextPage}
                    fetchNextPage={myCommunityfetchNextPage}
                  />
                </div>
              </TabPanel>
              {user?.id === myUser?.id && (
                <TabPanel value="3">
                  <div className="">
                    <InvitationTabs />
                  </div>
                </TabPanel>
              )}
            </div>
          </TabContext>
        </div>
      </div>
    </>
  );
};

CommunityTab.propTypes = {
  user: PropTypes.object,
};

export default CommunityTab;
