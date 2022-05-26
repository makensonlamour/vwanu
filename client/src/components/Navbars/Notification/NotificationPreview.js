import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsXCircleFill } from "react-icons/bs";
// import routesPath from "../../../routesPath";
import client from "../../../features/feathers";
const NotificationPreview = () => {
  const ntificationList = [];

  const nots = async () => {
    const notifs = await client.service("notification").find();
    console.log({ notifs });
    client.service.on("created", console.log);
  };

  useEffect(() => {
    nots();
  }, []);
  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <IoNotificationsOutline size="24px" />
        </label>
        <ul tabIndex="2" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-900">
          {ntificationList.length > 0 ? (
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
                <span> 0 Notifcation</span>
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
