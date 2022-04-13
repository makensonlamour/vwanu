import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";
import PropTypes from "prop-types";

//core components
import Dropdown from "./Dropdown/Dropdown";
import MessagePreview from "./Message/MessagePreview";
import FriendsPreview from "./Friends/FriendsPreview";
import NotificationPreview from "./Notification/NotificationPreview";
import logo from "../../assets/images/Asset_3.png";

const Navbar = ({ user }) => {
  return (
    <>
      <div className="bg-secondary fixed w-full z-10 mt-4">
        <div className="max-w-screen-xl m-auto flex flex-row  navbar mb-2 px-4 text-base-100 top-0 z-40">
          <div className="basis-1/5">
            <Link to={routesPath.NEWSFEED}>
              <span className="text-lg font-bold">
                {" "}
                <img className="w-full lg:w-2/3 " src={logo} alt="logo_vwanu" />
              </span>
            </Link>
          </div>
          <div className="basis-1/2">
            <div className="form-control w-full ml-auto">
              <input
                type="text"
                placeholder="Search"
                className="input input-ghost border-none placeholder:text-gray-300 active:text-gray-800 focus:text-gray-800"
              />
            </div>
          </div>
          <div className="grow justify-end">
            {" "}
            <div className="mr-8 hidden lg:flex">
              <span className="mx-2">
                <FriendsPreview />
              </span>
              <span className="mx-2">
                <NotificationPreview />
              </span>
              <span className="mx-2">
                <MessagePreview />
              </span>
            </div>
            <Dropdown user={user ? user : undefined} />
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = { user: PropTypes.object.isRequired };

export default Navbar;
