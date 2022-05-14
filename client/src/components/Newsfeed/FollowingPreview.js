import React from "react";
import PropTypes from "prop-types";
import { Stack, styled, Paper } from "@mui/material";

const FollowingPreview = ({ data }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8">
        <h2 className="my-5 text-xl font-medium">
          {`I'm Following `}
          <span className="font-normal text-lg text-gray-400">13</span>
        </h2>
        <Stack direction="row" justifyContent="start" alignItems="center" spacing={0} sx={{ flexWrap: "wrap" }}>
          {data.map((following) => {
            return (
              <Item key={following.image} elevation={0}>
                <div className="w-[3rem] mx-[0.15rem]">
                  <img className="object-cover mask mask-squircle w-[3rem] h-16 rounded-lg" src={following.image} alt={following.image} />
                </div>
              </Item>
            );
          })}
        </Stack>
      </div>
    </>
  );
};

FollowingPreview.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FollowingPreview;
