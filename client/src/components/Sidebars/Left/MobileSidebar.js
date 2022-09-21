import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// import { ItemSidebarLeft } from "./ItemSidebarLeft";
import routesPath from "../../../routesPath";
import { FiUser, FiActivity, FiInbox } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { MdGroups, MdPhotoLibrary, MdPhotoSizeSelectActual } from "react-icons/md";
import { BottomMenuContext } from "../../../context/BottomMenuContext";
import { deleteToken } from "../../../helpers/index";

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

  function Logout() {
    deleteToken("feathers-jwt");
    window.location.reload();
  }

  const ItemSidebarLeft = [
    {
      menuTitle: "General",
      menuItems: [
        { title: "Activity", icon: <FiActivity size={24} className="mx-auto" />, path: routesPath?.NEWSFEED },
        { title: "Members", icon: <BiUserCircle size={24} className="mx-auto" />, path: routesPath?.MEMBERS },
        { title: "Community", icon: <HiUsers size={24} className="mx-auto" />, path: routesPath?.GROUPS },
        { title: "Forum", icon: <BiMessageDetail size={24} className="mx-auto" />, path: routesPath?.FORUMS },
        { title: "Blog", icon: <FaBlog size={24} className="mx-auto" />, path: routesPath?.BLOG },
      ],
    },
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
        {
          title: "My Community",
          path: routesPath.GROUPS + "?tabs=myCommunity",
          icon: <MdGroups size={"24px"} />,
        },
        {
          title: "My Network",
          path: "/profile/" + user?.id + "/network?tabs=network&subTabs=friends",
          icon: <MdGroups size={"24px"} />,
        },
        {
          title: "My Album",
          path: "/profile/" + user?.id + "/albums?tabs=albums&subTabs=album",
          icon: <MdPhotoLibrary size={"24px"} />,
        },
        {
          title: "My Photo",
          path: "/profile/" + user?.id + "/albums?tabs=albums&subTabs=photo",
          icon: <MdPhotoSizeSelectActual size={"24px"} />,
        },
        {
          title: "My Blog",
          path: "/profile/" + user?.id + "/blog?tabs=blog&subTabs=friends",
          icon: <FaBlog size={"24px"} />,
        },
      ],
    },
    // {
    //   menuTitle: "Community",
    //   menuItems: [
    //     {
    //       title: "My Community",
    //       path: routesPath.GROUPS + "?tabs=myCommunity",
    //       icon: <MdGroups size={"24px"} />,
    //     },
    //     {
    //       title: "My Network",
    //       path: "/profile/" + user?.id + "/network?tabs=network&subTabs=friends",
    //       icon: <MdGroups size={"24px"} />,
    //     },
    //     {
    //       title: "My Album",
    //       path: "/profile/" + user?.id + "/albums?tabs=albums&subTabs=album",
    //       icon: <MdPhotoLibrary size={"24px"} />,
    //     },
    //     {
    //       title: "My Photo",
    //       path: "/profile/" + user?.id + "/albums?tabs=albums&subTabs=photo",
    //       icon: <MdPhotoSizeSelectActual size={"24px"} />,
    //     },
    //     {
    //       title: "My Blog",
    //       path: "/profile/" + user?.id + "/blog?tabs=blog&subTabs=friends",
    //       icon: <FaBlog size={"24px"} />,
    //     },
    //   ],
    // },
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
          className={`"block w-full md:block h-screen bg-white transition-all delay-700 duration-700 space-y-2 overflow-auto md:fixed sm:relative w-92 mb-5`}
        >
          <div className="px-4 space-y-2 mb-5">
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
          <div
            onClick={() => Logout()}
            className="text-white mx-2 relative items-center bg-red-500 hover:text-white hover:bg-secondary space-x-2 rounded-md p-2 cursor-pointer"
          >
            <p className="text-lg text-center">Logout</p>
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
