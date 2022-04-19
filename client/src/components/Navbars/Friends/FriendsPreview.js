import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { BsXCircleFill } from "react-icons/bs";
import { useGetListFriendRequest } from "../../../features/friend/friendSlice";
// import AcceptFriendRequestButton from "../../../features/friend/component/AcceptFriendRequestButton";

// import routesPath from "../../../routesPath";

const FriendsPreview = () => {
  const { data: listFriendRequest } = useGetListFriendRequest(["user", "me"], true);

  return (
    <>
      {console.log("listFriendRequest", listFriendRequest)}
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex="2">
          <FaUserPlus size="24px" />
        </label>
        <ul tabIndex="2" className="dropdown-content menu py-2 shadow bg-base-100 rounded-box w-[22rem] text-gray-900">
          {listFriendRequest?.data?.user?.friendsRequest?.length > 0 ? (
            <li>
              {listFriendRequest?.data?.user?.friendsRequest?.map((friend, idx) => {
                return (
                  <Link key={idx} to={"/profile/" + friend?.id} className="text-base border-b">
                    <div className="flex items-center align-middle justify-between">
                      <div className="mr-2">
                        <img className="w-8 h-8 mask mask-squircle" src={friend?.profilePicture} alt="" />
                      </div>
                      <div className="mr-5 text-secondary">{friend?.firstName + " " + friend?.lastName}</div>
                      <div>
                        <button
                          to={"/profile/" + friend?.id}
                          className="items-center align-middle mr-1 btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary justify-end"
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
