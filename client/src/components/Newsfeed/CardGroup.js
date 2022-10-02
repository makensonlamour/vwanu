import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { styled, Paper, Stack } from "@mui/material";
import { useQueryClient } from "react-query";
import Loader from "../common/Loader";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";
import { MdGroups } from "react-icons/md";

const CardGroup = ({ data, isError, isLoading }) => {
  console.log("test", data);
  const queryClient = useQueryClient();
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));
  return (
    <>
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
        <Stack spacing={1}>
          {/* eslint-disable-next-line array-callback-return */}
          {data?.map((group, idx) => {
            if (idx < 9) {
              return (
                <Item
                  key={group?.id}
                  elevation={0}
                  style={{
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    display: "flex",
                  }}
                >
                  <div className="w-[2.5rem] h-[2.5rem] items-center flex justify-center mask mask-squircle border border-gray-200">
                    {data?.profilePicture === null || data?.profilePicture === undefined ? (
                      <MdGroups size="32px" className="text-gray-300" />
                    ) : (
                      <img
                        className="mask mask-squircle items-center justify-center w-[5rem] h-10 rounded-lg"
                        src={group?.profilePicture}
                        alt={group?.name}
                      />
                    )}
                  </div>
                  <div>
                    <p to="#" className=" text-sm line-clamp-2 max-w-[22ch] text-ellipsis whitespace-wrap overflow-hidden ml-2 pb-1">
                      <Link className="hover:text-secondary" state={group} to={"../../groups/" + group?.id}>
                        <span className="font-semibold">{group?.name}</span>
                        <span className="ml-3 text-white text-xs bg-secondary py-[0.2rem] px-2 rounded-lg">{group?.privacyType}</span>
                      </Link>
                    </p>
                    <p className=" text-gray-400 font-medium text-sm ml-2">
                      {group?.amountOfMembers}
                      {" members"}
                    </p>
                  </div>
                </Item>
              );
            }
          })}
        </Stack>
      ) : (
        <div className="flex justify-center">
          <EmptyComponent
            border={false}
            icon={<ImSad size={"32px"} className="" />}
            placeholder={"Sorry, there's no dommunity now."}
            tips={"you can be the first to create a community by going to community>create."}
          />
        </div>
      )}
      {/* <button className="my-4 bg-primary py-1 px-3 text-white rounded-lg hover:bg-secondary">See All</button> */}
    </>
  );
};

CardGroup.propTypes = {
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default CardGroup;
