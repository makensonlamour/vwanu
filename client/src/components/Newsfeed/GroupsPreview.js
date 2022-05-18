import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Stack, styled, Paper, Tabs, Tab } from "@mui/material";

const GroupsPreview = ({ data }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8">
        <h2 className="my-5 text-xl font-medium">Groups</h2>
        <Tabs
          sx={{ marginBottom: "1rem" }}
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab sx={{ textTransform: "capitalize" }} value="one" label="Newest" />
          <Tab sx={{ textTransform: "capitalize" }} value="two" label="Popular" />
          <Tab sx={{ textTransform: "capitalize" }} value="three" label="Suggested" />
        </Tabs>
        <Stack spacing={1}>
          {data.map((group, idx) => {
            return (
              <Item
                key={group.name + "" + idx}
                elevation={0}
                style={{
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  display: "flex",
                }}
              >
                <div className="w-[3rem]">
                  <img
                    className="mask mask-squircle items-center justify-center w-[5rem] h-10 rounded-lg"
                    src={group.image}
                    alt={group.name}
                  />
                </div>
                <div>
                  <p to="#" className=" text-sm line-clamp-2 max-w-[22ch] text-ellipsis whitespace-wrap overflow-hidden ml-2 pb-1">
                    <Link className="hover:text-secondary" to="/">
                      <span className="font-semibold">{group.name}</span>
                      {group.where}
                    </Link>
                  </p>
                  <p className=" text-gray-400 font-medium text-sm ml-2">
                    {group.members}
                    {" members"}
                  </p>
                </div>
              </Item>
            );
          })}
        </Stack>
        <button className="my-4 bg-primary py-1 px-3 text-white rounded-lg hover:bg-secondary">See All</button>
      </div>
    </>
  );
};

GroupsPreview.propTypes = {
  data: PropTypes.array.isRequired,
};

export default GroupsPreview;
