import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import SendInvites from "./SendInvitesTabs/SendInvites";
import PendingInvites from "./SendInvitesTabs/PendingInvites";

const SendInviteTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mb-3 bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold">{`Send Invites`}</h4>
        <TabContext value={value}>
          <div>
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
                      <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">Send Invites</div>
                    ) : (
                      <div className="flex text-primary">Send Invites</div>
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
                      <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">Pending Invites</div>
                    ) : (
                      <div className="flex text-primary">Pending Invites</div>
                    )}
                  </Fragment>
                }
                value="2"
              />
            </TabList>
          </div>
          <TabPanel value="1">
            <SendInvites />
          </TabPanel>
          <TabPanel value="2">
            <PendingInvites />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

SendInviteTabs.propTypes = {
  user: PropTypes.object,
};

export default SendInviteTabs;
