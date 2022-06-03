import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import FormOverview from "./FormOverview";
import FormContactInfo from "./FormContactInfo";
import FormPlaceLived from "./FormPlaceLived";
import FormWorkEducation from "./FormWorkEducation";
import FormBiography from "./FormBiography";

const EditProfileTabs = ({ user }) => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl">
        <h4 className="md:text-left text-center mb-8 text-lg font-semibold">{`Edit "Work Experience" Information`}</h4>
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
            >
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="one" label="General Information" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="two" label="Contact Info" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="three" label="Places Lived" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="four" label="Work Experience" />
              <Tab sx={{ textTransform: "capitalize", fontSize: "1rem" }} value="five" label="Biography" />
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
            <FormWorkEducation user={user} />
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
