import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useSearchParams } from "react-router-dom";
import FormOverview from "./FormOverview";
import FormContactInfo from "./FormContactInfo";
import FormPlaceLived from "./FormPlaceLived";
import FormWorkEducation from "./FormWorkEducation";
import FormBiography from "./FormBiography";

const EditProfileTabs = ({ user }) => {
  const [value, setValue] = useState("one");
  const [searchParams] = useSearchParams();
  // const urlTabs = searchParams.get("subTabs");
  const editTabs = searchParams.get("subtabs");
  const idWork = searchParams.get("idWork");
  let run = true;
  // let title = "";
  const [title, setTitle] = useState("Edit General Information");

  const handleUrlChange = () => {
    if (editTabs === "general" && run) {
      run = false;
      setValue("one");
    } else if (editTabs === "contact" && run) {
      run = false;
      setValue("two");
    } else if (editTabs === "place" && run) {
      run = false;
      setValue("three");
    } else if (editTabs === "work" && run) {
      run = false;
      setValue("four");
    } else if (editTabs === "biography" && run) {
      run = false;
      setValue("five");
    } else {
      run = false;
      setValue("one");
    }
  };

  const handleTitle = () => {
    if (value === "one") {
      setTitle("Edit General Information");
    } else if (value === "two") {
      setTitle("Edit Contact Info");
    } else if (value === "three") {
      setTitle("Edit Places Lived");
    } else if (value === "four") {
      setTitle("Edit Work experience");
    } else if (value === "five") {
      setTitle("Edit Biography");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    handleTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (editTabs && run) {
      handleUrlChange();
    }
    if (!run) {
      return () => {
        // cancel the subscription
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTabs]);

  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold text-primary">{`${title}`}</h4>
        <TabContext value={value}>
          <div>
            <TabList
              sx={{ marginBottom: "-2rem", borderBottom: "1px #eff3ff solid" }}
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary TabList  example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }} value="one" label="General Information" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }} value="two" label="Contact Info" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }} value="three" label="Places Lived" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }} value="four" label="Work Experience" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem", color: "#ff4200" }} value="five" label="Biography" />
            </TabList>
          </div>
          <TabPanel value="one">
            <FormOverview user={user} />
          </TabPanel>
          <TabPanel value="two">
            <FormContactInfo user={user} />
          </TabPanel>
          <TabPanel value="three">
            <FormPlaceLived user={user} />
          </TabPanel>
          <TabPanel value="four">
            <FormWorkEducation user={user} idWork={idWork} />
          </TabPanel>
          <TabPanel value="five">
            <FormBiography user={user} />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

EditProfileTabs.propTypes = {
  user: PropTypes.object,
};

export default EditProfileTabs;
