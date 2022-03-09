import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";

//core components
import Dropdown from "./Dropdown/Dropdown";
import logo from "../../assets/images/Asset_3.png";

//icons
import { FaUserPlus } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row bg-secondary navbar mb-2 shadow-lg px-4 text-base-100">
        <div className="basis-1/5">
          <Link to={routesPath.NEWSFEED}>
            <span className="text-lg font-bold">
              {" "}
              <img className="w-2/3 " src={logo} alt="logo_vwanu" />
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
          <ul className="menu menu-horizontal flex-row justify-between">
            <li>
              <Link to="">
                <FaUserPlus size="24px" />
              </Link>
            </li>
            <li>
              <Link to="">
                <IoMdChatbubbles size="24px" />
              </Link>
            </li>
            <li>
              <Link to="">
                <IoNotificationsOutline size="24px" />
              </Link>
            </li>
          </ul>
          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default Navbar;
