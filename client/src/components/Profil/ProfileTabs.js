import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { allTabs } from "./Tablink.data";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [searchParams] = useSearchParams();
  const tabsUrl = searchParams.get("tabs");
  let run = true;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUrlChange = () => {
    if (tabsUrl === "about" && run) {
      run = false;
      setValue("2");
    } else if (tabsUrl === "network" && run) {
      run = false;
      setValue("3");
    } else if (tabsUrl === "albums" && run) {
      run = false;
      setValue("4");
    } else if (tabsUrl === "blog" && run) {
      run = false;
      setValue("5");
    } else if (tabsUrl === "community" && run) {
      run = false;
      setValue("6");
    } else {
      run = false;
      setValue("1");
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

  // const allTabs = [".", "./about", "./friends", "./Albums", "./Likes", "./Groups"];

  return (
    <>
      <Box elevation={0} variant="elevation0" className="bg-placeholder-color" sx={{ width: "100%", zIndex: "fab" }}>
        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <TabList
              elevation={0}
              className="bg-placeholder-color text-sm rounded-b-lg mt-2"
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              allowScrollButtonsMobile
            >
              <Tab
                style={{ textTransform: "capitalize", fontSize: 15 }}
                sx={{ color: "#ff4200" }}
                label="Post"
                value="1"
                component={Link}
                to={allTabs[0]}
              />
              <Tab
                style={{ textTransform: "capitalize", fontSize: 15 }}
                sx={{ color: "#ff4200" }}
                label="About"
                value="2"
                component={Link}
                to={allTabs[1]}
              />
              <Tab
                style={{ textTransform: "capitalize", fontSize: 15 }}
                sx={{ color: "#ff4200" }}
                label="Network"
                value="3"
                component={Link}
                to={allTabs[2]}
              />
              <Tab
                style={{ textTransform: "capitalize", fontSize: 15 }}
                sx={{ color: "#ff4200" }}
                label="Media"
                value="4"
                component={Link}
                to={allTabs[3]}
              />
              <Tab
                style={{ textTransform: "capitalize", fontSize: 15 }}
                sx={{ color: "#ff4200" }}
                label="Blog"
                value="5"
                component={Link}
                to={allTabs[4]}
              />
              <Tab
                style={{ textTransform: "capitalize", fontSize: 15 }}
                sx={{ color: "#ff4200" }}
                label="Community"
                value="6"
                component={Link}
                to={allTabs[5]}
              />
              {/* <Tab style={{ textTransform: "capitalize", fontSize: 15 }} label="Forum" value="7" component={Link} to={allTabs[6]} /> */}
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}
