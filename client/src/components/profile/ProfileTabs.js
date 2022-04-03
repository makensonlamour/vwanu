import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Post" to="" />

        <LinkTab label="About">
          <Link to={"/about"} />
        </LinkTab>

        <LinkTab label="Friend" to="/friend" />
        <LinkTab label="Album" to="/album" />
      </Tabs>
    </Box>
  );
}
