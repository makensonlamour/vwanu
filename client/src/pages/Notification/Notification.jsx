import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Stack, styled, Paper } from "@mui/material";
import { formatDistance, parseISO } from "date-fns";
import { useGetNotificationList, useReadNotification } from "../../features/notification/notificationSlice";
import { useQueryClient } from "react-query";
import InfiniteScroll from "./../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../components/common/Loader";

const Notification = () => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  function reloadPage() {
    queryClient.refetchQueries(["user", "notification", "all"]);
  }

  const readNotification = useReadNotification(["notification", "read"], undefined, undefined);
  const {
    data: notificationList,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetNotificationList(["user", "notification", "all"], user?.id !== undefined ? true : false, user?.id);

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
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8 mb-8">
        <h2 className="my-3 px-3 text-xl font-medium">Notifications</h2>
        {isLoading ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white">
            {"There was an error while fetching the data. "}{" "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "notification", "all"])}>
              Tap to retry
            </Link>{" "}
          </div>
        ) : notificationList?.pages && notificationList?.pages?.length && notificationList?.pages[0]?.data?.total > 0 ? (
          <InfiniteScroll
            fetchMore={fetchNextPage}
            isError={isError}
            isLoading={isLoading}
            hasNext={hasNextPage}
            refetch={() => queryClient.invalidateQueries(["user", "notification", "all"])}
            container={true}
            classNameContainer={"overflow-y-auto h-[72vh]"}
            loader={
              <div className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            }
            errorRender={
              <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                {"There was an error while fetching the data. "}{" "}
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "notification", "all"])}>
                  Tap to retry
                </Link>{" "}
              </div>
            }
          >
            {
              <Stack spacing={1}>
                {notificationList?.pages.map((page) => {
                  return page?.data?.data?.map((latest, idx) => {
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
                          <p to="#" className=" text-sm line-clamp-2 max-w-full text-ellipsis whitespace-wrap overflow-hidden ml-2 pb-1">
                            <div
                              className="cursor-pointer hover:text-secondary"
                              onClick={() => {
                                handleRead(latest?.id, latest?.entityId, latest?.entityName);
                              }}
                            >
                              <span className="font-semibold">{latest?.User?.firstName + " " + latest?.User?.lastName}</span>
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
                  });
                })}
              </Stack>
            }
          </InfiniteScroll>
        ) : (
          "No notifications"
        )}
      </div>
    </>
  );
};

export default Notification;
