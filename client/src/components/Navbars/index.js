import React, { useState } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";
import PropTypes from "prop-types";
import { Badge, Typography, Menu, Button, Tooltip, MenuItem } from "@mui/material";
import logo from "../../assets/images/Asset_2.png";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { RiPagesLine } from "react-icons/ri";

const pages = [
  { title: "Activity", icon: <FiActivity size={24} className="mx-auto" />, path: routesPath.NEWSFEED },
  { title: "Members", icon: <BiUserCircle size={24} className="mx-auto" />, path: "" },
  { title: "Community", icon: <HiUsers size={24} className="mx-auto" />, path: "" },
  { title: "Forum", icon: <BiMessageDetail size={24} className="mx-auto" />, path: "" },
  { title: "Blog", icon: <RiPagesLine size={24} className="mx-auto" />, path: "" },
];
const settings = [
  { title: "Profile", icon: <BiUserCircle size={20} className="mr-2" /> },
  { title: "Account", icon: "" },
  { title: "Dashboard", icon: "" },
  { title: "Logout", icon: "" },
];

const Navbar = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="mx-auto sticky top-0 z-50">
      <div className="bg-white w-full z-20 shadow-md">
        <div className="flex items-center justify-around lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="basis-1/6 md:pl-36 lg:pl-10 xl:px-6">
            <Link className="" to={routesPath.NEWSFEED}>
              <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10 py-2 flex">
                {" "}
                <img className="justify-center" src={logo} alt="logo_vwanu" />
              </div>
            </Link>
          </div>
          <div className="basis-2/4 flex-none hidden md:block">
            <div className="hidden xl:flex  items-center justify-evenly py-2">
              {pages.map((page) => (
                <button key={page.title} className="">
                  {page.title}
                </button>
              ))}
            </div>
            <div className="hidden md:flex xl:hidden">
              {pages.map((page) => (
                <Tooltip key={page} title={page.title}>
                  <button className="mx-auto px-1 flex">{page.icon}</button>
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="basis-[30%] flex-none">
            <div className="flex justify-end items-center">
              <BsSearch size="24px" className="text-black mr-4" />
              <div className="h-6 bg-black w-[1px] mr-4"></div>
              <Badge badgeContent={1} color="primary" className="mr-4">
                <AiOutlineInbox size="24px" className="text-black" />
              </Badge>
              <Badge badgeContent={3} color="primary" className="mr-8">
                <IoMdNotificationsOutline size="24px" className="text-black" />
              </Badge>

              <Tooltip title="Open profile">
                <Button variant="text" onClick={handleOpenUserMenu} sx={{ p: 0, fontWeight: "light" }}>
                  <p className="hidden md:inline mr-1 text-[1.0rem] text-black capitalize font-light">{user?.firstName}</p>
                  <IoIosArrowDown size="18px" className="mr-2" />
                  <div className="rounded-[50px] avatar online">
                    <div className="rounded-[12px] w-8 h-8 m-1">
                      <img className="w-8 h-8" src={user?.profilePicture} alt="profil_image" />
                    </div>
                  </div>{" "}
                </Button>
              </Tooltip>
              {}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"profile_1"} onClick={handleCloseUserMenu}>
                  <div style={{ display: "flex", paddingTop: "5px", paddingBottom: "5px" }}>
                    <div style={{ width: "24px", height: "18px", margin: "0.2rem", borderRadius: "25%" }}>
                      <img className="m-1" src={user?.profilePicture} alt="profil_image" />
                    </div>
                    <p className="align-middle">{user?.firstName}</p>
                  </div>
                </MenuItem>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} sx={{ py: 1 }}>
                    <Typography component="div" textAlign="center" style={{ display: "flex" }}>
                      {setting.icon}
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = { user: PropTypes.object.isRequired };

export default Navbar;
