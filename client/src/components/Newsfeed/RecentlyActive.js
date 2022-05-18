import React from "react";
import PropTypes from "prop-types";
import { Stack, styled, Paper } from "@mui/material";

const RecentlyActive = ({ data }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8">
        <h2 className="my-5 text-xl font-medium">Recently Active Members</h2>
        <Stack direction="row" justifyContent="start" alignItems="center" spacing={0} sx={{ flexWrap: "wrap" }}>
          {data.map((following) => {
            return (
              <Item key={following.image} elevation={0}>
                <div className="w-[3rem] mx-1">
                  <img className="object-cover mask mask-squircle w-[3rem] h-16 rounded-lg" src={following.image} alt={following.image} />
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

RecentlyActive.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RecentlyActive;
