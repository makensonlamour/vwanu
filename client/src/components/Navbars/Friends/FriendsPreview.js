import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";
// import routesPath from "../../../routesPath";

const FriendsPreview = () => {
  const friendList = [];

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <FaUserPlus size="24px" />
        </label>
        <ul tabIndex="2" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-900">
          {friendList.length > 0 ? (
            <li>
              friend request
              <Link to={""} onClick={console.log("view more messages")}>
                View more request...
              </Link>
            </li>
          ) : (
            <>
              <div className="text-green-500 font-semibold p-5 text-center">
                <span>
                  {" "}
                  <BsXCircleFill size={"48px"} className="m-auto p-2" />
                </span>
                <span> No Friend request</span>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

// MessagePreview.propTypes = { user: PropTypes.object };

export default FriendsPreview;
