import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <h3 className="text-secondary font-semibold text-lg">{children}</h3>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EditProfileTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", marginBottom: 5, marginLeft: 1 }} className="rounded-lg border">
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", paddingTop: 2, paddingBottom: 2 }}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Contact and basic info" {...a11yProps(1)} />
          <Tab label=" Places lived" {...a11yProps(2)} />
          <Tab label="Work and education" {...a11yProps(3)} />
          <Tab label="Family and relationships" {...a11yProps(4)} />
          <Tab label=" Details about you" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Overview
        </TabPanel>
        <TabPanel value={value} index={1}>
          Contact and basic info
        </TabPanel>
        <TabPanel value={value} index={2}>
          Places lived
        </TabPanel>
        <TabPanel value={value} index={3}>
          Work and education
        </TabPanel>
        <TabPanel value={value} index={4}>
          Family and relationships
        </TabPanel>
        <TabPanel value={value} index={5}>
          Details about you
        </TabPanel>
      </Box>
    </>
  );
};

export default EditProfileTabs;
