import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";
import { DropdownItem } from "./DropdownItem.js";

//icon
import { BsPower } from "react-icons/bs";

const Dropdown = () => {
  const dispatch = useDispatch();
  function Logout() {
    dispatch(logOut());
  }

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex="0">
          <div className="avatar online">
            <div className="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32" alt="profil_image" />
            </div>
          </div>
          <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-64 text-gray-900">
            <li>
              {DropdownItem.map((item) => {
                return item.menuItems.map((it, idx) => {
                  return (
                    <Link to={it.path} key={idx}>
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
    </>
  );
};

export default Dropdown;
