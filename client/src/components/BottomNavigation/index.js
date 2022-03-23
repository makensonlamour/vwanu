import React, { useContext } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../routesPath";
import { FiMenu } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import { BiMessageSquare } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { BottomMenuContext } from "../../context/BottomMenuContext";

const BottomNavigation = () => {
  const { toggleSidebar } = useContext(BottomMenuContext);

  return (
    <div className="z-50 block lg:hidden w-full h-screen">
      <div id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <div id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-between">
            <Link
              to={routesPath.NEWSFEED}
              className="w-full text-secondary focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1"
            >
              <BiHome size={"24px"} className="m-auto" />
              <span className="tab tab-home block text-md">Home</span>
            </Link>
            <Link
              to="#"
              className="w-full text-secondary focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1"
            >
              <BiMessageSquare size={"24px"} className="m-auto" />
              <span className="tab tab-kategori block text-md">Message</span>
            </Link>
            <Link
              to="#"
              className="w-full text-secondary focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1"
            >
              <MdOutlineExplore size={"24px"} className="m-auto" />
              <span className="tab tab-explore block text-md">Explore</span>
            </Link>
            <Link
              to="#"
              className="w-full text-secondary focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1"
            >
              <IoMdNotificationsOutline size={"24px"} className="m-auto" />
              <span className="tab tab-whishlist block text-md">Notifications</span>
            </Link>
            <Link
              to="#"
              onClick={() => {
                toggleSidebar();
              }}
              className="w-full text-secondary focus:text-primary hover:text-primary justify-center inline-block text-center pt-2 pb-1"
            >
              <FiMenu size={"24px"} className="m-auto" />
              <span className="tab tab-account block text-md">Menu</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

BottomNavigation.propTypes = {
  showMenu: PropTypes.any,
};

export default BottomNavigation;
