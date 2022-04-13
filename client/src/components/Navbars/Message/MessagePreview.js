import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiMessageSquare } from "react-icons/bi";
import { BsXCircleFill } from "react-icons/bs";
// import routesPath from "../../../routesPath";

const MessagePreview = () => {
  const messageList = [];

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="1">
          <BiMessageSquare size={"24px"} />
        </label>
        <ul tabIndex="1" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-gray-900">
          {messageList.length > 0 ? (
            <li>
              first message
              <Link to={""} onClick={console.log("view more messages")}>
                View more messages...
              </Link>
            </li>
          ) : (
            <>
              <div className="text-secondary font-semibold p-5 text-center">
                <span>
                  {" "}
                  <BsXCircleFill size={"48px"} className="m-auto p-2" />
                </span>
                <span> 0 Conversation</span>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

// MessagePreview.propTypes = { user: PropTypes.object };

export default MessagePreview;
