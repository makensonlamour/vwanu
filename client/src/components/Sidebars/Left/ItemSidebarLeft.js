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
    menuTitle: "Me",
    menuItems: [
      {
        title: "News Feed",
        path: routesPath.NEWSFEED,
        icon: <FcNews className="mx-2" size="24px" />
      },
      {
        title: "Albums",
        path: routesPath.ALBUMS,
        icon: <FcGallery className="mx-2" size="24px" />
      },
      {
        title: "Saved Posts",
        path: routesPath.SAVED_POST,
        icon: <FcFolder className="mx-2" size="24px" />
      }
    ]
  },
  {
    menuTitle: "Community",
    menuItems: [
      {
        title: "Interest",
        path: routesPath.INTEREST,
        icon: <FcNews className="mx-2" size="24px" />
      },
      {
        title: "Forums",
        path: routesPath.FORUMS,
        icon: <FcGallery className="mx-2" size="24px" />
      },
      {
        title: "My Interests",
        path: routesPath.MY_INTERESTS,
        icon: <FcFolder className="mx-2" size="24px" />
      },
      {
        title: "My Groups",
        path: routesPath.MY_GROUPS,
        icon: <FcFolder className="mx-2" size="24px" />
      },
      {
        title: "My Pages",
        path: routesPath.MY_PAGES,
        icon: <FcFolder className="mx-2" size="24px" />
      }
    ]
  }
];
