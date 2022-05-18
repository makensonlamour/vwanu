import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { allTabs } from "./Tablink.data";

export default function LabTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const allTabs = [".", "./about", "./friends", "./Albums", "./Likes", "./Groups"];

  return (
    <>
      <Box elevation={0} variant="elevation0" className="bg-placeholder-color" sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box>
            <TabList
              elevation={0}
              className="bg-placeholder-color text-sm rounded-b-lg mt-2"
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ textTransform: "capitalize" }}
            >
              <Tab label="Post" value="1" component={Link} to={allTabs[0]} />
              <Tab label="About" value="2" component={Link} to={allTabs[1]} />
              <Tab label="Friends" value="3" component={Link} to={allTabs[2]} />
              <Tab label="Album" value="4" component={Link} to={allTabs[3]} />
              <Tab label="Likes" value="5" component={Link} to={allTabs[4]} />
              <Tab label="Groups" value="6" component={Link} to={allTabs[5]} />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}
