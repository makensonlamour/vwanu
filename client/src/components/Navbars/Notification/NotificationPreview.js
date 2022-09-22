/*eslint-disable */
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsXCircleFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { Badge } from "@mui/material";
import { formatDistance, parseISO } from "date-fns";
// import routesPath from "../../../routesPath";
import client from "../../../features/feathers";
import useAuthContext from "../../../hooks/useAuthContext";
import { useReadNotification } from "./../../../features/notification/notificationSlice";

const NotificationPreview = () => {
  const { user } = useAuthContext();
  const [notificationList, setNotificationList] = useState([]);
  let run = false;

  const onCreatedListener = (notification) => {
    if (notification.to.toString() === user.id.toString() && notification.UserId.toString() !== user.id.toString()) {
      console.log("check notif:", notification, notificationList);
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    if (!run) {
      run = true;
      const notifications = await notificationService.find({ query: { to: user.id } });
      notifications.forEach(onCreatedListener);
      notificationService.on("created", onCreatedListener);
    }
  };

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

  useEffect(() => {
    if (!run) {
      nots();
    }

    if (run) {
      return () => {
        notificationService.removeListener("created", onCreatedListener);
      };
    }
  }, []);

  const NotificationUnview = notificationList?.filter((item) => item?.view !== true);

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={NotificationUnview?.length} color="primary" className="">
            <IoMdNotificationsOutline size="24px" className="text-black" />
          </Badge>
        </label>
        <ul
          tabIndex="2"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 text-gray-900 overflow-auto scrollbar h-96"
        >
          {notificationList?.length > 0 ? (
            <>
              <div className="flex justify-between mb-4 m-2">
                <h4 className="text-lg font-semibold px-2">Notifications</h4>
                <button className="text-sm text-primary font-[400]">Mark all as read</button>
              </div>

              {notificationList?.map((notification, idx) => {
                if (idx <= 5) {
                  return (
                    <Link
                      key={idx}
                      to={"#"}
                      onClick={() => {
                        if (!notification?.view) {
                          if (entityName === "users") {
                            handleRead(notification?.id, notification?.UserId, notification?.entityName);
                          } else if (entityName === "posts") {
                            handleRead(notification?.id, notification?.entityId, notification?.entityName);
                          } else {
                            return;
                          }
                        }
                      }}
                      className="mx-2 text-base my-1 py-2 hover:bg-placeholder-color px-2 rounded-xl"
                    >
                      <div className="flex items-center align-middle justify-between">
                        <div className="w-12">
                          <img className="object-cover w-10 h-10 mask mask-squircle" src={notification?.User?.profilePicture} alt="" />
                        </div>
                        <div className=" text-sm w-64">
                          <p className="pb-1">
                            <span className="font-semibold"> {notification?.User?.firstName + " " + notification?.User?.lastName}</span>
                            <span className="font-normal"> {" " + notification?.message}</span>
                          </p>
                          <p className="pt-1 text-gray-400 font-medium text">
                            {formatDistance(parseISO(notification?.createdAt), new Date(), [
                              {
                                includeSeconds: true,
                              },
                            ])}{" "}
                            {" ago"}
                          </p>
                        </div>
                        <div className="text-sm">
                          {notification?.view ? null : (
                            <button className="text-primary">
                              <GoPrimitiveDot size={"20px"} />
                              {/*}  <AiOutlineEye size={"20px"} /> {*/}
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
              <li className="sticky border-t hover:text-primary mx-auto text-center -px-2 text-gray-900">
                <Link to={"../../notifications"}>{"View Notifications >"}</Link>
              </li>
            </>
          ) : (
            <>
              <div className="text-primary font-semibold p-5 text-center">
                <span>
                  {" "}
                  <BsXCircleFill size={"48px"} className="m-auto p-2" />
                </span>
                <span> 0 Notification</span>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

// MessagePreview.propTypes = { user: PropTypes.object };

export default NotificationPreview;
