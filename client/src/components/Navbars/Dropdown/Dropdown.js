import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteToken } from "../../../helpers/index";
import { DropdownItem } from "./DropdownItem.js";
import routesPath from "../../../routesPath";

//icon
import { BsPower } from "react-icons/bs";

const Dropdown = ({ user }) => {
  function Logout() {
    deleteToken();
    window.location.reload();
  }

  return (
    <>
      {user === undefined ? null : (
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex="0">
            <div className="rounded-[50px] avatar online">
              <div className="rounded-[12px] w-10 h-10 m-1">
                <img className=" w-10 h-10" src={user?.profilePicture} alt="profil_image" />
              </div>
            </div>
            <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-64 text-gray-900">
              <li>
                {DropdownItem.map((item) => {
                  return item.menuItems.map((it, idx) => {
                    return (
                      <Link to={it.path === routesPath.PROFILE ? `profile/${user?.id}` : it.path} key={idx}>
                        <span className="pr-4 py-2"> {it.icon} </span>
                        {it.title}
                      </Link>
                    );
                  });
                })}
                <Link to={""} onClick={Logout}>
                  <span className="pr-4 py-2">
                    {" "}
                    <BsPower className="mx-2" size="24px" />{" "}
                  </span>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

Dropdown.propTypes = { user: PropTypes.object };

export default Dropdown;
