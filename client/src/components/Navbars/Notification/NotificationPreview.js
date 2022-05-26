/*eslint-disable */
import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsXCircleFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Badge } from "@mui/material";
// import routesPath from "../../../routesPath";
import client from "../../../features/feathers";
import useAuthContext from "../../../hooks/useAuthContext";
const NotificationPreview = () => {
  const { user } = useAuthContext();
  const [notificationList, setNotificationList] = useState([]);

  const onCreatedListener = (notification) => {
    console.log("\n\n\n\ncreated", notification);
    if (notification.to.toString() === user.id.toString() && notification.UserId.toString() !== user.id.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    const notifications = await notificationService.find({ query: { to: user.id } });
    notifications.forEach(onCreatedListener);
    notificationService.on("created", onCreatedListener);

    return () => {
      notificationService.removeListener("created", onCreatedListener);
    };
  };

  useEffect(() => {
    nots();
  }, []);

  console.log(notificationList);

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={notificationList?.length} color="primary" className="mr-8">
            <IoMdNotificationsOutline size="24px" className="text-black" />
          </Badge>
        </label>
        <ul tabIndex="2" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 text-gray-900">
          {notificationList?.length > 0 ? (
            <>
              <div className="flex justify-between mb-4 m-2">
                <h4 className="text-lg font-semibold">Notifications</h4>
                <button className="text-sm text-primary font-[400]">Mark all as read</button>
              </div>
              <div className="overflow-hidden hover:overflow-auto hover:scrollbar">
                {notificationList?.map((notification, idx) => {
                  if (idx <= 5) {
                    return (
                      <Link
                        key={idx}
                        to={"/notification/" + notification?.id}
                        className="text-base mx-2 my-1 py-2 hover:bg-placeholder-color px-2 rounded-xl"
                      >
                        <div className="flex items-center align-middle justify-between">
                          <div className="w-12">
                            <img className="object-cover w-6 h-6 mask mask-squircle" src={notification?.User?.profilePicture} alt="" />
                          </div>
                          <div className=" text-sm w-72">
                            <p className="pb-1">
                              <span className="font-semibold"> {notification?.User?.firstName + " " + notification?.User?.lastName}</span>
                              <span className="font-normal"> {" " + notification?.message}</span>
                            </p>
                            <p className="pt-1 text-gray-400 font-medium text">{notification?.createdAt}</p>
                          </div>
                          <div className="text-sm">view</div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
              <li className="border-t hover:text-primary mx-auto text-center -px-2 text-gray-900">
                <Link to={""} onClick={console.log("view more Notifications")}>
                  {"View Notifications >"}
                </Link>
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
