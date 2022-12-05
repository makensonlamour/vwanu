/* eslint-disable array-callback-return */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stack, styled, Paper } from "@mui/material";
import { formatDistance, parseISO } from "date-fns";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";
import { useReadNotification } from "../../features/notification/notificationSlice";

const UpdatesComponent = ({ data, className }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));
  const readNotification = useReadNotification(["notification", "read"], undefined, undefined);
  const handleRead = async (notificationId, idLink, entityName) => {
    try {
      const dataObj = { id: notificationId, view: true };
      await readNotification.mutateAsync(dataObj);
      if (entityName === "users") {
        window.location.href = "../../profile/" + idLink;
      } else if (entityName === "posts") {
        window.location.href = "../../post/" + idLink;
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={"bg-white border border-gray-200 rounded-lg p-2 mb-8 " + className}>
        <h2 className="my-2 px-2 text-md font-medium text-primary">Latest updates</h2>
        {data?.length > 0 ? (
          <Stack spacing={1}>
            {data?.map((latest, idx) => {
              if (idx <= 5) {
                return (
                  <Item
                    key={latest?.User?.firstName + "" + idx}
                    elevation={0}
                    style={{
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                      display: "flex",
                      backgroundColor: `${latest?.view ? "" : "#EFF3FF"}`,
                    }}
                  >
                    <div className="w-[3rem]">
                      <img
                        className="mask mask-squircle items-center justify-center w-[5rem] h-10 rounded-lg"
                        src={latest?.User?.profilePicture}
                        alt={latest?.User?.firstName}
                      />
                    </div>
                    <div>
                      <p to="#" className=" text-sm line-clamp-2 max-w-[22ch] text-ellipsis whitespace-wrap overflow-hidden ml-2 pb-1">
                        <div
                          className="cursor-pointer hover:text-secondary"
                          onClick={() => {
                            handleRead(latest?.id, latest?.entityId, latest?.entityName);
                          }}
                        >
                          <span className="font-semibold text-primary hover:text-secondary">
                            {latest?.User?.firstName + " " + latest?.User?.lastName}
                          </span>
                          <span className="font-light">{" " + latest?.message}</span>
                        </div>
                      </p>
                      <p className=" text-gray-400 font-medium text-xs ml-2">
                        {formatDistance(parseISO(latest?.createdAt), new Date(), [
                          {
                            includeSeconds: true,
                          },
                        ])}{" "}
                        {" ago"}
                      </p>
                    </div>
                  </Item>
                );
              }
            })}
            {data?.length > 5 && (
              <Link to={"../../notifications"} className="text-sm text-primary hover:text-secondary mx-auto font-[500]">
                View more updates
              </Link>
            )}
          </Stack>
        ) : (
          <div className="flex justify-center">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, You don't have any notifications yet."}
              tips={""}
            />
          </div>
        )}
      </div>
    </>
  );
};

UpdatesComponent.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default UpdatesComponent;
