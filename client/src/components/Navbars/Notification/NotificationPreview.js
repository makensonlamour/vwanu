import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsXCircleFill } from "react-icons/bs";
// import routesPath from "../../../routesPath";
import { Badge } from "@mui/material";

import useSocketContext from "../../../hooks/useSocketcontext";
import { getToken, decoder } from "../../../helpers";
const NotificationPreview = () => {
  const [notificationList, setNotificationList] = useState([]);
  const token = getToken();
  const { user } = decoder(token);
  const { socket } = useSocketContext();

  const sortNotification = (event) => {
    setNotificationList((notificationList) => [...notificationList, event]);
    // switch (event.type) {
    //   case "visit":
    //     setNotificationList(event.data);
    //     break;

    //   case "new-friend-request":
    //     setNotificationList(event.data);
    //     break;
    //   default:
    //     break;
    // }
  };
  useEffect(() => {
    socket?.on(`notification-${user.id}`, (val) => {
      if (val) return sortNotification(val);
    });
    console.log(notificationList.length);
  }, []);

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={notificationList.length} color="primary" className="mr-8">
            <IoMdNotificationsOutline size="24px" className="text-black" />
          </Badge>
        </label>
        <ul
          tabIndex="2"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[400px] text-gray-900 h-[450px] overflow-auto"
        >
          {notificationList.length > 0 ? (
            <>
              {notificationList.map((notification) => {
                return (
                  <li key={notification?.data?.lastSeen} className="">
                    {notification?.type === "visit" ? (
                      <Link to={"../../profile/" + notification.data?.id} className="">
                        <img
                          className="w-10 h-10 mask mask-squircle"
                          src={notification?.data?.profilePicture}
                          alt={notification?.data?.firstName}
                        />
                        <span className="text-primary pl-2">{notification?.data?.firstName + " " + notification?.data?.lastName}</span>
                        <span className="text-gray-700 pl-2">visited your profile</span>
                      </Link>
                    ) : (
                      <Link to={"../../profile/" + notification.data?.id} className="">
                        <img
                          className="w-10 h-10 mask mask-squircle"
                          src={notification?.data?.profilePicture}
                          alt={notification?.data?.firstName}
                        />
                        <span className="text-primary pl-2">{notification?.data?.firstName + " " + notification?.data?.lastName} </span>
                        <span className="text-gray-700 pl-2">sent you a friend request</span>
                      </Link>
                    )}
                    <span>{}</span>
                  </li>
                );
              })}
              <span>
                {" "}
                <Link to={""} onClick={console.log("view more messages")}>
                  View more notification...
                </Link>
              </span>
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
