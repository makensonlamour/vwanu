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
  console.log("my user");
  console.log(user);
  const [notificationList, setNotificationList] = useState([]);

  const nots = async () => {
    const notifications = await client.service("notification").find({ query: { UserId: user.id } });
    setNotificationList(notifications);

    client.service("notification").on("created", (notification) => {
      if (notification.UserId.toString() === user.id.toString()) {
        setNotificationList((notificationList) => [...notificationList, notification]);
      }
    });
  };

  useEffect(() => {
    nots();
  }, []);
  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={notificationList?.length} color="primary" className="mr-8">
            <IoMdNotificationsOutline size="24px" className="text-black" />
          </Badge>
        </label>
        <ul tabIndex="2" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-900">
          {notificationList.length > 0 ? (
            <li>
              Notification
              <Link to={""} onClick={console.log("view more messages")}>
                View more notification...
              </Link>
            </li>
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
