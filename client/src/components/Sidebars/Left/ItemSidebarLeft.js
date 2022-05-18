import React from "react";
import routesPath from "../../../routesPath";
import { FcNews } from "react-icons/fc";
import { FcGallery } from "react-icons/fc";
import { FcFolder } from "react-icons/fc";

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
        path: routesPath.NEWSFEED,
        icon: <FcNews className="mx-2" size="24px" />,
      },
      {
        title: "My Timeline",
        path: routesPath.NEWSFEED,
        icon: <FcGallery className="mx-2" size="24px" />,
      },
      {
        title: "My inbox",
        path: routesPath.SAVED_POST,
        icon: <FcFolder className="mx-2" size="24px" />,
      },
    ],
  },
  {
    menuTitle: "Community",
    menuItems: [
      {
        title: "My Groups",
        path: routesPath.INTEREST,
        icon: <FcNews className="mx-2" size="24px" />,
      },
      {
        title: "My Network",
        path: routesPath.FORUMS,
        icon: <FcGallery className="mx-2" size="24px" />,
      },
      {
        title: "My Discussions",
        path: routesPath.MY_INTERESTS,
        icon: <FcFolder className="mx-2" size="24px" />,
      },
      {
        title: "My Pages",
        path: routesPath.MY_PAGES,
        icon: <FcFolder className="mx-2" size="24px" />,
      },
    ],
  },
];
