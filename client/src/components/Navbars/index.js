//  import React from "react";
// import { Link } from "react-router-dom";
// import routesPath from "../../routesPath";
// import PropTypes from "prop-types";

// //core components
// import Dropdown from "./Dropdown/Dropdown";
// import MessagePreview from "./Message/MessagePreview";
// import FriendsPreview from "./Friends/FriendsPreview";
// import NotificationPreview from "./Notification/NotificationPreview";
// import logo from "../../assets/images/Asset_3.png";

/*
const Navbar = ({ user }) => {
  return (
    <>
      <div className="bg-secondary fixed w-full z-10 mt-4">
        <div className="max-w-screen-xl m-auto flex flex-row  navbar mb-2 px-4 text-base-100 top-0 z-40">
          <div className="basis-1/5">
            <Link to={routesPath.NEWSFEED}>
              <span className="text-lg font-bold">
                {" "}
                <img className="w-full lg:w-2/3 " src={logo} alt="logo_vwanu" />
              </span>
            </Link>
          </div>
          <div className="basis-1/2">
            <div className="form-control w-full ml-auto">
              <input
                type="text"
                placeholder="Search"
                className="input input-ghost border-none placeholder:text-gray-300 active:text-gray-800 focus:text-gray-800"
              />
            </div>
          </div>
          <div className="grow justify-end">
            {" "}
            <div className="mr-8 hidden lg:flex">
              <span className="mx-2">
                <FriendsPreview />
              </span>
              <span className="mx-2">
                <NotificationPreview />
              </span>
              <span className="mx-2">
                <MessagePreview />
              </span>
            </div>
            <Dropdown user={user ? user : undefined} />
          </div>
        </div>
      </div>
    </>
  );
};
*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";
import PropTypes from "prop-types";
import { AppBar, Box, Grid, Badge, Toolbar, Typography, Menu, Container, Button, Tooltip, MenuItem } from "@mui/material";
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
  console.log(user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar variant="elevation24" sx={{ backgroundColor: "white" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid xs>
            <Link className="" to={routesPath.NEWSFEED}>
              <div className="text-lg font-bold w-[100px] md:w-[150px] mr-10">
                {" "}
                <img className="" src={logo} alt="logo_vwanu" />
              </div>
            </Link>
          </Grid>
          <Grid xs={5} sx={{ mx: "auto" }} style={{ marginLeft: "auto" }}>
            <Box sx={{ display: { xs: "none", lg: "flex" } }}>
              {pages.map((page) => (
                <Button
                  variant="text"
                  key={page}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textTransform: "capitalize",
                    fontSize: "1.0rem",
                    textAlign: "left",
                    fontWeight: "light",
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            {/*Icon navbar */}
            <Box sx={{ display: { xs: "none", md: "inline-flex", lg: "none" } }}>
              {pages.map((page) => (
                <Tooltip key={page} title={page.title}>
                  <Button
                    className="mx-auto px-1"
                    sx={{
                      my: 2,
                      mx: 1,
                      color: "black",
                      display: "block",
                      textTransform: "capitalize",
                      fontSize: "1.0rem",
                      textAlign: "center",
                      fontWeight: "light",
                    }}
                  >
                    {page.icon}
                  </Button>
                </Tooltip>
              ))}
            </Box>
          </Grid>

          <Box sx={{ display: "flex", marginLeft: "1rem" }}>
            <BsSearch size="24px" className="text-black mr-4" />
            <div className="h-6 bg-black w-[1px] mr-4"></div>
            <Badge badgeContent={1} color="primary" className="mr-4">
              <AiOutlineInbox size="24px" className="text-black" />
            </Badge>
            <Badge badgeContent={3} color="primary" className="mr-8">
              <IoMdNotificationsOutline size="24px" className="text-black" />
            </Badge>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Tooltip title="Open profile">
              <Button variant="text" onClick={handleOpenUserMenu} sx={{ p: 0, fontWeight: "light" }}>
                <p className="mr-1 text-[1.0rem] text-black capitalize font-light">{user?.firstName}</p>
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
                  <div>
                    <img className="m-1" src={user?.profilePicture} alt="profil_image" />
                  </div>
                  <p>{user?.firstName}</p>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = { user: PropTypes.object.isRequired };

export default Navbar;
