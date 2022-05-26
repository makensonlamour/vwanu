import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stack, styled, Paper, Tooltip } from "@mui/material";

const FollowingPreview = ({ data }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8">
        <h2 className="my-5 text-xl font-medium">
          {`I'm Following `}
          <span className="font-normal text-lg text-gray-400">{data?.length}</span>
        </h2>
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          spacing={0}
          sx={{ flexWrap: "wrap", marginLeft: "auto", marginRight: "auto" }}
        >
          {data?.map((following) => {
            return (
              <Item key={following?.firstName + " " + following?.lastName} elevation={0}>
                <Tooltip className="" title={following?.firstName + " " + following?.lastName}>
                  <Link to={"../../profile/" + following?.id}>
                    <div className="w-[3.5rem] mx-[0.15rem]">
                      <img
                        className="object-cover mask mask-squircle w-[3rem] h-16 rounded-lg"
                        src={following?.profilePicture}
                        alt={following?.firstName + " " + following?.lastName}
                      />
                    </div>
                  </Link>
                </Tooltip>
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
