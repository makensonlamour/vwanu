import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import routesPath from "../../routesPath";
import { Link, useParams } from "react-router-dom";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import CommunityList from "../../features/community/component/CommunityList";

const CommunityTab = ({ user }) => {
  const { id } = useParams();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="">
        <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
          <div className="flex justify-between items-center pb-4">
            <p className="font-bold text-3xl">Community</p>
            {user?.id?.toString() === id?.toString() && (
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
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">My Community</div>
                      ) : (
                        <div className="flex">My Community</div>
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
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Invitations</div>
                      ) : (
                        <div className="flex">Invitations</div>
                      )}
                    </Fragment>
                  }
                  value="2"
                />
              </TabList>
              <TabPanel value="1">
                <div className="mt-8 wull">
                  <CommunityList />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="mt-4"></div>
              </TabPanel>
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
