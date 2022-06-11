import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import routesPath from "../../routesPath";
import PropTypes from "prop-types";
import { Badge, Typography, Menu, Button, Tooltip, MenuItem } from "@mui/material";
import logo from "../../assets/images/Asset_2.png";
import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { RiPagesLine } from "react-icons/ri";
import { CgMenuLeft } from "react-icons/cg";
import { BottomMenuContext } from "../../context/BottomMenuContext";
import FriendsPreview from "./Friends/FriendsPreview";
import NotificationPreview from "./Notification/NotificationPreview";
import useAuth from "../../hooks/useAuth";
import { deleteToken } from "../../helpers/index";

// import client from "../../features/feathers";
const Navbar = ({ user }) => {
  // const nots = async () => {
  //   console.log("here are the services");
  //   console.log(Object.keys(client.services));
  //   try {
  //     const notifs = await client.service("notification").find();
  //     console.log("Notifs --");
  //     console.log({ notifs });
  //     client.service("notification").on("created", (m) => {
  //       console.log("something");
  //       console.log(m);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   nots();
  // }, []);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout } = useAuth();

  const { toggleSidebar, isSidebarOpen } = useContext(BottomMenuContext);

  const pages = [
    { title: "Activity", icon: <FiActivity size={24} className="mx-auto" />, path: routesPath?.NEWSFEED },
    { title: "Members", icon: <BiUserCircle size={24} className="mx-auto" />, path: routesPath?.MEMBERS },
    { title: "Community", icon: <HiUsers size={24} className="mx-auto" />, path: routesPath?.GROUPS },
    { title: "Forum", icon: <BiMessageDetail size={24} className="mx-auto" />, path: "#" },
    { title: "Blog", icon: <RiPagesLine size={24} className="mx-auto" />, path: routesPath?.BLOG },
  ];

  const settings = [
    {
      title: "Profile",
      icon: <BiUserCircle size={20} style={{ marginRight: "10px" }} className="mr-2" />,
      path: "../../profile/" + user?.id,
    },
    { title: "Account", icon: "" },
    { title: "Dashboard", icon: "" },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout() {
    deleteToken("feathers-jwt");
    logout();
  }

  return (
    <div className="mx-auto w-full sticky top-0 z-40">
      <div className="bg-white basis-full py-1 shadow-md">
        <div className="flex basis-full items-center justify-around md:justify-around lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          {isSidebarOpen ? null : (
            <div className="ml-2 inline md:hidden">
              <button
                onClick={() => {
                  toggleSidebar();
                }}
                className="md:hidden w-[2.7rem] lg:w-[20%] h-[2.9rem] lg:h-14 md:shadow-md focus:outline-none bg-white z-10"
              >
                <CgMenuLeft size={"24px"} className={`${anchorElUser ? "hidden" : ""} mx-auto`} />
              </button>
            </div>
          )}
          <div className="basis-[28%] md:basis-[12%] ml-2 md:pl-6 lg:pl-10 xl:px-6">
            <Link className="" to={routesPath?.NEWSFEED}>
              <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10 py-2 flex">
                {" "}
                <img className="justify-center" src={logo} alt="logo_vwanu" />
              </div>
            </Link>
          </div>
          <div className="md:basis-[30%] xl:basis-2/4 flex-none hidden md:block">
            <div className="hidden xl:flex items-center justify-evenly py-2">
              {pages?.map((page) => (
                <NavLink
                  to={page?.path}
                  key={page?.title + " title"}
                  activeClassName="text-secondary"
                  className=" text-primary hover:text-secondary active:text-secondary"
                >
                  {page?.title}
                </NavLink>
              ))}
            </div>
            <div className="hidden md:flex xl:hidden">
              {pages?.map((page) => (
                <Tooltip key={page + " icon"} title={page?.title}>
                  <NavLink
                    to={page?.path}
                    activeClassName="text-secondary"
                    className="mx-auto px-1 flex text-primary hover:text-secondary active:text-secondary"
                  >
                    {page?.icon}
                  </NavLink>
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="basis-[35%] lg:basis-[30%] flex-none">
            <div className="flex justify-between md:justify-end items-center">
              <BsSearch size="24px" className="text-black mr-4" />
              <div className="h-6 bg-black w-[1px] mr-4"></div>
              <Badge badgeContent={1} color="primary" className="mr-4">
                <AiOutlineInbox size="24px" className="text-black" />
              </Badge>
              <p className="">
                <FriendsPreview />
              </p>
              <p className="mr-2">
                <NotificationPreview />
              </p>

              <span className="hidden sm:block">
                <Tooltip title="Open profile">
                  <Button
                    ariant="text"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, fontWeight: "light", paddingLeft: "10px", paddingRight: "10px", borderRadius: "15px" }}
                  >
                    <p className="hidden mr-1 text-[0.75rem] md:hidden xl:inline text-black capitalize font-light">{user?.firstName}</p>
                    <span className="hidden md:hidden xl:inline">
                      <IoIosArrowDown size="18px" className="mr-2" />
                    </span>
                    <div className="rounded-[50px] avatar online">
                      <div className="rounded-[12px] w-8 h-8 m-1">
                        {user?.profilePicture?.original ? (
                          <img className="object-cover object-center w-8 h-8" src={user?.profilePicture?.original} alt="profil_image" />
                        ) : (
                          <FaUserAlt size="48" className="" />
                        )}
                      </div>
                    </div>{" "}
                  </Button>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px", borderRadius: "15px" }}
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
                  <MenuItem
                    key={"profile_1"}
                    sx={{ width: "270px", marginLeft: "15px", marginRight: "15px", borderRadius: "15px" }}
                    onClick={handleCloseUserMenu}
                  >
                    <Link to={"../../profile/" + user?.id}>
                      <p
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                        }}
                      >
                        <p className="w-16">
                          <img
                            style={{ width: "36px", height: "36px", marginRight: "10px" }}
                            className="object-cover object-center m-1 w-10 h-10 mask mask-squircle"
                            src={user?.profilePicture?.original}
                            alt="profil_image"
                          />
                        </p>
                        <p className="align-middle pl-3">{user?.firstName}</p>
                      </p>
                    </Link>
                  </MenuItem>
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      sx={{ py: 1, marginLeft: "15px", marginRight: "15px", borderRadius: "15px" }}
                    >
                      <Typography component="div" textAlign="center" style={{ display: "flex" }}>
                        {setting.icon}
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    key="logout"
                    sx={{ py: 1, marginLeft: "15px", marginRight: "15px", borderRadius: "15px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = { user: PropTypes.object.isRequired };

export default Navbar;
