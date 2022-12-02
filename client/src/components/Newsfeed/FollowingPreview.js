import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stack, styled, Paper, Tooltip } from "@mui/material";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";
import { useQueryClient } from "react-query";
import Loader from "../common/Loader";

const FollowingPreview = ({ data, isError, isLoading }) => {
  const queryClient = useQueryClient();
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8 mb-4">
        <h2 className="my-2 px-2 text-md font-medium text-primary">
          {`I'm Following `}
          <span className="font-normal text-md text-gray-400">{data?.length || 0}</span>
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="py-5 m-auto text-center px-2 lg:px-2">
            {"There was an error while fetching the data. "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["user", "following"])}>
              Tap to retry
            </Link>
          </div>
        ) : data?.length > 0 ? (
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
                          src={following?.profilePicture?.original || following?.profilePicture}
                          alt={following?.firstName + " " + following?.lastName}
                        />
                      </div>
                    </Link>
                  </Tooltip>
                </Item>
              );
            })}
          </Stack>
        ) : (
          <div className="flex justify-center">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, You don't follow anyone."}
              tips={"Follow someone you may know or appreciate to everything about they."}
            />
          </div>
        )}
      </div>
    </>
  );
};

FollowingPreview.propTypes = {
  data: PropTypes.array.isRequired,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FollowingPreview;
