import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsXCircleFill } from "react-icons/bs";
import { useGetListFriendReceive } from "../../../features/friend/friendSlice";
import { Badge } from "@mui/material";

// import AcceptFriendRequestButton from "../../../features/friend/component/AcceptFriendRequestButton";

// import routesPath from "../../../routesPath";

const FriendsPreview = () => {
  const { data: listFriendReceive } = useGetListFriendReceive(["user", "received"], true);

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <Badge badgeContent={listFriendReceive?.data?.length} color="primary" className="mr-4">
            <AiOutlineUserAdd size={"24px"} />
          </Badge>
        </label>
        <ul tabIndex="2" className="dropdown-content menu py-2 shadow bg-base-100 rounded-box w-96 text-gray-900">
          {listFriendReceive?.data?.length > 0 ? (
            <li>
              {listFriendReceive?.data?.map((friend, idx) => {
                return (
                  <Link key={idx} to={"/profile/" + friend?.id} className="text-base border-b hover:bg-placeholder-color mx-2 rounded-xl">
                    <div className="flex items-center align-middle justify-between">
                      <div className="w-12">
                        <img className="object-cover w-8 h-8 mask mask-squircle" src={friend?.profilePicture?.original} alt="" />
                      </div>
                      <div className="text-secondary text-sm w-40">{friend?.firstName + " " + friend?.lastName}</div>
                      <div className="w-48">
                        <button
                          to={"/profile/" + friend?.id}
                          className="capitalize ml-auto text-sm items-right align-middle mr-1 btn btn-sm btn-secondary text-base-100 rounded-xl mb-2 lg:mb-0 hover:bg-primary justify-end"
                        >
                          Visit profile
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </li>
          ) : (
            <>
              <div className="text-green-500 font-semibold p-5 text-center">
                <span>
                  {" "}
                  <BsXCircleFill size={"48px"} className="m-auto p-2" />
                </span>
                <span> No Friend request</span>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

// MessagePreview.propTypes = { user: PropTypes.object };

export default FriendsPreview;
