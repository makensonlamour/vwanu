/*eslint-disable*/
/*import React from "react";
//core components
import { NavLink } from "react-router-dom";
//import PropTypes from "prop-types";

//data
import { ItemSidebarLeft } from "./ItemSidebarLeft";

const SidebarLeft = () => {
  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "inherit",
  };

  let notActiveStyle = {
    textDecoration: "none",
    backgroundColor: "inherit",
  };

  return (
    <>
      <div className="h-screen overflow-scroll -mt-2 bg-slate-100">
        <ul className="menu w-[150vw] lg:w-64 p-3 box h-screen bg-slate-100">
          {ItemSidebarLeft.map((item, index) => {
            return (
              <>
                <li key={index} className="menu-title text-base-500 font-bold py-2 ">
                  {item.menuTitle}
                </li>
                {item.menuItems.map((it, idx) => {
                  return (
                    <li key={idx}>
                      <NavLink to={it.path} style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>
                        {it.icon}
                        {it.title}
                      </NavLink>
                    </li>
                  );
                })}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};
/*
SidebarLeft.propTypes = {
  isOpen: PropTypes.bool,
  isContext: PropTypes.bool,
};
*/

import React, { useState } from "react";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { FiUser, FiActivity, FiInbox } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { VscCommentDiscussion } from "react-icons/vsc";
import { Tooltip } from "@mui/material";

const SidebarLeft = () => {
  const [full, setFull] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <div className={`${full ? "w-[15vw]" : ""} h-screen md:shadow-xl antialiased md:sticky md:top-0 z-50`}>
        {/* Mobile menu Toggle */}
        <button
          onClick={() => {
            setNavOpen(!navOpen);
            setFull(true);
          }}
          className="md:hidden w-[2.7rem] lg:w-[20%] h-[2.9rem] lg:h-14 md:shadow-md focus:outline-none bg-white z-10"
        >
          <CgMenuLeft size={"24px"} className={`${navOpen ? "hidden" : ""} mx-auto`} />
          <CgClose size={"24px"} className={`${navOpen ? "" : "hidden"} mx-auto`} />
        </button>

        <div
          className={`${
            navOpen ? "block w-full" : "hidden md:block"
          } md:block h-screen bg-white transition-all duration-300 space-y-2 md:fixed sm:relative w-92`}
        >
          <button onClick={() => setFull(!full)} className="w-full px-6 sticky mb-2 hidden md:block focus:outline-none h-14">
            <CgMenuLeft size={"24px"} className="" />
          </button>

          <div className="px-4 space-y-2">
            <p className={`${full ? "block" : "hidden"}  pt-4 text-gray-500 text-lg`}>Personal</p>
            {/*My Profile */}
            <div className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer">
              <Tooltip className={`${full ? "mr-3" : ""}`} title="My Profile">
                <button className="inline-flex ">
                  {" "}
                  <FiUser className={`${full ? "mr-3" : ""}`} size={"24px"} />
                  <h1 className={`${full ? "block" : "hidden"}`}>My Profile</h1>
                </button>
              </Tooltip>
            </div>

            {/*My timeline */}
            <div className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer">
              <Tooltip title="My Timeline" className={`${full ? "mr-3" : ""}`}>
                <button className="inline-flex ">
                  <FiActivity className={`${full ? "mr-3" : ""}`} size={"24px"} />
                  <h1 className={`${full ? "block" : "hidden"}`}>My Timeline</h1>
                </button>
              </Tooltip>
            </div>

            {/*My inbox */}
            <div className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer">
              <Tooltip title="My Inbox">
                <button className="inline-flex ">
                  <FiInbox className={`${full ? "mr-3" : ""}`} size={"24px"} />

                  <h1 className={`${full ? "block" : "hidden"}`}>My Inbox</h1>
                </button>
              </Tooltip>
            </div>

            <p className={`${full ? "block" : "hidden"}  pt-4 text-gray-500 text-lg`}>Community</p>
            <div className={`${full ? "hidden" : "block"} w-full h-[1px] bg-black`}></div>
            {/*My groups */}
            <div className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer">
              <Tooltip title="My Groups">
                <button className="inline-flex ">
                  <MdGroups className={`${full ? "mr-3" : ""}`} size={"24px"} />

                  <h1 className={`${full ? "block" : "hidden"}`}>My Groups</h1>
                </button>
              </Tooltip>
            </div>

            {/*My network */}
            <div className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer">
              <Tooltip title="My Network">
                <button className="inline-flex ">
                  <MdGroups className={`${full ? "mr-3" : ""}`} size={"24px"} />
                  <h1 className={`${full ? "block" : "hidden"}`}>My Network</h1>
                </button>
              </Tooltip>
            </div>

            {/*My inbox */}
            <div className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer">
              <Tooltip title="My Discussions">
                <button className="inline-flex ">
                  <VscCommentDiscussion className={`${full ? "mr-3" : ""}`} size={"24px"} />

                  <h1 className={`${full ? "block" : "hidden"}`}>My Discussions</h1>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarLeft;
