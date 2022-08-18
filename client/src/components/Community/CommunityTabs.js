import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { allTabs } from "./Tablink.data";

export default function CommunityTabs({ communityData, user }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const allTabs = [".", "./about", "./friends", "./Albums", "./Likes", "./Groups"];

  return (
    <>
      <Box elevation={0} variant="elevation0" className="bg-placeholder-color" sx={{ width: "100%", zIndex: "fab" }}>
        <TabContext value={value}>
          <Box>
            <TabList
              elevation={0}
              className="bg-placeholder-color text-sm rounded-b-lg mt-2"
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Feed" value="1" component={Link} to={allTabs[0]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Members" value="2" component={Link} to={allTabs[1]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Albums" value="3" component={Link} to={allTabs[2]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Discussions" value="4" component={Link} to={allTabs[3]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Send Invites" value="5" component={Link} to={allTabs[4]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Send Message" value="6" component={Link} to={allTabs[5]} />
              {user?.id.toString() === communityData?.UserId?.toString() && (
                <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Manage" value="7" component={Link} to={allTabs[6]} />
              )}
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}

CommunityTabs.propTypes = {
  user: PropTypes.object.isRequired,
  communityData: PropTypes.object,
};
