import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";
import PropTypes from "prop-types";

//core components
import Dropdown from "./Dropdown/Dropdown";
import logo from "../../assets/images/Asset_3.png";

//icons
import { FaUserPlus } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = ({ dataUser }) => {
  return (
    <>
      <div className="bg-secondary">
        <div className="max-w-screen-xl m-auto flex flex-row sticky navbar mb-2 px-4 text-base-100 top-0 z-40">
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
            <ul className="hidden lg:flex menu lg:menu-horizontal justify-between">
              <li className="inline">
                <Link to="">
                  <FaUserPlus size="24px" />
                </Link>
              </li>
              <li className="inline">
                <Link to="">
                  <IoMdChatbubbles size="24px" />
                </Link>
              </li>
              <li>
                <Link className="inline" to="">
                  <IoNotificationsOutline size="24px" />
                </Link>
              </li>
            </ul>
            <Dropdown dataUser={dataUser ? dataUser : undefined} />
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = { dataUser: PropTypes.object.isRequired };

export default Navbar;
