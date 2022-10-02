/*eslint-disable */
import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import MemberList from "../../components/Member/MemberList";
import Friends from "../../components/Profil/NetworkTab/Friends";
import Request from "../../components/Profil/NetworkTab/Request";
import Followers from "../../components/Profil/NetworkTab/Followers";
import Following from "../../components/Profil/NetworkTab/Following";

const Member = () => {
  const user = useOutletContext();
  const [value, setValue] = useState("one");
  const [totalMember, setTotalMember] = useState(0);
  const [totalFriend, setTotalFriend] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalFollowing, setTotalFollowing] = useState(0);
  const [totalRequest, setTotalRequest] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-white border border-gray-300 py-5 px-2 md:px-10 rounded-xl mt-2">
        <p className="text-3xl font-bold">Member</p>
        <div className="py-4">
          <TabContext value={value}>
            <div>
              <TabList
                sx={{ marginBottom: "-2rem", borderBottom: "1px #eff3ff solid" }}
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary TabList  example"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="one" label={`Members`} />
                <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="two" label={`friends (${user?.amountOfFriend || 0})`} />
                <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="three" label={`Followers (${user?.amountOfFollower})`} />
                <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="four" label={`Following (${user?.amountOfFollowing})`} />
                <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="five" label={`Request (${totalRequest})`} />
              </TabList>
            </div>
            <TabPanel value="one" sx={{ width: "100%" }}>
              <MemberList user={user} fn={setTotalMember} />
            </TabPanel>
            <TabPanel value="two">
              <Friends user={user} fn={setTotalFriend} />
            </TabPanel>
            <TabPanel value="three">
              <Followers user={user} fn={setTotalFollowers} />
            </TabPanel>
            <TabPanel value="four">
              <Following user={user} fn={setTotalFollowing} />
            </TabPanel>
            <TabPanel value="five">
              <Request user={user} fn={setTotalRequest} />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
  );
};

Member.propTypes = {};

export default Member;
