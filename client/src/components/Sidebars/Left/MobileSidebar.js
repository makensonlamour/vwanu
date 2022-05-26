import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// import { ItemSidebarLeft } from "./ItemSidebarLeft";
import routesPath from "../../../routesPath";
import { FiUser, FiActivity, FiInbox } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { VscCommentDiscussion } from "react-icons/vsc";
import { RiPagesLine } from "react-icons/ri";
import { BottomMenuContext } from "../../../context/BottomMenuContext";

const SidebarLeft = ({ user }) => {
  const { closeSidebar, isSidebarOpen } = useContext(BottomMenuContext);

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
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }  ease-in-out duration-300 w-full md:shadow-xl antialiased md:fixed z-50`}
      >
        {/* Mobile menu Toggle */}
        <div className="shadow-xl py-2 flex justify-between px-4 bg-white ">
          <Link
            onClick={() => {
              closeSidebar();
            }}
            to={"../../profile/" + user?.id}
            className="flex text-primary hover:text-secondary "
          >
            <img className="object-cover w-10 h-10 mask mask-squircle" src={user?.profilePicture?.original} alt={user?.firstName} />
            <div className="block ml-3">
              <p className="text-md font-medium">{user?.firstName + " " + user?.lastName}</p>
              <p className="text-sm font-light">My Account</p>
            </div>
          </Link>
          <button
            onClick={() => {
              closeSidebar();
            }}
            className="md:hidden pr-3 h-[2.9rem] md:shadow-md focus:outline-none  z-10"
          >
            <CgClose size={"24px"} className="ml-auto" />
          </button>
        </div>

        <div
          className={`"block w-full md:block h-screen bg-white transition-all delay-700 duration-700 space-y-2 overflow-auto md:fixed sm:relative w-92`}
        >
          <div className="px-4 space-y-2">
            {ItemSidebarLeft.map((item) => {
              return (
                <>
                  <p key={item.menuTitle} className="block pt-4 text-gray-500 text-lg">
                    {" "}
                    {item.menuTitle}
                  </p>

                  {item.menuItems.map((it) => {
                    return (
                      <div
                        key={it.title}
                        className="relative flex items-center hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer"
                      >
                        <Tooltip className="mr-3" title={it.title}>
                          <NavLink
                            to={it.path}
                            onClick={() => {
                              closeSidebar();
                            }}
                            style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                            className="inline-flex "
                          >
                            {" "}
                            <span className="mr-3">{it.icon}</span>
                            <h1 className="block">{it.title}</h1>
                          </NavLink>
                        </Tooltip>
                      </div>
                    );
                  })}
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
