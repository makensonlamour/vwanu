import React from "react";
import { Link } from "react-router-dom";

//core components
import Dropdown from "./Dropdown/Dropdown";

//icons
import { FaUserPlus } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row bg-blue-500 navbar mb-2 shadow-lg px-4 text-neutral-content">
        <div className="basis-1/5">
          <span className="text-lg font-bold">VWANU</span>
        </div>
        <div className="basis-1/2">
          <div className="form-control w-full ml-auto">
            <input type="text" placeholder="Search" className="input input-ghost w-full" />
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
