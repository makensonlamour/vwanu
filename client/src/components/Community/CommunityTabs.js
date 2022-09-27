import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { allTabs } from "./Tablink.data";

export default function CommunityTabs({ communityData }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchParams] = useSearchParams();
  const urlTabs = searchParams.get("tabs");
  // const editTabs = searchParams.get("subtabs");
  let run = true;

  const handleUrlChange = () => {
    if (urlTabs === "invites" && run) {
      run = false;
      setValue("5");
    } else {
      run = false;
      setValue("1");
    }
  };

  useEffect(() => {
    if (urlTabs && run) {
      handleUrlChange();
    }
    if (!run) {
      return () => {
        // cancel the subscription
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTabs]);

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
              allowScrollButtonsMobile
            >
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Feed" value="1" component={Link} to={allTabs[0]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Members" value="2" component={Link} to={allTabs[1]} />
              <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Albums" value="3" component={Link} to={allTabs[2]} />
              {communityData?.haveDiscussionForum && (
                <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Discussions" value="4" component={Link} to={allTabs[3]} />
              )}
              {communityData?.canInvite && (
                <Tab
                  style={{ textTransform: "capitalize", fontSize: 15 }}
                  label="Send Invites"
                  value="5"
                  component={Link}
                  to={allTabs[4]}
                />
              )}
              {/* <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Send Message" value="6" component={Link} to={allTabs[5]} /> */}
              {communityData?.IsMember?.role === "admin" && (
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
