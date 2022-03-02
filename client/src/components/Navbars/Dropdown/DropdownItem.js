import React from "react";

import routesPath from "../../../routesPath";
import { BsGearFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsShieldLockFill } from "react-icons/bs";

/*
 *define Items for Dropdown on home page
 *
 */

export const DropdownItem = [
  {
    menuTitle: "Profile",
    menuItems: [
      {
        title: "My profile",
        path: routesPath.PROFILE,
        icon: <BsPersonCircle className="mx-2" size="24px" />,
      },
    ],
  },
  {
    menuTitle: "Settings",
    menuItems: [
      {
        title: "Privacy Settings",
        path: routesPath.PRIVACY_SETTINGS,
        icon: <BsShieldLockFill className="mx-2" size="24px" />,
      },
      {
        title: "General Settings",
        path: routesPath.GENERAL_SETTINGS,
        icon: <BsGearFill className="mx-2" size="24px" />,
      },
    ],
  },
];
