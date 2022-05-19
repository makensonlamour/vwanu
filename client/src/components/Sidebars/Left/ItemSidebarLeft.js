import React from "react";
import routesPath from "../../../routesPath";
import { FiUser, FiActivity, FiInbox } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { VscCommentDiscussion } from "react-icons/vsc";
import { RiPagesLine } from "react-icons/ri";

/*
 *define Items for sidebar left on home page
 *
 */

export const ItemSidebarLeft = [
  {
    menuTitle: "Personal",
    menuItems: [
      {
        title: "My Profile",
        path: "/profile",
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
