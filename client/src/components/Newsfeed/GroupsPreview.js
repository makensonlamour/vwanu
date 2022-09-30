import React from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import CardGroup from "./CardGroup";

const GroupsPreview = ({ data, isError, isLoading }) => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mb-1 bg-white border border-gray-200 rounded-lg p-2 mt-8">
        <h2 className="my-2 px-2 text-md font-medium">Communities</h2>
        <TabContext value={value}>
          <div>
            <TabList
              sx={{ marginBottom: "0.1rem" }}
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab sx={{ textTransform: "capitalize" }} value="one" label="Newest" />
              <Tab sx={{ textTransform: "capitalize" }} value="two" label="Popular" />
              <Tab sx={{ textTransform: "capitalize" }} value="three" label="Suggested" />
            </TabList>
          </div>
          <TabPanel sx={{ margin: "0px", padding: "0.25rem" }} value="one">
            <div>
              <CardGroup data={data} isError={isError} isLoading={isLoading} />
            </div>
          </TabPanel>
          <TabPanel sx={{ margin: "0px", padding: "0.25rem" }} value="two">
            <div>
              <CardGroup data={data} isError={isError} isLoading={isLoading} />
            </div>
          </TabPanel>
          <TabPanel sx={{ margin: "0px", padding: "0.25rem" }} value="three">
            <div>
              <CardGroup data={data} isError={isError} isLoading={isLoading} />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

GroupsPreview.propTypes = {
  data: PropTypes.array.isRequired,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default GroupsPreview;
