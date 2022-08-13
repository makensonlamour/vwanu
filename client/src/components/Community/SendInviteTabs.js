/*eslint-disable */
import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useParams, useOutletContext } from "react-router-dom";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
// import Friends from "./NetworkTab/Friends";
// import Followers from "./NetworkTab/Followers";
// import FormStepSix from "./../../features/community/component/FormStepSix";
import SendInvites from "./SendInvitesTabs/SendInvites";

const SendInviteTabs = ({ user }) => {
  const me = useOutletContext();
  const { id } = useParams();
  const [value, setValue] = useState("1");
  const [totalFriend, setTotalFriend] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);
  //   const [totalFollowing, setTotalFollowing] = useState(0);
  //   const [totalRequest, setTotalRequest] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold">{`My Network`}</h4>
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
                      <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Send Invites</div>
                    ) : (
                      <div className="flex">Send Invites</div>
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
                      <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Pending Invites</div>
                    ) : (
                      <div className="flex">Pending Invites</div>
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
            <div>Pending Invites</div>
            {/* <Followers user={user} fn={setTotalFollowers} /> */}
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
