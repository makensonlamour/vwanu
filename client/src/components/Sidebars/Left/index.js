import React, { useState } from "react";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// import { ItemSidebarLeft } from "./ItemSidebarLeft";
import routesPath from "../../../routesPath";
import { FiUser, FiActivity, FiInbox } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { VscCommentDiscussion } from "react-icons/vsc";
import { RiPagesLine } from "react-icons/ri";

const SidebarLeft = ({ user }) => {
  const [full, setFull] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "inherit",
  };

  let notActiveStyle = {
    textDecoration: "none",
    backgroundColor: "inherit",
  };

  const ItemSidebarLeft = [
    {
      menuTitle: "Personal",
      menuItems: [
        {
          title: "My Profile",
          path: "/profile/" + user?.id,
          icon: <FiUser size={"24px"} />,
        },
        {
          title: "My Timeline",
          path: routesPath.NEWSFEED,
          icon: <FiActivity size={"24px"} />,
        },
        {
          title: "My inbox",
          path: routesPath.MESSAGE,
          icon: <FiInbox size={"24px"} />,
        },
      ],
    },
    {
      menuTitle: "Community",
      menuItems: [
        {
          title: "My Groups",
          path: routesPath.MY_GROUPS,
          icon: <MdGroups size={"24px"} />,
        },
        {
          title: "My Network",
          path: routesPath.FRIENDS,
          icon: <MdGroups size={"24px"} />,
        },
        {
          title: "My Discussions",
          path: routesPath.MY_INTERESTS,
          icon: <VscCommentDiscussion size={"24px"} />,
        },
        {
          title: "My Pages",
          path: routesPath.MY_PAGES,
          icon: <RiPagesLine size={"24px"} />,
        },
      ],
    },
  ];

  return (
    <>
      <div className={`${full ? "w-[15vw] " : ""} h-screen md:shadow-xl antialiased md:fixed z-50`}>
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
          } md:block h-screen bg-white transition-all delay-700 duration-700 space-y-2 overflow-auto md:fixed sm:relative w-92`}
        >
          <button onClick={() => setFull(!full)} className="w-full px-6 sticky mb-2 hidden md:block focus:outline-none h-14">
            <CgMenuLeft size={"24px"} className="" />
          </button>

          <div className="px-4 space-y-2">
            {ItemSidebarLeft.map((item) => {
              return (
                <>
                  <p key={item.menuTitle} className={`${full ? "block" : "hidden"}  pt-4 text-gray-500 text-lg`}>
                    {" "}
                    {item.menuTitle}
                  </p>

                  {item.menuItems.map((it) => {
                    return (
                      <div
                        key={it.title}
                        className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer"
                      >
                        <Tooltip className={`${full ? "mr-3" : ""}`} title={it.title}>
                          <NavLink
                            to={it.path}
                            style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                            className="inline-flex "
                          >
                            {" "}
                            <span className={`${full ? "mr-3" : ""}`}>{it.icon}</span>
                            <h1 className={`${full ? "block" : "hidden"}`}>{it.title}</h1>
                          </NavLink>
                        </Tooltip>
                      </div>
                    );
                  })}
                  <div className={`${full ? "hidden" : "block"} w-full h-[1px] bg-black`}></div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

SidebarLeft.propTypes = {
  isOpen: PropTypes.bool,
  isContext: PropTypes.bool,
  user: PropTypes.object,
};

export default SidebarLeft;
