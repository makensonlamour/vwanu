import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stack, styled, Paper, Tooltip } from "@mui/material";
import { useQueryClient } from "react-query";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";
import Loader from "../common/Loader";
import ModalOnlineUser from "./ModalOnlineUser";

const RecentlyActive = ({ data, isLoading, isError, hasNextPage, fetchNextPage }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  const [openOnline, setOpenOnline] = useState(false);

  const queryClient = useQueryClient();
  function reloadPage() {
    queryClient.refetchQueries(["user", "online"]);
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8">
        <h2 className="my-2 text-md font-medium text-primary">
          Online Friends <span className="font-normal text-md text-gray-400">{data.pages ? data?.pages[0]?.data?.total : 0}</span>
        </h2>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }} className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="py-5 m-auto text-center px-2">
            {"There was an error while fetching the data. "}{" "}
            <Link
              style={{
                color: "#053dc8",
              }}
              className="text-secondary hover:text-primary"
              to={""}
              onClick={() => reloadPage()}
            >
              Tap to retry
            </Link>{" "}
          </div>
        ) : data?.pages && data?.pages[0]?.data?.total > 0 ? (
          <Stack direction="row" justifyContent="start" alignItems="center" spacing={0} sx={{ flexWrap: "wrap" }}>
            {data?.pages[0]?.data?.data?.map((following) => {
              return (
                <Item key={following?.id} elevation={0}>
                  <Tooltip className="" title={following?.firstName + " " + following?.lastName}>
                    <div
                      onClick={() => (window.location.href = `../../messages?newMessage=true&otherUserId=${following?.id}`)}
                      className="w-[3rem] h-[3rem] mx-1 cursor-pointer avatar online"
                    >
                      <img
                        className="object-cover mask mask-squircle w-[3rem] h-16 rounded-lg"
                        src={following?.profilePicture?.original}
                        alt={following.firstName + " " + following?.lastName}
                      />
                    </div>
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
              placeholder={"Sorry, You don't have any active friends."}
              tips={""}
            />
          </div>
        )}
        {data.pages
          ? data?.pages[0]?.data?.total > 0 && (
              <ModalOnlineUser
                data={data}
                isLoading={isLoading}
                isError={isError}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                open={openOnline}
                setOpen={setOpenOnline}
                label={"See more"}
              />
            )
          : null}
      </div>
    </>
  );
};

RecentlyActive.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

export default RecentlyActive;
